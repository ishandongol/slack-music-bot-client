import type { NextPage } from "next";

import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { getPlaylist } from "../api";
import { useSocket } from "../hooks/useSocket";
import { Song, SongItem } from "../components/Song";
import { Spinner } from "../components/Spinner";
import { VideoWrapper } from "../components/VideoWrapper";
import debounce from "lodash/debounce";
import { DatePicker, StartDateAndEndDate } from "../components/DatePicker";
import moment from "moment";
import { AxiosError } from "../utils/axios";
import { Navbar } from "../components/Navbar";
import { Meta } from "../components/Meta";
import { MainLayout } from "../layouts/MainLayout";
import { PageTitle } from "../components/v2/PageTitle";
import { Playlist } from "../components/Playlist";
import { HorizontalCard } from "../components/v2/Card";

interface VideoPlayPauseEventPayload extends VideoSeekEventPayload {
  playing: string;
}

interface VideoSeekEventPayload {
  video_id: string;
  seek: string;
  video_index: string;
}

interface PendingEvent {
  seek: number;
  playing?: boolean;
}

const PlaylistNew: NextPage = () => {
  const {
    socketConnected,
    socketId,
    socketRef,
    emitterRef,
    isSyncMode,
    isHost,
    latencyAndTolerance,
    setLatencyAndTolerance,
  } = useSocket();

  const [playlist, setPlayList] = useState<Song[]>([]);

  const [playing, setPlaying] = useState<boolean>(false);

  const [error, setError] = useState<AxiosError | undefined>();

  const [loading, setLoading] = useState<boolean>(false);

  const [nextSameSong, setNextSameSong] = useState<boolean>(false);

  const [startDateAndEndDate, setStartDateAndEndDate] =
    useState<StartDateAndEndDate>({
      startDate: moment().startOf("day"),
      endDate: moment().endOf("day"),
    });

  const playerRef = useRef<ReactPlayer>(null);

  const [syncUpdate, setSyncUpdate] = useState<Record<string, PendingEvent>>(
    {}
  );

  const debouncedSeekRef = useRef<{ sendSeekMessage: (seek: number) => void }>({
    sendSeekMessage: () => {},
  });

  const [videoReady, setVideoReady] = useState<
    Record<string, { ready: boolean }>
  >({});

  const [currentSongPlayingInfo, setCurrentSongPlayingInfo] = useState<
    Record<string, { duration?: number; playedSeconds?: number }>
  >({});

  const [currentSong, setCurrentSong] = useState<Song & { index: number }>({
    _id: {
      $oid: "",
    },
    user: "",
    url: "",
    thumbnail_url: "",
    status: "pending",
    title: "",
    description: "",
    index: 0,
  });

  const appendToPlaylist = useCallback(
    (newItem: Song) => {
      setPlayList([...playlist, newItem]);
    },
    [playlist]
  );

  const canControl = isSyncMode ? (isHost ? true : false) : true;

  const syncUpdateNow = useCallback((seekNum: number, isPlaying: boolean) => {
    try {
      const internalPlayer = playerRef?.current?.getInternalPlayer();
      playerRef?.current?.seekTo(seekNum, "seconds");
      if (internalPlayer) {
        internalPlayer.seekTo(seekNum, true);
        if (isPlaying) {
          internalPlayer.playVideo();
        } else {
          internalPlayer.pauseVideo();
        }
        setPlaying(isPlaying);
        setSyncUpdate({});
      }
    } catch (err) {
      console.log("video try update error", err);
    }
  }, []);

  const handlePlayPause = useCallback(
    (data: string) => {
      const {
        video_id,
        video_index,
        seek,
        playing,
      }: VideoPlayPauseEventPayload = JSON.parse(data);
      const currentSongId = currentSong._id.$oid;
      const seekNum = parseFloat(seek);
      const vidIndex = parseInt(video_index, 10);
      const isPlaying = playing === "true";
      let song = currentSong;
      if (currentSongId === video_id) {
        setCurrentSong({ ...currentSong });
      }
      if (currentSongId !== video_id && playlist.length > vidIndex) {
        // todo handle for video not found
        song = { ...playlist[vidIndex], index: vidIndex };
        setCurrentSong({ ...song });
      }
      setSyncUpdate({ [video_id]: { seek: seekNum, playing: isPlaying } });
    },
    [currentSong, playlist]
  );
  const copyDuration = (nextSongId: string) => {
    const currentSongId = currentSong._id.$oid;
    const currentInfo = currentSongPlayingInfo[currentSongId];
    setCurrentSongPlayingInfo({
      [nextSongId]: {
        playedSeconds: 0,
        duration: currentInfo?.duration,
      },
    });
  };
  const handleSeek = useCallback(
    (data: string) => {
      const { video_id, seek, video_index }: VideoSeekEventPayload =
        JSON.parse(data);
      const currentSongInfo = currentSongPlayingInfo[video_id];
      if (!currentSongInfo) {
        return handlePlayPause(
          JSON.stringify({
            video_id,
            video_index,
            seek,
            playing: true,
          })
        );
      }
      const seekNum = parseFloat(seek);
      const difference = Math.abs(
        (currentSongInfo?.playedSeconds || 0) - seekNum
      );
      const { tolerance } = latencyAndTolerance;
      setLatencyAndTolerance({ ...latencyAndTolerance, latency: difference });
      if (currentSongInfo && difference > tolerance) {
        setSyncUpdate({ [video_id]: { seek: seekNum, playing: true } });
      }
    },
    [
      currentSongPlayingInfo,
      latencyAndTolerance,
      setLatencyAndTolerance,
      handlePlayPause,
    ]
  );
  useEffect(() => {
    const player = playerRef.current?.getInternalPlayer();
    if (nextSameSong && player) {
      player.seekTo(0);
      player.playVideo();
      setPlaying(true);
      setNextSameSong(false);
    }
  }, [nextSameSong, playerRef]);
  useEffect(() => {
    const currentVideoId = currentSong._id.$oid;
    const pendingUpdate = syncUpdate[currentVideoId];
    if (videoReady[currentVideoId]?.ready === true && pendingUpdate) {
      syncUpdateNow(pendingUpdate.seek, pendingUpdate.playing || false);
      const currentSongId = currentSong._id.$oid;
      const currentInfo = currentSongPlayingInfo[currentSongId];
      setCurrentSongPlayingInfo({
        [currentSongId]: {
          ...currentInfo,
          playedSeconds: pendingUpdate.seek,
        },
      });
    }
  }, [
    videoReady,
    currentSong,
    playlist,
    syncUpdateNow,
    syncUpdate,
    currentSongPlayingInfo,
  ]);

  const getSocket = useCallback(() => socketRef?.current, [socketRef]);

  const sendPlayPauseMessage = useCallback(
    (isPlaying: boolean) => {
      if (isHost && isSyncMode) {
        const currentSongId = currentSong._id.$oid;
        getSocket()?.send(
          `/pp ${currentSongId} ${
            currentSongPlayingInfo[currentSongId]?.playedSeconds || 0
          } ${isPlaying} ${currentSong.index || 0}`
        );
      }
    },
    [currentSong, isSyncMode, isHost, getSocket, currentSongPlayingInfo]
  );

  const sendSeekMessage = useCallback(
    (seconds: number) => {
      if (isHost && isSyncMode) {
        getSocket()?.send(
          `/seek ${currentSong._id.$oid} ${seconds || 0} ${
            currentSong.index || 0
          }`
        );
      }
    },
    [isHost, isSyncMode, currentSong, getSocket]
  );

  useEffect(() => {
    debouncedSeekRef.current = {
      sendSeekMessage: debounce(sendSeekMessage, 3000, {
        maxWait: 1500,
        leading: false,
        trailing: true,
      }),
    };
  }, [sendSeekMessage]);
  const notifyDateChange = useCallback(() => {
    if (isHost && isSyncMode) {
      const { startDate, endDate } = startDateAndEndDate;
      getSocket()?.send(`/date ${startDate?.unix()} ${endDate?.unix()}`);
    }
  }, [startDateAndEndDate, isHost, isSyncMode, getSocket]);
  const syncMusic = useCallback(() => {
    sendPlayPauseMessage(playing);
    notifyDateChange();
  }, [sendPlayPauseMessage, playing, notifyDateChange]);

  useEffect(() => {
    const socket = socketRef?.current;
    const emitter = emitterRef?.current;
    if (
      emitter &&
      socketId &&
      socketConnected &&
      socket &&
      isHost &&
      isSyncMode
    ) {
      emitter.on("syncRoomJoined", syncMusic);
    }
    return () => {
      emitter?.removeListener("syncRoomJoined", syncMusic);
    };
  }, [
    socketRef,
    emitterRef,
    socketConnected,
    socketId,
    syncMusic,
    playing,
    isHost,
    isSyncMode,
  ]);
  const handleHostDateChange = useCallback((data: string) => {
    const { start_date, end_date } = JSON.parse(data);
    setStartDateAndEndDate({
      startDate: moment.unix(start_date),
      endDate: moment.unix(end_date),
    });
  }, []);
  useEffect(() => {
    const socket = socketRef?.current;
    const emitter = emitterRef?.current;
    if (socket && socketConnected && socketId && emitter) {
      emitter.on("playPause", handlePlayPause);
      emitter.on("seek", handleSeek);
      emitter.on("date", handleHostDateChange);
    }
    return () => {
      emitter?.removeListener("playPause", handlePlayPause);
      emitter?.removeListener("seek", handleSeek);
      emitter?.removeListener("date", handleHostDateChange);
    };
  }, [
    socketRef,
    emitterRef,
    socketId,
    socketConnected,
    handlePlayPause,
    handleSeek,
    handleHostDateChange,
  ]);

  useEffect(() => {
    const socket = socketRef?.current;
    const emitter = emitterRef?.current;
    const onNewSong = (data: string) => {
      const json: Song = JSON.parse(data);
      appendToPlaylist(json);
    };
    if (socketConnected && socket && socketId && emitter) {
      emitter.on("newSong", onNewSong);
    }
    return () => {
      emitter?.removeListener("newSong", onNewSong);
    };
  }, [socketId, socketConnected, socketRef, emitterRef, appendToPlaylist]);

  const fetchPlaylist = useCallback(async () => {
    const { startDate, endDate } = startDateAndEndDate;
    try {
      setLoading(true);
      const playlist = await getPlaylist<Song[]>({
        startDate: startDate?.unix(),
        endDate: endDate?.unix(),
      });
      setPlayList(playlist || []);
    } catch (err) {
      setError(err as any);
    } finally {
      setLoading(false);
    }
  }, [startDateAndEndDate]);

  useEffect(() => {
    fetchPlaylist();
    notifyDateChange();
  }, [fetchPlaylist, notifyDateChange]);

  useEffect(() => {
    if (playlist.length && !playing && !currentSong.url) {
      setCurrentSong({ ...currentSong, ...playlist[0], index: 0 });
    }
  }, [playlist, playing, currentSong]);

  const { playedSeconds, duration } = currentSongPlayingInfo[
    currentSong._id.$oid
  ] || { playedSeconds: 0, duration: 0 };

  const progress =
    playedSeconds && duration
      ? Math.round((playedSeconds / duration) * 100)
      : 0;
  const { startDate, endDate } = startDateAndEndDate;

  return (
    <>
      <Meta />
      <MainLayout noScroll>
        <Navbar />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-sm-12 col-md-4 max-height-no-margin d-flex flex-column">
              <PageTitle className="text-light">Playlist for today</PageTitle>
              <Playlist className={"overflow-auto mb-3"}>
              {canControl ? (
                <DatePicker
                  startDate={startDate}
                  startDateId="startDate"
                  endDate={endDate}
                  endDateId="endDate"
                  onDatesChange={({ startDate, endDate }) => {
                    setStartDateAndEndDate({
                      startDate: startDate?.startOf("day") || null,
                      endDate: endDate?.endOf("day") || null,
                    });
                  }}
                />
              ) : (
                <div className="text-light p-4 text-center">
                  {moment(startDate).format("dddd, MMM D")}
                  <span className="px-4">to</span>
                  {moment(endDate).format("dddd, MMM D")}
                </div>
              )}
              {loading && (
                <div
                  className="d-flex align-items-center justify-content-center p-2"
                  style={{ width: "100%" }}
                >
                  <Spinner />
                </div>
              )}
                {playlist?.map((song, index) => {
                  const isCurrent = currentSong._id?.$oid === song._id?.$oid;
                  const nextSong = currentSong.index + 1;
                  const nextSongIndex =
                    nextSong === playlist.length ? 0 : nextSong;
                  return (
                    <HorizontalCard
                      key={song._id?.$oid}
                      title={song.title}
                      subTitle={song.description}
                      image={song.thumbnail_url}
                    />
                    // <SongItem
                    //   className={`${isCurrent ? "bg-secondary" : "bg-dark"}`}
                    //   key={song._id?.$oid}
                    //   onClick={(e) => {
                    //     e.preventDefault();
                    //     if (!isCurrent && canControl) {
                    //       setCurrentSong({ ...song, index });
                    //       setPlaying(true);
                    //       if (currentSong.url === song.url) {
                    //         copyDuration(song._id.$oid);
                    //         setNextSameSong(true);
                    //       }
                    //     }
                    //   }}
                    //   song={song}
                    //   isCurrent={isCurrent}
                    //   playing={playing}
                    //   isNextSong={nextSongIndex === index}
                    //   duration={duration || 0}
                    //   progress={progress}
                    // />
                  );
                })}
              </Playlist>
              <div className="flex-shrink-0">
              {!canControl && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                    position: "absolute",
                  }}
                />
              )}
              <ReactPlayer
                ref={playerRef}
                url={currentSong.url}
                playing={playing}
                controls={process.env.NODE_ENV === "development"}
                onReady={() => {
                  setVideoReady({ [currentSong._id.$oid]: { ready: true } });
                }}
                onStart={() => {
                  sendPlayPauseMessage(true);
                  setPlaying(true);
                }}
                onPlay={() => {
                  sendPlayPauseMessage(true);
                  setPlaying(true);
                }}
                onPause={() => {
                  sendPlayPauseMessage(false);
                  setPlaying(false);
                }}
                pip
                onSeek={(seconds) => {
                  if (canControl) {
                    sendSeekMessage(seconds);
                  }
                }}
                onProgress={({ playedSeconds }) => {
                  const currentSongId = currentSong._id.$oid;
                  const currentInfo = currentSongPlayingInfo[currentSongId];
                  setCurrentSongPlayingInfo({
                    [currentSongId]: { ...currentInfo, playedSeconds },
                  });
                  debouncedSeekRef.current.sendSeekMessage(playedSeconds);
                }}
                onDuration={(duration) => {
                  const currentSongId = currentSong._id.$oid;
                  const currentInfo = currentSongPlayingInfo[currentSongId];
                  setCurrentSongPlayingInfo({
                    [currentSongId]: {
                      ...currentInfo,
                      duration,
                    },
                  });
                }}
                onEnded={() => {
                  if (playlist.length) {
                    const nextIndex = currentSong.index + 1;
                    const nextSong =
                      nextIndex === playlist.length
                        ? { ...playlist[0], index: 0 }
                        : { ...playlist[nextIndex], index: nextIndex };
                    setCurrentSong(nextSong);
                    if (currentSong.url === nextSong.url) {
                      copyDuration(nextSong._id.$oid);
                      setNextSameSong(true);
                    }
                  }
                }}
                width={"100%"}
                wrapper={VideoWrapper}
              />
              </div>
            </div>
            <div className="col-sm-12 col-md-8">
              
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default PlaylistNew;

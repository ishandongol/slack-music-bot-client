import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { getPlaylist } from "../api";
import { useSocket } from "../hooks/useSocket";
import { Badge } from "./Badge";
import { Song, SongItem } from "./Song";

export const Playlist = () => {
  const { socketConnected, socketId, socketRef, emitterRef } = useSocket();
  const [playlist, setPlayList] = useState<Song[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentSong, setCurrentSong] = useState<
    Song & { index: number; duration?: number; playedSeconds?: number }
  >({
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
  useEffect(() => {
    const socket = socketRef?.current;
    const emitter = emitterRef?.current;
    const onNewSong = (data: string) => {
      const json: Song = JSON.parse(data);
      appendToPlaylist(json);
    };
    if (socketConnected && socket && socketId && emitter) {
      console.log("all done");
      emitter.on("newSong", onNewSong);
    }
    return () => {
      console.log("Clear");
      emitter?.removeListener("newSong", onNewSong);
    };
  }, [socketId, socketConnected, socketRef, emitterRef, appendToPlaylist]);
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlist = await getPlaylist();
        setPlayList(playlist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPlaylist();
  }, []);

  useEffect(() => {
    if (playlist.length && !playing && !currentSong.url) {
      setCurrentSong({ ...currentSong, ...playlist[0], index: 0 });
    }
  }, [playlist, playing, currentSong]);
  const { playedSeconds, duration } = currentSong;
  const progress =
    playedSeconds && duration
      ? Math.round((playedSeconds / duration) * 100)
      : 0;
  return (
    <div className="overflow-hidden d-flex bg-dark">
      <div className="flex-grow-1 col">
        <ReactPlayer
          url={currentSong.url}
          playing={playing}
          onStart={() => {
            setPlaying(true);
          }}
          onPlay={() => {
            setPlaying(true);
          }}
          onPause={() => {
            setPlaying(false);
          }}
          pip
          onProgress={({ playedSeconds }) => {
            setCurrentSong({ ...currentSong, playedSeconds });
          }}
          onDuration={(duration) => {
            setCurrentSong({ ...currentSong, duration });
          }}
          onEnded={() => {
            if (playlist.length) {
              const nextIndex = currentSong.index + 1;
              if (nextIndex === playlist.length) {
                setCurrentSong({ ...playlist[0], index: 0 });
              } else {
                setCurrentSong({ ...playlist[nextIndex], index: nextIndex });
              }
            }
          }}
          width={"100%"}
          height={"100vh"}
        />
      </div>
      <div
        className="flex-shrink-0 col-sm-3 overflow-auto"
        style={{ height: "100vh" }}
      >
        <h3 className="text-center p-4 text-white bg-black mb-1 sticky-top">
          Innovate PLaylist
        </h3>
        <ul className="list-group list-group-flush">
          {playlist.map((song, index) => {
            const isCurrent = currentSong._id?.$oid === song._id?.$oid;
            const nextSong = currentSong.index + 1;
            const nextSongIndex = nextSong === playlist.length ? 0 : nextSong;
            return (
              <SongItem
                className={`${isCurrent ? "bg-black" : "bg-dark"}`}
                key={song._id?.$oid}
                onClick={(e) => {
                  e.preventDefault();
                  if (!isCurrent) {
                    setCurrentSong({ ...song, index });
                    setPlaying(true);
                  }
                }}
                song={song}
                isCurrent={isCurrent}
                playing={playing}
                isNextSong={nextSongIndex === index}
                duration={duration || 0}
                progress={progress}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

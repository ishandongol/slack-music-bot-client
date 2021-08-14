import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { getPlaylist } from "../api";
import { useSocket } from "../hooks/useSocket";
import { Badge } from "./Badge";

export interface Song {
  user: string;
  _id: {
    $oid: string;
  };
  thumbnail_url: string;
  url: string;
  title: string;
  description: string;
  status: "pending" | "playing" | "played";
}

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
          controls
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
        <h3 className="text-center p-4 text-white bg-dark mb-1">
          Innovate PLaylist
        </h3>
        <ul className="list-group list-group-flush">
          {playlist.map((song, index) => {
            const isCurrent = currentSong._id?.$oid === song._id?.$oid;
            const nextSong = currentSong.index + 1;
            const nextSongIndex = nextSong === playlist.length ? 0 : nextSong;
            return (
              <li
                key={song._id?.$oid}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentSong({ ...song, index });
                  setPlaying(true);
                }}
                className={`list-group-item p-0 text-white px-5 py-2 mb-2 ${
                  isCurrent ? "bg-black" : "bg-dark"
                }`}
                style={{
                  cursor: "pointer",
                }}
              >
                <div className=" d-flex">
                  <div
                    className="flex-shrink-0 d-flex"
                    style={{ width: "20%" }}
                  >
                    <div className="align-self-center">
                      <img
                        src={song.thumbnail_url}
                        className="img-fluid"
                        alt={song.title}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1 py-2 px-3">
                    <p className="mb-1">{song.title || song.url}</p>
                    <p className="text-muted">{song.description}</p>
                    <div className="d-flex">
                      {isCurrent && playing && (
                        <>
                          <Badge
                            className="align-self-center bg-success"
                            title="Playing"
                          />
                          <Badge
                            className="align-self-center bg-light text-dark"
                            title={`${progress} %`}
                          />
                        </>
                      )}
                      {isCurrent && !playing && (
                        <Badge
                          className="align-self-center bg-danger"
                          title="Paused"
                        />
                      )}
                      {nextSongIndex === index && (
                        <>
                          <Badge
                            className="align-self-center bg-warning text-dark"
                            title="Up Next"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {isCurrent && (
                  <div
                    className="progress bg-dark mt-2"
                    style={{ height: "4px" }}
                  >
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={duration}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

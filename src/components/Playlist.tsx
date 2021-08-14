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
  url: string;
  title: string;
  description: string;
  status: "pending" | "playing" | "played";
}

export const Playlist = () => {
  const { socketConnected, socketId, socketRef, emitterRef } = useSocket();
  const [playlist, setPlayList] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song & { index: number }>({
    _id: {
      $oid: "",
    },
    user: "",
    url: "",
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
  return (
    <div className="container-fluid overflow-hidden">
      <div className="row p-0">
        <div className="col p-0">
          <ReactPlayer
            url={currentSong.url}
            playing={currentSong.url ? true : false}
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
        <div className="col-md-4 p-0">
          <div className="card">
            <div className="card-header h5">Innovate Playlist</div>
            <ul className="list-group list-group-flush">
              {playlist.map((song, index) => {
                const isCurrent = currentSong._id?.$oid === song._id?.$oid;
                return (
                  <li
                    key={song._id?.$oid}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentSong({ ...song, index });
                    }}
                    className={`list-group-item d-flex px-lg-5 ${
                      isCurrent ? "bg-dark" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="flex-shrink-0 pe-3 d-flex"
                      style={{ width: "15%" }}
                    >
                      <div className="align-self-center">
                        <img
                          src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png"
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1 text-truncate">
                      <p className={`${isCurrent ? "text-white" : ""}`}>
                        {song.title || song.url}
                      </p>
                      <p className="text-muted">
                        {song.description || song.url}
                      </p>
                    </div>
                    <div className="flex-grow-1 ps-3 d-flex justify-content-center">
                      {isCurrent && (
                        <Badge
                          className="align-self-center"
                          title="Now Playing"
                        />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

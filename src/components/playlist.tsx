import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useSocket } from "../hooks/useSocket";

export interface IPlaylist {
  user: string;
  _id: string;
  url: string;
  status: "pending" | "playing" | "played";
}

export const Playlist = () => {
  const { socketConnected, socketId, socketRef } = useSocket();
  const [playlist, setPlayList] = useState<IPlaylist[]>([]);
  const appendToPlaylist = useCallback(
    (newItem: IPlaylist) => {
      setPlayList([...playlist, newItem]);
    },
    [playlist]
  );
  useEffect(() => {
    const socket = socketRef?.current;
    if (socketConnected && socketId && socket) {
      socket.on("welcome", (data) => {
        console.log("welcome");
        setPlayList(data);
      });
      socket.on("newSongAdded", (data) => {
        console.log("newSongAdded");
        appendToPlaylist(data);
      });
    }
    return () => {
      socket?.off("welcome");
      socket?.off("newSongAdded");
    };
  }, [socketId, socketConnected, socketRef, appendToPlaylist]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">Video player</div>
        <div className="col-md-4">
          <div className="card">
            <ul className="list-group list-group-flush">
              {playlist.map((song) => (
                <li key={song._id} className="list-group-item">
                  {song.url}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

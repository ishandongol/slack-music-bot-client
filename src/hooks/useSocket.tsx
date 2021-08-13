import { useState, useEffect, useContext, createContext, useRef } from "react";

import { io, Socket } from "socket.io-client";

interface SocketContextInterface {
  socketRef?: React.MutableRefObject<Socket | undefined>;
  socketId: string;
  socketConnected: boolean;
}
const defaultContext: SocketContextInterface = {
  socketConnected: false,
  socketId: "",
};

const SocketContext = createContext<SocketContextInterface>(defaultContext);

const useProvideSocket = (url: string): SocketContextInterface => {
  const socketRef = useRef<Socket>();
  const [socketId, setSocketId] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;
    if (socket) {
      socket.on("connect", () => {
        setSocketId(socket.id);
        setSocketConnected(socket.connected);
      });
      socket.on("disconnect", () => {
        setSocketId("");
        setSocketConnected(false);
      });
      socket.on("welcome", (data) => {
        console.log(data);
      });
    }
  }, [url]);
  useEffect(
    () => () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    },
    []
  );
  return {
    socketRef,
    socketConnected,
    socketId,
  };
};

interface SocketProviderProps {
  children: React.ReactNode;
  url?: string;
}
export const SocketProvider = ({ children, url }: SocketProviderProps) => {
  const value = useProvideSocket(url || "");
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

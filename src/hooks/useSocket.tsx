import { useState, useEffect, useContext, createContext, useRef } from "react";

interface SocketContextInterface {
  socketRef?: React.MutableRefObject<WebSocket | undefined>;
  socketId: string;
  socketConnected: boolean;
}
const defaultContext: SocketContextInterface = {
  socketConnected: false,
  socketId: "",
};

const SocketContext = createContext<SocketContextInterface>(defaultContext);

const useProvideSocket = (url: string): SocketContextInterface => {
  const socketRef = useRef<WebSocket>();
  const [socketId, setSocketId] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;
    if (socket) {
      socket.onopen = function () {
        setSocketConnected(true);
      };
      socket.onclose = function () {
        setSocketId("");
        setSocketConnected(false);
      };
      socket.onmessage = function (e) {
        console.log("Received: " + e.data);
      };
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

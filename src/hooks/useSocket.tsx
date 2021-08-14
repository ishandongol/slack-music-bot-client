import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import EventEmitter from "events";

interface SocketContextInterface {
  socketRef?: React.MutableRefObject<WebSocket | undefined>;
  emitterRef?: React.MutableRefObject<EventEmitter>;
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
  const emitterRef = useRef<EventEmitter>(new EventEmitter());
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
        const { message, event_type } = JSON.parse(e.data);
        if (event_type === "welcome") {
          setSocketId(message);
        }
        emitterRef.current?.emit(event_type, message);
        console.log("Received: " + e.data);
      };
    }
  }, [url]);
  useEffect(
    () => () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (emitterRef.current) {
        emitterRef.current.removeAllListeners();
      }
    },
    []
  );
  return {
    socketRef,
    emitterRef,
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

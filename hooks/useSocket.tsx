import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import EventEmitter from "events";

interface LatencyAndTolerance {latency:number,tolerance:number}
interface SocketContextInterface {
  socketRef?: React.MutableRefObject<WebSocket | undefined>;
  emitterRef?: React.MutableRefObject<EventEmitter>;
  socketId: string;
  socketConnected: boolean;
  isSyncMode: boolean;
  latencyAndTolerance: LatencyAndTolerance;
  setLatencyAndTolerance: React.Dispatch<React.SetStateAction<LatencyAndTolerance>>
  isHost: boolean;
  setIsSyncMode: React.Dispatch<React.SetStateAction<boolean>>
}
const defaultLatencyAndTolerance:LatencyAndTolerance = {latency:0,tolerance:0.9}
const defaultContext: SocketContextInterface = {
  socketConnected: false,
  socketId: "",
  isSyncMode: false,
  isHost: false,
  setIsSyncMode: () => {
    throw new Error("NOt implemented");
  },
  latencyAndTolerance: defaultLatencyAndTolerance,
  setLatencyAndTolerance: () => {
    throw new Error("NOt implemented");
  },
};

const SocketContext = createContext<SocketContextInterface>(defaultContext);

const useProvideSocket = (url: string): SocketContextInterface => {
  const socketRef = useRef<WebSocket>();
  const emitterRef = useRef<EventEmitter>(new EventEmitter());
  const [socketId, setSocketId] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [latencyAndTolerance, setLatencyAndTolerance] = useState<LatencyAndTolerance>(defaultLatencyAndTolerance);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [isSyncMode, setIsSyncMode] = useState<boolean>(false);
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
        if (event_type === "host") {
          setIsHost(message === "true");
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
    isHost,
    isSyncMode,
    latencyAndTolerance,
    setLatencyAndTolerance,
    setIsSyncMode,
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
import { useEffect,useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    findIconDefinition
  } from '@fortawesome/fontawesome-svg-core'
  import Link from 'next/link'
export const HomeNavbar = () => {
  const {
    socketConnected,
    socketId,
    socketRef,
    isSyncMode,
    setIsSyncMode,
    isHost,
    latencyAndTolerance,
    setLatencyAndTolerance,
  } = useSocket();
  const [expanded,setExpanded] = useState<boolean>(false)
  const syncMode = ({
    target: { checked },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setIsSyncMode(checked);
  };

  useEffect(() => {
    const socket = socketRef?.current;
    if (socketConnected && socketId && socket) {
      if (isSyncMode) {
        socket.send("/join sync");
      } else {
        socket.send("/leave sync");
      }
    }
  }, [isSyncMode, socketRef, socketConnected, socketId]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={(e) =>{
            e.preventDefault()
            setExpanded(!expanded)
          }}
          aria-expanded={expanded}
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? "show":''}`} id="navbarText">
        <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link href="/contributors">
          <a className="nav-link">Contributors</a>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://github.com/ishandongol/slack-music-bot-client" target="_blank" rel="noreferrer noopener"
          ><FontAwesomeIcon className="me-1" style={{fontSize:'24px'}} icon={findIconDefinition({prefix:'fab',iconName:'github'})}/></a>
        </li>
        
      </ul>
        </div>
      </div>
    </nav>
  );
};

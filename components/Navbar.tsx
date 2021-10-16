import { useEffect,useState } from "react";
import config from "../config";
import { useSocket } from "../hooks/useSocket";
import { Switch } from "./Switch";
import Link from 'next/link'
export const Navbar = () => {
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
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand" >
          {config.appName}
          </a>
        </Link>
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
          <ul className="navbar-nav py-2 py-md-0">
            <li className="nav-item">
              {isSyncMode ? (
                isHost ? (
                  <span
                    className="nav-link badge bg-primary text-light"
                    aria-current="page"
                  >
                    Host
                  </span>
                ) : (
                  <span
                    className="nav-link badge bg-secondary text-light"
                    aria-current="page"
                  >
                    Guest
                  </span>
                )
              ) : undefined}
            </li>
          </ul>
          <form className="d-flex ms-auto">
            {isSyncMode && !isHost && (
              <>
                <div className="input-group me-1">
                  <span className="input-group-text bg-dark text-light border-0">
                    Latency:{" "}
                  </span>
                  <span className="input-group-text bg-dark text-light border-0">
                    {latencyAndTolerance.latency.toFixed(2)}
                  </span>
                  <span className="input-group-text bg-dark text-light border-0">
                    Tolerance:{" "}
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    style={{width:'75px'}}
                    className="form-control bg-dark text-light border-0"
                    step="0.1"
                    value={latencyAndTolerance.tolerance}
                    onChange={({ target: { value } }) => {
                      setLatencyAndTolerance({
                        ...latencyAndTolerance,
                        tolerance: parseFloat(value || "0"),
                      });
                    }}
                    aria-label="Dollar amount (with dot and two decimal places)"
                  />
                </div>
              </>
            )}
            <Switch
              className="flex-shrink-0 align-self-center"
              onChange={syncMode}
              checked={isSyncMode}
            >
              Sangai Sunam
            </Switch>
          </form>
        </div>
      </div>
    </nav>
  );
};

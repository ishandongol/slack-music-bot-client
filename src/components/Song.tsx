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

interface SongProps {
  song: Song;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  isCurrent: boolean;
  playing: boolean;
  progress: number;
  isNextSong: boolean;
  duration: number;
  className?: string;
}
export const SongItem = ({
  song,
  onClick,
  isCurrent,
  playing,
  progress,
  isNextSong,
  duration,
  className,
}: SongProps) => (
  <li
    onClick={onClick}
    className={`list-group-item p-0 text-white px-5 py-2 mb-2 ${
      className || ""
    }`}
    style={{
      cursor: "pointer",
    }}
  >
    <div className=" d-flex">
      <div className="flex-shrink-0 d-flex" style={{ width: "20%" }}>
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
              <Badge className="align-self-center bg-success" title="Playing" />
              <Badge
                className="align-self-center bg-light text-dark"
                title={`${progress} %`}
              />
            </>
          )}
          {isCurrent && !playing && (
            <Badge className="align-self-center bg-danger" title="Paused" />
          )}
          {isNextSong && (
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
      <div className="progress bg-dark mt-2" style={{ height: "4px" }}>
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

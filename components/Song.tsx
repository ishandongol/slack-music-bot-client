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
    className={`list-group-item p-0 text-white px-3 pt-2 pb-3 mb-2 mx-3 rounded-3 ${
      className || ""
    }`}
    style={{
      cursor: "pointer",
    }}
  >
    <div className="d-flex">
      <div className="flex-shrink-0 d-flex" style={{
            backgroundImage: `url(${song.thumbnail_url})`,
            backgroundRepeat: "no-repeat",
            height: 'auto',
            width: "20%",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}/>
      <div className="flex-grow-1 py-2 px-3">
        <p className="mb-1">{song.title || song.url}</p>
        <small>{song.description}</small>
        <div className="d-flex">
          {isCurrent && playing && (
            <>
              <Badge className="align-self-center bg-primary" title="Playing" />
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
                className="align-self-center bg-secondary text-dark"
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
          className="progress-bar bg-white"
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

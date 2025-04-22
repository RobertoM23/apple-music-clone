import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { togglePlay } from "../redux/features/playerSlice";
import { useEffect, useRef } from "react";

const PlayerBar = () => {
  const { currentSong, isPlaying } = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.error("Play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  return (
    <div className="bg-black text-white px-3 py-2 d-flex align-items-center justify-content-between border-top border-secondary">
      <div className="d-flex align-items-center gap-3">
        <img src={currentSong.albumCover} alt={currentSong.title} style={{ width: 50 }} />
        <div>
          <div className="fw-bold">{currentSong.title}</div>
          <div className="small">{currentSong.artist}</div>
        </div>
      </div>

      <div>
        <i
          className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"} fs-3`}
          onClick={() => dispatch(togglePlay())}
          role="button"
        ></i>
      </div>

      <audio ref={audioRef} src={currentSong.preview} />
    </div>
  );
};

export default PlayerBar;
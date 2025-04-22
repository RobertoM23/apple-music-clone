import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { Song } from "./types/Song";
import SongCard from "./components/SongCard";
import FavoritesSection from "./components/FavouritesSection";
import PlayerBar from "./components/PlayerBar";
import { togglePlay } from "./redux/features/playerSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const dispatch = useDispatch();
  const currentSong = useSelector((state: RootState) => state.player.currentSong);
  const isPlaying = useSelector((state: RootState) => state.player.isPlaying);

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen")
      .then((res) => res.json())
      .then((data) => {
        const formattedSongs = data.data.map((track: any) => ({
          id: track.id,
          title: track.title,
          artist: track.artist.name,
          albumCover: track.album.cover_medium,
          preview: track.preview,
        }));
        setSongs(formattedSongs);
      });
  }, []);

  return (
    <div className="container-fluid text-white bg-dark min-vh-100">
      {/* Top NavBar */}
      <div className="row align-items-center px-3 py-2 border-bottom border-secondary g-2">
        {/* Left icons */}
        <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-start gap-2">
          <i className="bi bi-shuffle"></i>
          <i className="bi bi-skip-start-fill"></i>
          <i
  className={`bi ${isPlaying ? "bi-pause-circle-fill" : "bi-play-circle-fill"}`}
  onClick={() => dispatch(togglePlay())}
  role="button"
/>
          <i className="bi bi-skip-end-fill"></i>
          <i className="bi bi-repeat"></i>
        </div>

        {/* Center logo */}
        <div className="col-12 col-md text-center">
          <img src="/public/logos/apple.svg" alt="Logo Apple" style={{ height: 35 }} />
        </div>

        {/* Right controls */}
        <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-end align-items-center flex-wrap gap-2">
          <i className="bi bi-volume-down"></i>
          <input type="range" className="form-range" min="0" max="100" style={{ width: "100px" }} />
          <input
            type="text"
            className="form-control form-control-sm bg-secondary text-white border-0"
            placeholder="Cerca"
            style={{ width: "160px" }}
          />
          <button className="btn btn-danger btn-sm">Accedi</button>
        </div>
      </div>

      {/* Logo + Section Title */}
      <div className="d-flex align-items-center justify-content-between px-4 pt-3">
        <div className="d-flex align-items-center gap-2">
          <img src="/public/logos/music.svg" alt="Apple music logo" style={{ width: 100 }} />
        </div>
      </div>

      {/* Highlights */}
      <div className="px-4 pt-3">
        <h2 className="fw-bold mb-4">Novità</h2>
        <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
          <div className="col">
            <img src="/public/images/1a.png" alt="Chill Radio" className="img-fluid rounded" />
          </div>
          <div className="col">
            <img src="/public/images/1b.png" alt="Música Uno" className="img-fluid rounded" />
          </div>
        </div>

        <h4>Nuovi episodi radio</h4>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-3 mb-5">
          <div className="col">
            <img src="/public/images/2a.png" alt="Rauw" className="img-fluid rounded w-100" />
          </div>
          <div className="col">
            <img src="/public/images/2b.png" alt="Wanderer" className="img-fluid rounded w-100" />
          </div>
          <div className="col">
            <img src="/public/images/2c.png" alt="Buble" className="img-fluid rounded w-100" />
          </div>
          <div className="col">
            <img src="/public/images/2d.png" alt="Moccio" className="img-fluid rounded w-100" />
          </div>
          <div className="col">
            <img src="/public/images/2e.png" alt="Chart" className="img-fluid rounded w-100" />
          </div>
        </div>
      </div>

      {/* Dynamic Section */}
      <div className="px-4">
        <h3>Nuove uscite</h3>
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {songs.map((song) => (
            <div key={song.id} className="col">
              <SongCard song={song} />
            </div>
          ))}
        </div>

        <FavoritesSection />
        <PlayerBar />
      </div>
    </div>
  );
}

export default App;
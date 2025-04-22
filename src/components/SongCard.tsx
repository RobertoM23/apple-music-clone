import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Song } from '../types/Song';
import { RootState } from '../redux/store';
import { setCurrentSong, addFavorite, removeFavorite } from '../redux/features/playerSlice';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.player.favorites);
  const isFavorite = favorites.some(fav => fav.id === song.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(song.id));
    } else {
      dispatch(addFavorite(song));
    }
  };

  return (
    <div className="card bg-secondary text-white">
      <img src={song.albumCover} className="card-img-top" alt={song.title} />
      <div className="card-body">
        <h5 className="card-title">{song.title}</h5>
        <p className="card-text">{song.artist}</p>
        <button
          className="btn btn-light btn-sm me-2"
          onClick={() => dispatch(setCurrentSong(song))}
        >
          <i className="bi bi-play-fill"></i>
        </button>
        <button
          className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-light'}`}
          onClick={toggleFavorite}
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default SongCard;
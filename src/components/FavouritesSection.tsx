import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import SongCard from '../components/SongCard';

const FavoritesSection: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.player.favorites);

  if (favorites.length === 0) return null;

  return (
    <div className="mt-5">
      <h3>Brani Preferiti</h3>
      <div className="row row-cols-2 row-cols-md-4 g-3">
        {favorites.map(song => (
          <div key={song.id} className="col">
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
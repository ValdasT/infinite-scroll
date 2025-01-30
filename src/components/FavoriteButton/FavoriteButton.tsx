import * as React from 'react';
import styles from './FavoriteButton.module.css';

interface FavoriteButtonProps {
  id: number;
  isFavorited: boolean;
  toggleFavorite: (id: number) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, isFavorited, toggleFavorite }) => {
  return (
    <button
      className={isFavorited ? styles.favorited : styles.favoriteButton}
      onClick={() => toggleFavorite(id)}
    >
      {isFavorited ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

export default FavoriteButton;

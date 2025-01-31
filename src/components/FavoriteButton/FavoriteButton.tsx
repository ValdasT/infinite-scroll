import * as React from 'react';
import styles from './FavoriteButton.module.css';

type FavoriteButtonProps = {
  id: number;
  isFavorited: boolean;
  toggleFavorite: (id: number) => void;
};

const FavoriteButton = ({ id, isFavorited, toggleFavorite }: FavoriteButtonProps) => (
  <button
    className={isFavorited ? styles.favorited : styles.favoriteButton}
    onClick={() => toggleFavorite(id)}
    aria-pressed={isFavorited}
  >
    {isFavorited ? 'Unfavorite' : 'Favorite'}
  </button>
);

export default FavoriteButton;

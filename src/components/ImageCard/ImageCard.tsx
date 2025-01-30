import React, { useState } from 'react';
import styles from './ImageCard.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

interface ImageProps {
  id: number;
  src: {
    small: string;
    medium: string;
    large: string;
  };
  photographer: string;
  alt: string;
  isFavorited: boolean;
  toggleFavorite: (id: number) => void;
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;

  return text
    .split(' ')
    .reduce((acc, word) => {
      const newLength = acc.length + (acc ? 1 : 0) + word.length;
      return newLength > maxLength ? acc : `${acc} ${word}`.trim();
    }, '')
    .concat('...');
};

const ImageCard: React.FC<ImageProps> = ({ id, src, photographer, alt, isFavorited, toggleFavorite }) => {
  const [isTouched, setIsTouched] = useState(false);

  const truncatedAlt = truncateText(alt, 40);
  const truncatedPhotographer = truncateText(photographer, 40);

  return (
    <div
      className={`${styles.photoCard} ${isTouched ? styles.touched : ''}`}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setTimeout(() => setIsTouched(false), 300)}
    >
      <div className={styles.imageContainer}>
        <img
          src={src.medium}
          alt={alt}
          loading="lazy"
          className={styles.image}
          srcSet={`
    ${src.small} 350w, 
    ${src.medium} 940w, 
    ${src.large} 1200w
  `}
          sizes="(max-width: 600px) 350px, (max-width: 1024px) 940px, 1200px"
        />
        {isFavorited && <div className={styles.heartIcon}>♡</div>}
        <div className={styles.overlay}>
          <h3 className={styles.title}>{truncatedAlt}</h3>
          <hr className={styles.separator} />
          <h3 className={styles.title}>{truncatedPhotographer}</h3>
          <FavoriteButton id={id} isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default ImageCard;

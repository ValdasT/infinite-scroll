import { useState, memo } from 'react';
import styles from './ImageCard.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { truncateText } from '../../utils/utils';

type ImageSrc = {
  small: string;
  medium: string;
  large: string;
};

type ImageProps = {
  id: number;
  src: ImageSrc;
  photographer: string;
  alt: string;
  isFavorited: boolean;
  toggleFavorite: (id: number) => void;
};

const ImageCard = ({ id, src, photographer, alt, isFavorited, toggleFavorite }: ImageProps) => {
  const [isTouched, setIsTouched] = useState(false);

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
          srcSet={`${src.small} 350w, ${src.medium} 940w, ${src.large} 1200w`}
          sizes="(max-width: 600px) 350px, (max-width: 1024px) 940px, 1200px"
        />
        {isFavorited && <div className={styles.heartIcon}>♡</div>}
        <div className={styles.overlay}>
          <h3 className={styles.title} style={{ fontWeight: 900 }}>{truncateText(alt, 40)}</h3>
          <hr className={styles.separator} />
          <h3 className={styles.title}>{truncateText(photographer, 40)}</h3>
          <FavoriteButton id={id} isFavorited={isFavorited} toggleFavorite={toggleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCard);

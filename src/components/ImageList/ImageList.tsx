import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchImages, Photo } from '../../api';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageList.module.css';

const ImageList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(
    () => new Set(JSON.parse(localStorage.getItem('favorites') || '[]'))
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Fetches the next batch of images from the API.
   */
  const fetchNextPage = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { photos: newPhotos } = await fetchImages(page);
      setPhotos((prev) => [...prev, ...newPhotos]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, page]);

  /**
   * Loads initial data on mount.
   */
  useEffect(() => {
    fetchNextPage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Persists favorites to localStorage whenever they change.
   */
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  /**
   * IntersectionObserver callback ref to trigger infinite scroll
   * whenever the last photo is intersecting.
   */
  const lastPhotoRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, fetchNextPage]
  );

  /**
   * Toggles the favorited status of an image by id.
   */
  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  return (
    <div className={styles.imageGrid}>
      {photos.map((photo, index) => (
        <div
          key={`${photo.id}-${index}`}
          ref={index === photos.length - 1 ? lastPhotoRef : null}
        >
          <ImageCard
            id={photo.id}
            src={photo.src}
            photographer={photo.photographer}
            alt={photo.alt}
            isFavorited={favorites.has(photo.id)}
            toggleFavorite={handleToggleFavorite}
          />
        </div>
      ))}

      {isLoading && <p className={styles.loading}>Loading...</p>}
    </div>
  );
};

export default ImageList;

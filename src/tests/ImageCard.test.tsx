import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageCard from '../components/ImageCard/ImageCard';

const mockImage = {
  id: 1,
  src: {
    small: 'https://via.placeholder.com/350',
    medium: 'https://via.placeholder.com/940',
    large: 'https://via.placeholder.com/1200',
  },
  photographer: 'Test Photographer',
  alt: 'Test Image Description',
  isFavorited: false,
};

describe('ImageCard Component', () => {
  it('should render the image with the correct alt text', () => {
    render(<ImageCard {...mockImage} toggleFavorite={() => {}} />);
    
    const img = screen.getByRole('img', { name: /test image description/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockImage.src.medium);
  });

  it('should render the truncated alt and photographer text', () => {
    render(<ImageCard {...mockImage} toggleFavorite={() => {}} />);
    
    const altText = screen.getByText(/test image description/i);
    const photographerText = screen.getByText(/test photographer/i);

    expect(altText).toBeInTheDocument();
    expect(photographerText).toBeInTheDocument();
  });

  it('should call toggleFavorite when favorite button is clicked', () => {
    const mockToggleFavorite = jest.fn();
    render(<ImageCard {...mockImage} toggleFavorite={mockToggleFavorite} />);
    
    const favButton = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(favButton);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockImage.id);
  });

  it('should show heart icon when favorited', () => {
    render(<ImageCard {...mockImage} isFavorited={true} toggleFavorite={() => {}} />);
    
    const heartIcon = screen.getByText('♡');
    expect(heartIcon).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavoriteButton from '../components/FavoriteButton/FavoriteButton';

describe('FavoriteButton', () => {
  it('should render with "Favorite" text when not favorited', () => {
    render(<FavoriteButton id={1} isFavorited={false} toggleFavorite={() => {}} />);
    
    const button = screen.getByRole('button', { name: /favorite/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Favorite');
  });

  it('should render with "Unfavorite" text when favorited', () => {
    render(<FavoriteButton id={1} isFavorited={true} toggleFavorite={() => {}} />);
    
    const button = screen.getByRole('button', { name: /unfavorite/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Unfavorite');
  });

  it('should call toggleFavorite with the correct id when clicked', () => {
    const mockToggleFavorite = jest.fn();
    render(<FavoriteButton id={42} isFavorited={false} toggleFavorite={mockToggleFavorite} />);

    const button = screen.getByRole('button', { name: /favorite/i });
    fireEvent.click(button);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(42);
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageList from '../components/ImageList/ImageList'; 
import { fetchImages } from '../api';

// Mock the API function
jest.mock('../api', () => ({
  fetchImages: jest.fn(),
}));

const mockPhotos = [
  {
    id: 1,
    src: {
      small: 'https://via.placeholder.com/350',
      medium: 'https://via.placeholder.com/940',
      large: 'https://via.placeholder.com/1200',
    },
    photographer: 'Photographer One',
    alt: 'Image One',
  },
  {
    id: 2,
    src: {
      small: 'https://via.placeholder.com/350',
      medium: 'https://via.placeholder.com/940',
      large: 'https://via.placeholder.com/1200',
    },
    photographer: 'Photographer Two',
    alt: 'Image Two',
  },
];

describe('ImageList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and render images on mount', async () => {
    (fetchImages as jest.Mock).mockResolvedValueOnce({ photos: mockPhotos });
    render(<ImageList />);
    expect(fetchImages).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByAltText('Image One')).toBeInTheDocument();
      expect(screen.getByAltText('Image Two')).toBeInTheDocument();
    });
  });

  it('should display "Loading..." while fetching images', async () => {
    (fetchImages as jest.Mock).mockResolvedValueOnce({ photos: mockPhotos });
    render(<ImageList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('should handle API failure gracefully', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    (fetchImages as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<ImageList />);
    expect(fetchImages).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
    expect(console.error).toHaveBeenCalledWith('Error fetching photos:', expect.any(Error));
    consoleErrorMock.mockRestore(); 
  });

  it('should toggle favorite status when clicking on a favorite button', async () => {
    (fetchImages as jest.Mock).mockResolvedValueOnce({ photos: mockPhotos });
    render(<ImageList />);
    await waitFor(() => {
      expect(screen.getByAltText('Image One')).toBeInTheDocument();
    });
    const favButton = screen.getAllByRole('button')[0];
    fireEvent.click(favButton);
    await waitFor(() => {
      expect(favButton).toHaveTextContent('Unfavorite');
    });
    fireEvent.click(favButton);
    await waitFor(() => {
      expect(favButton).toHaveTextContent('Favorite');
    });
  });
});

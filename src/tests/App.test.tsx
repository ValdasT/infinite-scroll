import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  fetchMock.resetMocks(); 
});

test('fetches and displays photos', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        photos: [
          {
            id: 1,
            src: {
              small: 'https://example.com/photo-small.jpg',
              medium: 'https://example.com/photo-medium.jpg',
              large: 'https://example.com/photo-large.jpg',
            },
            photographer: 'John Doe',
            alt: 'Sample Photo'
          }
        ]
      })
    );
  
    render(<App />);
  
    await waitFor(() => {
      expect(screen.getByAltText('Sample Photo')).toBeInTheDocument();
    });
  });
  

test('handles empty response gracefully', async () => {
    fetchMock.mockResponseOnce(
        JSON.stringify({ photos: [] })
      );

  render(<App />);

  await waitFor(() => {
    expect(screen.queryByAltText('Sample Photo')).not.toBeInTheDocument();
  });
});

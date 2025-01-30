import { fetchImages, Photo } from '../api';

// Enable fetch mocking
global.fetch = jest.fn();

describe('fetchImages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch images successfully', async () => {
    const mockPhotos: Photo[] = [
      {
        id: 1,
        src: { small: 'small.jpg', medium: 'medium.jpg', large: 'large.jpg' },
        photographer: 'Test Photographer',
        alt: 'Test Image',
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ photos: mockPhotos }),
    });

    const result = await fetchImages(1);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.photos).toEqual(mockPhotos);
  });

  it('should throw an error when the response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchImages(1)).rejects.toThrow('Failed to fetch images');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array when API response is invalid', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalidData: true }),
    });
  
    const result = await fetchImages(1);
  
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result.photos).toEqual([]); 
    expect(console.error).toHaveBeenCalledWith('API returned invalid response:', { invalidData: true });
  
    consoleErrorMock.mockRestore(); 
  });
});

const API_KEY = '8eSZVC99LfyJHLKQQmDtHKk7X6gsFanMpPtlfaM5PDxjHg1ky165leMi';
const API_URL = 'https://api.pexels.com/v1/search?query=fashion&per_page=10&page=';

export interface Photo {
    id: number;
    src: { small: string, medium: string; large: string };
    photographer: string
    alt: string;
}

export const fetchImages = async (page: number): Promise<{ photos: Photo[] }> => {
    const response = await fetch(`${API_URL}${page}`, {
        headers: { Authorization: API_KEY },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }

    const data = await response.json();

    if (!data || typeof data !== 'object' || !Array.isArray(data.photos)) {
        console.error('API returned invalid response:', data);
        return { photos: [] };
    }

    return data;
};


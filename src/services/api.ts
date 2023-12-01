import axios from 'axios';

const API_KEY = '1c71abb56dmsh28eae1e5af97c61p19628ajsn41b220c9f8e2';

const instance = axios.create({
    baseURL: 'https://airbnb13.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': API_KEY
    }
});


export const searchByLocation = async (params: {
    location: string,
    checkin: string,
    checkout: string,
    adults: string,
    children: string,
    infants: string,
    pets: string,
    page: string,
    currency: string
}) => {
    console.log('Request parameters:', params); // Log the request parameters
    try {
        const response = await instance.get('/search-location', { params });
        console.log('API response:', response.data); // Log the full API response
        return response.data.results; // Return only the results array
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};
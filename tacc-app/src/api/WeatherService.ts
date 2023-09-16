import axios from 'axios';
import { APIResponse } from '../types/WeatherAPIResponse';

const API_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (
  lat: number,
  lon: number
): Promise<APIResponse> => {
  try {
    const response = await axios.get<APIResponse>(API_BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        units: 'metric',
        appid: process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      },
    });
    console.log('Weather data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

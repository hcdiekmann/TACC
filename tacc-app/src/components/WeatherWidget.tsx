import { useEffect, useState } from 'react';
import { getWeather } from '../api/WeatherService';
import { APIResponse } from '../types/WeatherAPIResponse';
import { Card, Center, Loader, Stack, Text } from '@mantine/core';
import {
  IconSunFilled,
  IconSunWind,
  IconCloud,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
  IconCloudOff,
} from '@tabler/icons-react';

export const WeatherWidget = (): JSX.Element => {
  const [weather, setWeather] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const fetchCoords = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (err) => {
            setError(new Error('Could not fetch coordinates'));
          }
        );
      } else {
        setError(new Error('Geolocation is not supported by this browser.'));
      }
    };

    const fetchWeather = async () => {
      if (latitude && longitude) {
        try {
          setIsLoading(true);
          const weather = await getWeather(latitude, longitude);
          setWeather(weather);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (latitude !== null && longitude !== null) {
      fetchWeather();
    } else {
      fetchCoords();
    }
  }, [latitude, longitude]);

  return (
    <Card radius='md'>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : error ? (
        <Center>
          <Stack align='center'>
            <IconCloudOff size={42} />
            <Text>Weather currently unavailable</Text>
          </Stack>
        </Center>
      ) : (
        <div>{`${weather?.name} ${weather?.main.temp} °C`}</div>
      )}
    </Card>
  );
};

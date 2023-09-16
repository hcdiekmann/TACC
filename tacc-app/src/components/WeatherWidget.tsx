import { useEffect, useState } from 'react';
import { getWeather } from '../api/WeatherService';
import { APIResponse, WeatherDetails } from '../types/WeatherAPIResponse';
import { Card, Center, Flex, Loader, Stack, Text } from '@mantine/core';
import {
  IconSunrise,
  IconSunset,
  IconSunFilled,
  IconSunWind,
  IconCloud,
  IconCloudRain,
  IconCloudSnow,
  IconCloudStorm,
  IconCloudOff,
  IconMapPin,
} from '@tabler/icons-react';

const getWeatherIcon = (weatherDetails: WeatherDetails): React.ReactElement => {
  switch (weatherDetails.main) {
    case 'Clear':
      return <IconSunFilled size={68} />;
    case 'Clouds':
      return <IconCloud size={68} />;
    case 'Rain':
      return <IconCloudRain size={68} />;
    case 'Snow':
      return <IconCloudSnow size={68} />;
    case 'Thunderstorm':
      return <IconCloudStorm size={68} />;
    default:
      return <IconSunWind size={68} />;
  }
};

const convertUnixToTime = (unixTimestamp: number, timezone: number): string => {
  const date = new Date((unixTimestamp + timezone) * 1000);
  return date.toISOString().substr(11, 5);
};

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
            <IconCloudOff size={68} />
            <Text>Weather currently not available</Text>
          </Stack>
        </Center>
      ) : (
        <Center>
          <Stack align='center' spacing='md'>
            <Flex gap='xs'>
              <IconMapPin size={20} />
              <Text fw={500}>{weather?.name}</Text>
            </Flex>
            <Flex gap='md'>
              {weather?.weather[0] && getWeatherIcon(weather.weather[0])}
              <Flex direction='column' gap='xs'>
                <Text fw={600} size={40}>{`${weather?.main.temp.toFixed(
                  1
                )} °C`}</Text>
              </Flex>
            </Flex>
            <Flex gap='xs'>
              <IconSunrise size={22} />
              <Text>
                {convertUnixToTime(
                  weather?.sys.sunrise || 0,
                  weather?.timezone || 0
                )}
              </Text>
            </Flex>
            <Flex gap='xs'>
              <IconSunset size={22} />

              <Text>
                {convertUnixToTime(
                  weather?.sys.sunset || 0,
                  weather?.timezone || 0
                )}
              </Text>
            </Flex>
          </Stack>
        </Center>
      )}
    </Card>
  );
};

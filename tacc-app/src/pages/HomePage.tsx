import { Container, Title, Grid } from '@mantine/core';
import { WeatherWidget } from '../components/WeatherWidget';
import SpotifyPlayer from '../components/SpotifyPlayer';
import { useAuth } from '../context/AuthContext';

export const HomePage = (): JSX.Element => {
  const { profile } = useAuth();
  const greeting = getGreeting();
  const userName = profile?.display_name?.split(' ')[0];

  return (
    <Container p={10}>
      <Title mb={15} order={1}>{`${greeting}, ${userName}!`}</Title>
      <Grid>
        <Grid.Col lg={6}>
          <SpotifyPlayer />
        </Grid.Col>
        <Grid.Col lg={6}>
          <WeatherWidget />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

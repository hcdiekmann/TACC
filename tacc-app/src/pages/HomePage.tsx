import { Container, Title, SimpleGrid } from '@mantine/core';
import { WeatherWidget } from '../components/WeatherWidget';
import SpotifyPlayer from '../components/SpotifyPlayer';

export const HomePage = (): JSX.Element => {
  const greeting = getGreeting();
  const userName = 'Christian';

  return (
    <Container p={10}>
      <Title order={1}>{`${greeting}, ${userName}!`}</Title>
      <SimpleGrid
        p={10}
        cols={2}
        breakpoints={[{ maxWidth: '84rem', cols: 1, spacing: 'sm' }]}
      >
        <SpotifyPlayer />
        <WeatherWidget />
      </SimpleGrid>
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

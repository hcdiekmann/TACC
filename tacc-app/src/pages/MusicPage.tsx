import { Container, Title } from '@mantine/core';
import SpotifyPlayer from '../components/SpotifyPlayer';

export const MusicPage = (): JSX.Element => {
  return (
    <Container p={10}>
      <Title order={1}>Music</Title>
      <SpotifyPlayer />
    </Container>
  );
};

import { Button, Container, Group, Title, rem } from '@mantine/core';
import { IconBrandSpotify } from '@tabler/icons-react';

export const MusicPage = (): JSX.Element => {
  return (
    <Container p={10}>
      <Title order={1}>Music</Title>
      <Group mt={5} position='left'>
        <Button
          component='a'
          href='https://localhost:8888'
          leftIcon={<IconBrandSpotify size={rem(32)} />}
          variant='gradient'
          gradient={{ from: '#00993F', to: '#1ED760', deg: 105 }}
        >
          Login to Spotify
        </Button>
      </Group>
    </Container>
  );
};

import { useState, useEffect } from 'react';
import {
  Stack,
  Loader,
  Text,
  Card,
  Group,
  Center,
  createStyles,
  getStylesRef,
  rem,
  Container,
} from '@mantine/core';
import {
  IconPlayerTrackPrevFilled,
  IconPlayerTrackNextFilled,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-react';
import { useSpotifyPlayer } from '../context/SpotifyPlayerProvider';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(380),
    width: rem(380),
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef('image')}`]: {
      transform: 'scale(1.03)',
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
  },

  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

function SpotifyPlayer() {
  const { classes, theme } = useStyles();
  const { player, playerState } = useSpotifyPlayer();
  const [isLoading, setLoading] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    if (!player) {
      console.log('Player is not initialized.');
      return;
    }
    if (!playerState) {
      console.log('Player State is not available.');
      setLoading(true);
      return;
    }
    setLoading(false);
    setTrack(playerState.track_window.current_track);
    setPaused(playerState.paused);
  }, [player, playerState]);

  if (isLoading) {
    return (
      <Stack align='center'>
        <Loader size='xl' />
        <Text fw={600}>Use your Spotify App to stream to this device</Text>
      </Stack>
    );
  } else {
    return (
      <Stack align='center' spacing='sm'>
        <Card p='lg' className={classes.card} shadow='lg' radius='lg'>
          <div
            className={classes.image}
            style={{
              backgroundImage: `url(${current_track.album.images[0].url})`,
            }}
          />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <div>
              <Text size='lg' className={classes.title} weight={500}>
                {current_track.name}
              </Text>
              <Text size='sm' className={classes.author}>
                {current_track.artists[0].name}
              </Text>
            </div>
          </div>
        </Card>
        <Group>
          <IconPlayerTrackPrevFilled
            size={60}
            onClick={() => {
              player.previousTrack();
            }}
          />
          {isPaused ? (
            <IconPlayerPlay
              size={80}
              onClick={() => {
                player.togglePlay();
              }}
            />
          ) : (
            <IconPlayerPause
              size={80}
              onClick={() => {
                player.togglePlay();
              }}
            />
          )}
          <IconPlayerTrackNextFilled
            size={60}
            onClick={() => {
              player.nextTrack();
            }}
          />
        </Group>
      </Stack>
    );
  }
}

export default SpotifyPlayer;

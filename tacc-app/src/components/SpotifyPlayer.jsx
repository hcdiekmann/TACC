import { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  Card,
  Group,
  createStyles,
  getStylesRef,
  rem,
  Button,
  Slider,
} from '@mantine/core';
import {
  IconPlayerTrackPrevFilled,
  IconPlayerTrackNextFilled,
  IconPlayerPlayFilled,
  IconPlayerPause,
  IconBrandSpotify,
  IconPlugConnectedX,
  IconVolume,
} from '@tabler/icons-react';
import { useSpotifyPlayer } from '../context/SpotifyPlayerProvider';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(320),
    width: rem(320),
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
    top: '60%',
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

  icon: {
    '&:hover': {
      cursor: 'pointer',
      color: theme.primaryColor,
    },
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
  const { classes } = useStyles();
  const { player, playerState } = useSpotifyPlayer();
  const [isOffline, setOffline] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isPaused, setPaused] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (player) {
        try {
          const currentVolume = await player.getVolume();
          const normalizedVolume = (currentVolume * 100).toFixed(0);
          if (volume !== normalizedVolume) {
            setVolume(normalizedVolume);
          }
        } catch (e) {
          console.error('Failed to get volume:', e);
        }
      }
    }, 1000); // poll volume every 1 second, no event!? :/

    return () => clearInterval(intervalId);
  }, [player, volume]);

  useEffect(() => {
    if (!player) {
      console.log('Player is not initialized.');
      setOffline(true);
      return;
    }
    setOffline(false);
    if (!playerState) {
      console.log('Player State is not available.');
      setLoading(true);
      return;
    }
    if (playerState.context.uri === null) {
      setLoading(true);
      return;
    }
    setLoading(playerState.loading);

    if (playerState.track_window.current_track) {
      setTrack(playerState.track_window.current_track);
    }
    setPaused(playerState.paused);
  }, [player, playerState, volume]);

  if (isOffline) {
    return (
      <Stack p={10} align='center'>
        <IconPlugConnectedX size={80} />
        <Text fw={600}>
          Spotify not available. Ensure you are logged in and have a Premium
          subscription.
        </Text>
        <Button
          component='a'
          href='http://localhost:5000/auth/login'
          leftIcon={<IconBrandSpotify size={rem(32)} />}
          variant='gradient'
          gradient={{ from: '#00993F', to: '#1ED760', deg: 105 }}
        >
          Login
        </Button>
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <Card radius='lg'>
        <Stack align='center' spacing='xs'>
          <IconBrandSpotify size={48} color='#00993F' />
          <Text fw={600}>Use your Spotify App to stream to this device</Text>
        </Stack>
      </Card>
    );
  } else {
    return (
      <Card radius='lg'>
        <Stack align='center' spacing='sm'>
          {current_track ? (
            <Card p='lg' className={classes.card} radius='md'>
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
          ) : (
            <div>Not playing</div>
          )}
          <Group>
            <IconPlayerTrackPrevFilled
              className={classes.icon}
              size={68}
              onClick={() => {
                player.previousTrack();
              }}
            />
            {isPaused ? (
              <IconPlayerPlayFilled
                className={classes.icon}
                size={82}
                onClick={() => {
                  player.togglePlay();
                }}
              />
            ) : (
              <IconPlayerPause
                className={classes.icon}
                size={82}
                onClick={() => {
                  player.togglePlay();
                }}
              />
            )}
            <IconPlayerTrackNextFilled
              className={classes.icon}
              size={68}
              onClick={() => {
                player.nextTrack();
              }}
            />
          </Group>
        </Stack>
        <Slider
          pl={10}
          pr={10}
          pt={15}
          pb={5}
          thumbSize={26}
          thumbChildren={<IconVolume size='1rem' />}
          styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
          value={volume}
          onChange={async (value) => {
            try {
              await player.setVolume(value / 100);
              setVolume(value);
            } catch (e) {
              console.error('Failed to set volume:', e);
            }
          }}
        />
      </Card>
    );
  }
}

export default SpotifyPlayer;

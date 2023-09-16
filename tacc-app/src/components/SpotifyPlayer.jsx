import { useState, useEffect } from 'react';
import { Stack, Loader, Text } from '@mantine/core';
import { useSpotifyPlayer } from '../context/SpotifyPlayerProvider';

const track = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

function SpotifyPlayer() {
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
      <>
        <div className='container'>
          <div className='main-wrapper'>
            <img
              src={current_track.album.images[0].url}
              className='now-playing__cover'
              alt=''
            />

            <div className='now-playing__side'>
              <div className='now-playing__name'>{current_track.name}</div>
              <div className='now-playing__artist'>
                {current_track.artists[0].name}
              </div>

              <button
                className='btn-spotify'
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className='btn-spotify'
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {isPaused ? 'PLAY' : 'PAUSE'}
              </button>

              <button
                className='btn-spotify'
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SpotifyPlayer;

import { createContext, useContext, useState, useEffect } from 'react';
// ToDo: npm install --save-dev @types/spotify-web-playback-sdk
// convert to typescript
const SpotifyPlayerContext = createContext();

let spotifyPlayer = null;

function getSpotifyPlayer(token) {
  // Ensure we only initialize once
  if (spotifyPlayer) return spotifyPlayer;

  spotifyPlayer = new window.Spotify.Player({
    name: 'Toyota App',
    getOAuthToken: (cb) => {
      cb(token);
    },
    volume: 0.5,
  });

  return spotifyPlayer;
}

export const SpotifyPlayerProvider = ({ children, token }) => {
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState(null);

  useEffect(() => {
    const scriptId = 'spotify-player-sdk';

    // Check if script is already added
    let existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);
      existingScript = script;
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = getSpotifyPlayer(token);

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        setPlayerState(state);
      });

      player.connect();

      // Cleanup on component unmount
      return () => {
        existingScript.remove();
      };
    };
  }, [token, playerState]);

  return (
    <SpotifyPlayerContext.Provider
      value={{
        player,
        playerState,
      }}
    >
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayer = () => {
  const context = useContext(SpotifyPlayerContext);
  if (!context) {
    throw new Error(
      'useSpotifyPlayer must be used within a SpotifyPlayerProvider'
    );
  }
  return context;
};

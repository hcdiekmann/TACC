import { DataContext, DataProvider } from './context/DataProvider';
import { MainAppShell } from './components/MainAppShell';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { MusicPage } from './pages/MusicPage';
import { NavigationPage } from './pages/NavigationPage';
import { SpotifyPlayerProvider } from './context/SpotifyPlayerProvider';
import { useState, useEffect, useContext } from 'react';
import { LoginPage } from './pages/LoginPage';
import { getToken, refreshToken } from './auth/TokenManager';

export const AppProvider = (): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);
  const [refreshTokenValue] = useState<string | null>(null);
  const refreshInterval = 3500 * 1000; // Refresh every 3500 seconds (a little less than 1 hour to be safe)

  useEffect(() => {
    async function initializeToken() {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
        setTimeout(async () => {
          if (refreshTokenValue !== null) {
            const newToken = await refreshToken(refreshTokenValue);
            if (newToken) {
              setToken(newToken);
            }
          } else {
            console.warn(
              'Refresh token is null. Could not refresh access token.'
            );
            // Handle this case accordingly, maybe navigate user back to login?
          }
        }, refreshInterval);
      }
    }

    initializeToken();
  }, [refreshTokenValue, refreshInterval]);

  return (
    <>
      {!token ? (
        <LoginPage />
      ) : (
        <SpotifyPlayerProvider token={token}>
          <DataProvider>
            <PageProvider />
          </DataProvider>
        </SpotifyPlayerProvider>
      )}
    </>
  );
};

const PageProvider = (): JSX.Element => {
  const { page } = useContext(DataContext);

  function renderMainPage() {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'account':
        return <AccountPage />;
      case 'settings':
        return <SettingsPage />;
      case 'music':
        return <MusicPage />;
      case 'nav':
        return <NavigationPage />;
      default:
        return <HomePage />;
    }
  }

  function renderSidebar() {
    return <p>Information</p>;
  }

  return (
    <MainAppShell sidebar={renderSidebar()}>{renderMainPage()}</MainAppShell>
  );
};

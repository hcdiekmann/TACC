import { DataContext, DataProvider } from './context/DataProvider';
import { MainAppShell } from './components/MainAppShell';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { MusicPage } from './pages/MusicPage';
import { NavigationPage } from './pages/NavigationPage';
import { SpotifyPlayerProvider } from './context/SpotifyPlayerProvider';
import { DateTimeWidget } from './components/DateTimeWidget';
import { useState, useEffect, useContext } from 'react';
import { LoginPage } from './pages/LoginPage';
import { getToken, refreshToken } from './auth/TokenManager';

export const AppProvider = (): JSX.Element => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function initializeToken() {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);

        const expiration = sessionStorage.getItem('spotifyTokenExpiration');
        const timeToRefresh = expiration
          ? Number(expiration) - new Date().getTime()
          : 0;

        setTimeout(async () => {
          if (token !== null) {
            const newToken = await refreshToken();
            if (newToken) {
              setToken(newToken);
            }
          } else {
            console.warn('Could not refresh access token.');
            setToken(null);
          }
        }, timeToRefresh - 5000); // Refresh 5 seconds before token expires to be safe
      }
    }

    initializeToken();
  });

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
    return <DateTimeWidget />;
  }

  return (
    <MainAppShell sidebar={renderSidebar()}>{renderMainPage()}</MainAppShell>
  );
};

import { DataContext, DataProvider } from './context/DataProvider';
import { MainAppShell } from './components/MainAppShell';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { MusicPage } from './pages/MusicPage';
import { NavigationPage } from './pages/NavigationPage';
import { SpotifyPlayerProvider } from './context/SpotifyPlayerProvider';
import { useState, useEffect, useContext } from 'react';
import LoginPage from './pages/LoginPage';

export const AppProvider = (): JSX.Element => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = sessionStorage.getItem('spotifyToken');

    if (storedToken) {
      setToken(storedToken);
      return;
    }

    async function getToken() {
      const response = await fetch('http://localhost:5000/auth/token');
      const json = await response.json();
      sessionStorage.setItem('spotifyToken', json.access_token);
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <>
      {token === '' ? (
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

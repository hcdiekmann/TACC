import { DataContext, DataProvider } from './context/DataContext';
import { MainAppShell } from './components/MainAppShell';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { MusicPage } from './pages/MusicPage';
import { NavigationPage } from './pages/NavigationPage';
import { SpotifyPlayerProvider } from './context/SpotifyPlayerProvider';
import { DateTimeWidget } from './components/DateTimeWidget';
import { useContext } from 'react';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './context/AuthContext';

export const AppProvider = (): JSX.Element => {
  const { token } = useAuth();
  const auth_enabled = process.env.REACT_APP_ENABLED_AUTH;

  return (
    <>
      {!token && auth_enabled === 'true' ? (
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

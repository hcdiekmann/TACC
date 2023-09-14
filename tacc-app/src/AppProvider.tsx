import { useContext } from 'react';
import { DataContext } from './context/DataProvider';
import { DataProvider } from './context/DataProvider';
import { MainAppShell } from './components/MainAppShell';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';
import { MusicPage } from './pages/MusicPage';
import { NavigationPage } from './pages/NavigationPage';

export const AppProvider = (): JSX.Element => {
  return (
    <DataProvider>
      <PageProvider />
    </DataProvider>
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

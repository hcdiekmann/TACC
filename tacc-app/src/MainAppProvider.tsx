import { useContext } from 'react';
import { DataContext } from './context/DataProvider';
import { DataProvider } from './context/DataProvider';
import { MainAppShell } from './components/MainAppShell';
import { HomePage } from './pages/HomePage';
import { AccountPage } from './pages/AccountPage';
import { SettingsPage } from './pages/SettingsPage';

export const MainAppProvider = (): JSX.Element => {
  return (
    <DataProvider>
      <PageProvider />
    </DataProvider>
  );
};

const PageProvider = (): JSX.Element => {
  const { page } = useContext(DataContext);

  function render() {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'account':
        return <AccountPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage />;
    }
  }

  return <MainAppShell>{render()}</MainAppShell>;
};

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import { AppProvider } from './AppProvider';
import { AuthPage } from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App = (): JSX.Element => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme: colorScheme,
          primaryColor: 'RoyalBlue',
          colors: {
            RoyalBlue: [
              '#eff3fb',
              '#dce4f0',
              '#b5c7e3',
              '#8ba8d7',
              '#688dcc',
              '#537dc6',
              '#4774c4',
              '#3963ae',
              '#30589c',
              '#234c8a',
            ],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications position='top-center' />
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path='/' element={<AppProvider />} />
              <Route path='/callback' element={<AuthPage />} />
            </Routes>
          </Router>
        </AuthProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

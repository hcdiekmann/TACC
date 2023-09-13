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
import { MainAppProvider } from './MainAppProvider';

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
          primaryColor: 'ToyotaBlue',
          colors: {
            ToyotaBlue: [
              '#eef5fc',
              '#dae6f3',
              '#b1cbe8',
              '#85afdf',
              '#6297d8',
              '#4c89d3',
              '#4082d2',
              '#336fbb',
              '#2963a7',
              '#195594',
            ],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications position='top-center' />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<MainAppProvider />} />
          </Routes>
        </Router>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications position='top-center' />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

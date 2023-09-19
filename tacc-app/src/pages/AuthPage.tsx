import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import { getAccessToken, redirectToAuthCodeFlow } from '../auth/AuthService';
import { useAuth } from '../context/AuthContext';

const clientId = process.env.REACT_APP_AUTH_CLIENT_ID as string;
const clientSecret = process.env.REACT_APP_AUTH_CLIENT_SECRET as string;

export const AuthPage = (): JSX.Element => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, clientSecret, code);
        if (accessToken) {
          setToken(accessToken);
          navigate('/');
          return;
        }
      }
    }
    getToken();
  });

  return (
    <Center mt={100}>
      <Loader variant='bars' color='green' />
    </Center>
  );
};

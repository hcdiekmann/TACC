import { GetTokenResponse, RefreshTokenResponse } from '../types/TokenResponse';

export async function getToken(): Promise<string | null> {
  try {
    const storedToken = sessionStorage.getItem('spotifyToken');
    const expiration = sessionStorage.getItem('spotifyTokenExpiration');
    const currentTime = new Date().getTime();

    if (storedToken && expiration && currentTime < Number(expiration)) {
      return storedToken;
    }

    const response = await fetch('http://localhost:5000/auth/token');
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const json: GetTokenResponse = await response.json();
    sessionStorage.setItem('spotifyToken', json.access_token);
    sessionStorage.setItem('spotifyRefreshToken', json.refresh_token);

    // Calculate the exact timestamp when the token will expire
    const expirationTime = new Date().getTime() + json.expires_in * 1000;
    sessionStorage.setItem('spotifyTokenExpiration', expirationTime.toString());

    return json.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

export async function refreshToken(): Promise<string | null> {
  try {
    const refreshToken = sessionStorage.getItem('spotifyRefreshToken');
    const response = await fetch(
      `http://localhost:5000/refresh_token?refresh_token=${refreshToken}`
    );
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const json: RefreshTokenResponse = await response.json();
    sessionStorage.setItem('spotifyToken', json.access_token);

    // Calculate the exact timestamp when the token will expire
    const expirationTime = new Date().getTime() + json.expires_in * 1000;
    sessionStorage.setItem('spotifyTokenExpiration', expirationTime.toString());

    return json.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

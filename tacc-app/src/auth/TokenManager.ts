type TokenResponse = {
  access_token: string;
};

export async function getToken(): Promise<string | null> {
  try {
    const storedToken = sessionStorage.getItem('spotifyToken');
    if (storedToken) return storedToken;

    const response = await fetch('http://localhost:5000/auth/token');
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }

    const json: TokenResponse = await response.json();
    sessionStorage.setItem('spotifyToken', json.access_token);
    return json.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

export async function refreshToken(
  refresh_token: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `http://localhost:5000/refresh_token?refresh_token=${refresh_token}`
    );
    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }
    const json: TokenResponse = await response.json();
    sessionStorage.setItem('spotifyToken', json.access_token);
    return json.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

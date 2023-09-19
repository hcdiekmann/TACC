import { UserProfile } from '../types/UserProfile';

export async function fetchProfile(token: string): Promise<UserProfile> {
  try {
    const result = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await result.json();
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
}

export async function getAccessToken(
  clientId: string,
  clientSecret: string,
  code: string
): Promise<string> {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:3000/callback');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const { access_token, refresh_token, expires_in } = await result.json();
  sessionStorage.setItem('refresh_token', refresh_token);
  sessionStorage.setItem('expires_in', expires_in);
  return access_token;
}

export async function refreshAccessToken(
  clientId: string,
  clientSecret: string
): Promise<string> {
  const refreshToken = sessionStorage.getItem('refresh_token');
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refreshToken!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const { access_token, expires_in } = await result.json();
  sessionStorage.setItem('expires_in', expires_in);
  return access_token;
}

export async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem('verifier', verifier);

  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('response_type', 'code');
  params.append('redirect_uri', 'http://localhost:3000/callback');
  params.append('scope', 'streaming user-read-email user-read-private');
  params.append('code_challenge_method', 'S256');
  params.append('code_challenge', challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const uintArray = new Uint8Array(digest);
  const arr = [];
  for (let i = 0; i < uintArray.length; i++) {
    arr.push(String.fromCharCode(uintArray[i]));
  }
  return btoa(arr.join(''))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

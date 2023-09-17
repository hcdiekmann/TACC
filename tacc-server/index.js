const { generateRandomString } = require('./helpers');
const express = require('express');
const cors = require('cors');
const request = require('request');
const dotenv = require('dotenv');

const port = 5000;
// TODO: use cache or session storage
global._access_token = '';
global._refresh_token = '';
global._expires_in = '';

dotenv.config();
var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
var spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

var app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/auth/login', (req, res) => {
  var scope = 'streaming user-read-email user-read-private';

  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect(
    'https://accounts.spotify.com/authorize/?' +
      auth_query_parameters.toString()
  );
});

app.get('/auth/callback', (req, res) => {
  var code = req.query.code || null;
  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter.' });
  }

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString(
          'base64'
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      _access_token = body.access_token;
      _expires_in = body.expires_in;
      _refresh_token = body.refresh_token;
      res.redirect('http://localhost:3000/');
    }
  });
});

app.get('/refresh_token', function (req, res) {
  var refresh_token = req.query.refresh_token || null;

  if (!refresh_token) {
    return res.status(400).json({ error: 'Missing refresh_token parameter.' });
  }

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer.from(
          spotify_client_id + ':' + spotify_client_secret
        ).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (response.statusCode !== 200) {
      return res.status(response.statusCode).json(body);
    }
    _access_token = body.access_token;
    _expires_in = body.expires_in;

    res.json({
      access_token: _access_token,
      expires_in: _expires_in,
    });
  });
});

app.get('/auth/token', (req, res) => {
  res.json({
    access_token: _access_token,
    refresh_token: _refresh_token,
    expires_in: _expires_in,
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

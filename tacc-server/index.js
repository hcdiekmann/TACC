const { generateRandomString } = require('./helpers');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = 5000;

var app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

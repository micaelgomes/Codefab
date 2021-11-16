const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');

const { v4 } = require('uuid');

require('dotenv').config();

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.post('/api/auth', async (req, res) => {
  const { code } = req.body;

  const formData = new FormData();
  formData.append('client_id', client_id);
  formData.append('client_secret', client_secret);
  formData.append('code', code);
  formData.append('redirect_uri', redirect_uri);

  const access_token = await fetch(
    `https://github.com/login/oauth/access_token`,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then(response => {
      return response.text();
    })
    .then(paramsString => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get('access_token');

      return access_token;
    })
    .catch(error => {
      return res.status(400).json(error);
    });

  // GET /user
  const user = await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${access_token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      return res.status(400).json(error);
    });

  if (access_token && user) {
    return res.status(200).json({
      access_token,
      ...user,
    });
  }

  return res.status(400).json('error in object mouting');
});

app.post('/api/create', (req, res) => {
  const access_token = req.headers.authorization;

  fetch(`https://api.github.com/user/repos`, {
    method: 'POST',
    headers: {
      Authorization: `token ${access_token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: {
      name: 'testantoPOSTcodefab',
    },
  })
    .then(response => {
      console.log('responsePOST: ', response);
      return res.status(201).json(response);
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

export default app;

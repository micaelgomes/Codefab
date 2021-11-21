const express = require('express');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { Base64 } = require('js-base64');

const multer = require('multer');
const upload = multer();

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
      console.log('HEADERS: ', response.headers);
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

app.post('/api/create', async (req, res) => {
  const access_token = req.headers.authorization;
  const { body } = req;

  const bodyCreateRepo = {
    name: body.name,
    description: body.description,
  };

  const fable = Base64.btoa(body.code);

  const response = await fetch(`https://api.github.com/user/repos`, {
    method: 'POST',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify(bodyCreateRepo),
  });

  const url = response.headers.get('Location');

  if (url) {
    const response = await fetch(
      `https://api.github.com/repos/${body.username}/${body.name}/contents/fable.xml`,
      {
        method: 'PUT',
        headers: {
          Authorization: access_token,
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: 'Commit do playground',
          content: fable,
        }),
      },
    );

    return res.status(201).json({
      url,
    });
  }

  return res.status(400).json({
    message: "repo don't created",
  });
});

app.post('/api/file', upload.array('assets'), async (req, res) => {
  const access_token = req.headers.authorization;

  const { files } = req;

  files.forEach((file, i) => {
    console.log('enviando a Nº ', i + 1);
    const buffer = Buffer.from(file.buffer, 'binary');
    const content = buffer.toString('base64');

    fetch(
      `https://api.github.com/repos/micaelteste/test-16/contents/${file.originalname}`,
      {
        method: 'PUT',
        headers: {
          Authorization: access_token,
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: 'Commit do playground',
          content,
        }),
      },
    )
      .then(res => console.log(i + 1, ' foi enviada.'))
      .catch(err => console.log(i + 1, ' deu errado.'));
  });
});

export default app;

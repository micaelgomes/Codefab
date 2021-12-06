const express = require('express');
const path = require('path');
const getFiles = require('node-recursive-directory');
const fetch = require('node-fetch');
const FormData = require('form-data');
const multer = require('multer');
const upload = multer();
const Base64 = require('js-base64');

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

app.get('/api/gallery', async (req, res) => {
  const foldersAssets = path.join(__dirname, '..', '/public/assets/');
  const files = await getFiles(foldersAssets, true);

  const map = new Map(
    files.map(({ dirname, filename }) => [
      dirname,
      { theme: dirname, images: [] },
    ]),
  );

  for (let { dirname, filename } of files)
    map.get(dirname).images.push(...[filename].flat());

  const result = Array.from(map, ([name, value]) => value);

  return res.status(200).json(Object.values(result));
});

app.post('/api/file', upload.array('assets'), async (req, res) => {
  const access_token = req.headers.authorization;
  const { files } = req;
  const { user, repo } = req.query;

  files.forEach(async file => {
    const buffer = Buffer.from(file.buffer, 'binary');
    const content = buffer.toString('base64');

    fetch(
      `https://api.github.com/repos/${user}/${repo}/contents/${file.originalname}`,
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
      .then(response =>
        response
          .json()
          .then(responseJson => res.status(200).json(responseJson)),
      )
      .catch(err => res.json(400).json(err));
  });
});

app.put('/api/file/fable', async (req, res) => {
  const access_token = req.headers.authorization;
  const { fable } = req.body;
  const { user, repo, sha } = req.query;

  const buffer = Buffer.from(fable);
  const content = buffer.toString('base64');

  fetch(`https://api.github.com/repos/${user}/${repo}/contents/fable.xml`, {
    method: 'PUT',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: 'Commit atualizando fable do playground',
      sha,
      content,
    }),
  })
    .then(response =>
      response.json().then(responseJson => res.status(200).json(responseJson)),
    )
    .catch(err => res.json(400).json(err));
});

app.delete('/api/file', async (req, res) => {
  const access_token = req.headers.authorization;
  const { user, repo, nameFile, sha } = req.query;

  fetch(`https://api.github.com/repos/${user}/${repo}/contents/${nameFile}`, {
    method: 'DELETE',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify({
      message: 'Deletando arquivo do playground',
      sha,
    }),
  })
    .then(response => response.json())
    .then(responseJson => res.status(200).json(responseJson))
    .catch(err => res.status(404).json(err));
});

app.get('/api/projects', async (req, res) => {
  const access_token = req.headers.authorization;
  const { user } = req.query;

  fetch(`https://api.github.com/users/${user}/repos`, {
    method: 'GET',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then(response => response.json())
    .then(responseJson =>
      res
        .status(200)
        .json(responseJson.filter(repo => repo?.topics.includes('codefab'))),
    )
    .catch(error =>
      res
        .status(400)
        .json({ message: 'Erro na busca de respositórios', error }),
    );
});

app.post('/api/project', async (req, res) => {
  const access_token = req.headers.authorization;
  const { body } = req;

  const bodyCreateRepo = {
    name: body.name,
    description: body.description,
  };

  const response = await fetch(`https://api.github.com/user/repos`, {
    method: 'POST',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
    body: JSON.stringify(bodyCreateRepo),
  })
    .then(responseGitHub => responseGitHub.json())
    .catch(error => res.status(400).json(error));

  if (response.name) {
    fetch(
      `https://api.github.com/repos/${response.owner.login}/${response.name}/topics`,
      {
        method: 'PUT',
        headers: {
          Authorization: access_token,
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          names: [
            'fablejs',
            'codefab',
            'codefab-community',
            'codefab-discovery',
          ],
        }),
      },
    ).catch(errorTopics => res.status(404).json(errorTopics));

    fetch(
      `https://api.github.com/repos/${response.owner.login}/${response.name}/contents/fable.xml`,
      {
        method: 'PUT',
        headers: {
          Authorization: access_token,
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: 'Criando a fable',
          content: 'PGZhYmxlPgoJPHBhZ2U+CiAgCiAgICAKICA8L3BhZ2U+CjwvZmFibGU+',
        }),
      },
    )
      .then(() => res.status(201).json(response))
      .catch(err => res.json(400).json(err));
  }
});

app.delete('/api/project', async (req, res) => {
  const access_token = req.headers.authorization;
  const { user, repo } = req.query;

  fetch(`https://api.github.com/repos/${user}/${repo}`, {
    method: 'DELETE',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then(() =>
      res.status(200).json({
        message: 'repository successfully deleted',
      }),
    )
    .catch(error => res.status(400).json(error));
});

app.get('/api/project', async (req, res) => {
  const access_token = req.headers.authorization;
  const { user, repo } = req.query;

  fetch(`https://api.github.com/repos/${user}/${repo}/contents`, {
    method: 'GET',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then(response =>
      response.json().then(responseJson => res.status(200).json(responseJson)),
    )
    .catch(error =>
      res.status(400).json({ message: 'Erro na busca do respositório', error }),
    );
});

app.get('/api/project/fable', async (req, res) => {
  const access_token = req.headers.authorization;
  const { user, repo } = req.query;

  fetch(`https://api.github.com/repos/${user}/${repo}/contents/fable.xml`, {
    method: 'GET',
    headers: {
      Authorization: access_token,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then(response =>
      response.json().then(responseJson => {
        const content = responseJson.content;

        return res.status(200).json({
          ...responseJson,
          fable: Base64.decode(content),
        });
      }),
    )
    .catch(error =>
      res.status(400).json({ message: 'Erro na busca da fable', error }),
    );
});

export default app;

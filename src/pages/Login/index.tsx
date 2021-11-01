import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { api } from '../../services/api';

const Login: React.FC = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID as string;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const client_secret = process.env.REACT_APP_CLIENT_SECRET;
  const state = process.env.REACT_APP_STATE;

  return (
    <div>
      <h1>login</h1>
      <input type="email" />
      <input type="password" />
      <a
        href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&allow_signup=true`}
      >
        <FiGithub />
        <span>Login com GitHub</span>
      </a>
    </div>
  );
};

export default Login;

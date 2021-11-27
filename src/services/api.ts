import axios from 'axios';

const user = JSON.parse(localStorage.getItem('@codefab:user') as string);
const access_token = user?.access_token;

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `token ${access_token}`,
  },
});

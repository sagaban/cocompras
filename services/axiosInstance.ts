import axios from 'axios';

// TODO: Maybe this should be in nuxt.config.js
export default axios.create({
  baseURL: `http://localhost:3000/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

import axios from 'axios';
import { getAccessToken } from './AuthService';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

const BASE_URL = env.REACT_APP_BASE_URL;

export {getTranslation};

function getTranslation(queryString) {
    const url = `${BASE_URL}/api/word?queryString=${queryString}`;
    return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
  }
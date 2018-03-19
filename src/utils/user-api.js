import axios from 'axios';
import { getAccessToken } from './AuthService';
import runtimeEnv from '@mars/heroku-js-runtime-env';
const env = runtimeEnv();

const BASE_URL = env.REACT_APP_BASE_URL;

export {getFoodData, getCelebrityData, getUserData};

function getFoodData() {
  const url = `${BASE_URL}/api/jokes/food`;
  return axios.get(url).then(response => response.data);
}

function getCelebrityData() {
  const url = `${BASE_URL}/api/jokes/celebrity`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

function getUserData() {
  const url = `${BASE_URL}/api/userprofile`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => console.log(response.data));
}
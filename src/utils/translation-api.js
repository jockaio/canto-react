import axios from 'axios';
import { getAccessToken } from './AuthService';
import runtimeEnv from '@mars/heroku-js-runtime-env';
import {createFilter} from 'react-search-input'

const env = runtimeEnv();
const BASE_URL = env.REACT_APP_BASE_URL;

export {getTranslation, getFilteredSearchResult};

function getTranslation(queryString) {
  const url = `${BASE_URL}/api/word?queryString=${queryString}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getAccessToken()}` }}).then(response => response.data);
}

const KEYS_TO_FILTERS = ['item', 'romanization', 'translation']
var searchResult = [];
getTranslation().then((response) => {
  searchResult = response;
});

function getFilteredSearchResult(searchTerm){
  console.log(searchResult);
  return searchResult.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
}
import axios from 'axios'

const PROXY_URL = 'https://allorigins.hexlet.app/get?disableCache=true&url='

const getPosts = (ulr) => {
  return axios.get(PROXY_URL + encodeURIComponent(ulr))
}

export { getPosts }

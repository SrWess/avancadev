import axios from 'axios'

const apiKey = '7254d0221d242b10d0405e27c7962bcdddb2610a8e2b724b726ffb828e8da60a'

export const cryptoHttp = axios.create({
  baseURL: 'https://min-api.cryptocompare.com/data',
  headers: {
    authorization: `ApiKey ${apiKey}`
  }
})
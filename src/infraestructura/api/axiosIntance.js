const axios = require('axios').default;

const axiosInstance = axios.create({
  baseURL: 'https://api.mercadolibre.com/',
});

module.exports = axiosInstance;
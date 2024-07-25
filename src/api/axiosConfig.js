// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://35.95.212.85/',
});

export default instance;

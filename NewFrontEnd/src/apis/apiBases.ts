import axios from 'axios';

export const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

export const backEndAPI = axios.create({
  baseURL: 'http://localhost:3001/',
});

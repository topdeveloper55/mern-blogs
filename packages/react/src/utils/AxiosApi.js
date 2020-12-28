import axios from 'axios';

const { REACT_APP_CLOUD_NAME } = process.env;

const API = axios.create({
	baseURL: `https://api.Cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/`,
});

export default API;

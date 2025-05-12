
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
});

const auth = {
  signup: async function (data) {
    try {
      const response = await api.post('api/signup/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      return { status: 500 }; // Optional: so your UI can still handle the error gracefully
    }
  },
  login: async function (data) {
    try {
      const response = await api.post('api/login/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      return { status: 500 }; // Optional: so your UI can still handle the error gracefully
    }
  },
  get_user: async function (token) {
    try {
      const response = await api.get('api/user/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Get user failed:', error);
      return { status: 500 }; 
    }
  },
};

export default auth;

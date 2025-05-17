import api from "./base_url";


const endPoints = {
  signup:"api/signup/",
  login:"api/login/",
  get_user:"api/user/",
}


const auth = {
  signup: async function (data) {
    try {
      const response = await api.post(endPoints.signup, data, {
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
      const response = await api.post(endPoints.login, data, {
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
      const response = await api.get(endPoints.get_user, {
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

import api from "./base_url";


const endPoints = {
  signup:"users/signup/",
  login:"users/login/",
  get_user:"users/user/",
  get_all_user:"users/users/",
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
  get_all_users :async function (token) {
    try {
      const response = await api.get(endPoints.get_all_user, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { status: 500 };
    }
  }
};

export default auth;

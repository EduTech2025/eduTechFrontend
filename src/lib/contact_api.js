import api from "./base_url";

const endPoints = {
  email:"contacts/email/",
  
}

const contactApi={
 contact_email: async function (data) {
    try {
      const response = await api.post(endPoints.email, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('creation failed:', error);
      return { status: 500 }; // Optional: so your UI can still handle the error gracefully
    }
  },
}



export default contactApi;
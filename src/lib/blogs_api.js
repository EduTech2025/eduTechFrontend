import api from "./base_url";

const endPoints = {
  create:"blogger/blogs/",
   list: 'blogger/blogs/',
  detail: (id) => `blogger/blogs/${id}/`,
}

const blogApi={
 create_blog: async function (data) {
    try {
      const response = await api.post(endPoints.create, data, {
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
  
  get_all_blogs: async function () {
    try {
      const response = await api.get(endPoints.list);
      return response;
    } catch (error) {
      console.error('Fetching all blogs failed:', error);
      return { status: 500 };
    }
  },

  get_blog_by_id: async function (id) {
    try {
      const response = await api.get(endPoints.detail(id));
      return response;
    } catch (error) {
      console.error(`Fetching blog ${id} failed:`, error);
      return { status: 500 };
    }
  },

  update_blog: async function (id, data) {
    try {
      const response = await api.put(endPoints.detail(id), data);
      return response;
    } catch (error) {
      console.error(`Updating blog ${id} failed:`, error);
      return { status: 500 };
    }
  },

  delete_blog: async function (id) {
    try {
      const response = await api.delete(endPoints.detail(id));
      return response;
    } catch (error) {
      console.error(`Deleting blog ${id} failed:`, error);
      return { status: 500 };
    }
  },
}



export default blogApi;
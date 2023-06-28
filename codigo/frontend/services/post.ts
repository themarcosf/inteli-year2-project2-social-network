import axios from "@/utils/axios";

const API_URL = "http://load-balancer-1420159949.us-east-1.elb.amazonaws.com";

const PostService = {
  create: async (data: any) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    try {
      const response = await axios.post(`${API_URL}/post`, data, config);

      return response;
    } catch (err) {
      return err;
    }
  },
  findById: async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    try {
      const response = await axios.get(`${API_URL}/post/${id}`, config);

      return response;
    } catch (err) {
      return err;
    }
  },
  findAll: async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    try {
      const response = await axios.get(`${API_URL}/post`)
      return response
    }
    catch (error: any) {
      return error
    }
  },
};

export default PostService;

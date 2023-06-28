import axios from "@/utils/axios";

const AuthService = {
  validateToken: async (token: string | null) => {
    if (!token) {
      return false;
    }

    try {
      // const response = await axios.post("/user/validateToken", { token });

      return true;
    } catch (err) {
      return false;
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      const response = await axios.post("/user/login", { email, password });
      console.log(response.data);

      return response.data;
    } catch (err) {
      return err;
    }
  },

  signUp: async () => {},

  signInWithSSO: async () => {},
};

export default AuthService;

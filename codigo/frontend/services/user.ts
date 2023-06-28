import axios from "@/utils/axios"

const API_URL = "localhost:3001"

const UserService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`)
      return response
    }
    catch (error: any) {
      return error
    }
  },
  findAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/user`)
      return response
    }
    catch (error: any) {
      return error
    }
  }
}

export default UserService
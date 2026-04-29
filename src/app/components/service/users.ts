import api from "./api";



// ✅ Get all users
const getUsers = async (options = {}) => {
  const res = await api.get("/users", options);
  return res.data;
};

// ✅ Get single review
const getSingleUser = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// ✅ Create review
const createUser =   async () => {
  const res = await api.post("/users");
  return res.data;
};

// ✅ Update user (e.g. role change)
const updateUser = async (id: string, data: any) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

// ✅ Delete review
const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

// ✅ Get me (current user profile)
const getMe = async (options = {}) => {
  try {
    const res = await api.get("/me", options);
    return res.data?.data || res.data;
  } catch (error) {
    // console.error("Error fetching user data:", error);
    return null;
  }
};

export const userRoute = {
  getUsers,
  getSingleUser,
  getMe,
  createUser,
  updateUser,
  deleteUser,
};
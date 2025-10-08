import axios from "axios";

// Helper to get token from localStorage
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("todoapp"));
  return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// CREATE TODO
const createTodo = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/todo/create`, data, {
    headers: getAuthHeader(),
  });
};

// GET ALL TODO
const getAllTodo = (id) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/todo/getAll/${id}`,
    {},
    { headers: getAuthHeader() }
  );
};

// UPDATE TODO
const updateTodo = (id, data) => {
  return axios.patch(
    `${process.env.REACT_APP_API_URL}/todo/update/${id}`,
    data,
    { headers: getAuthHeader() }
  );
};

// DELETE TODO
const deleteTodo = (id) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/todo/delete/${id}`, {
    headers: getAuthHeader(),
  });
};

const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo };
export default TodoServices;

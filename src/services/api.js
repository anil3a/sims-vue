import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://zmysims.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthHeaders = (userToken) => {
  if (userToken) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
}

export default {
  registerUser(user) {
    return apiClient.post('/auth/register', user).catch((error) => {
      return error;
    });
  },
  loginUser(user) {
    return apiClient.post('/auth/login', user).catch((error) => {
      return error;
    });
  },
  getItems(userToken) {
    setAuthHeaders(userToken);
    return apiClient.get('/items/').catch((error) => {
      return error;
    });
  },
  createItem(userToken, item) {
    setAuthHeaders(userToken);
    return apiClient.post('/items/', item).catch((error) => {
      return error;
    });
  },
  updateItem(userToken, id, item) {
    setAuthHeaders(userToken);
    return apiClient.put(`/items/${id}/`, item).catch((error) => {
      return error;
    });
  },
  deleteItem(userToken, id) {
    setAuthHeaders(userToken);
    return apiClient.delete(`/items/${id}/`).catch((error) => {
      return error;
    });
  },
};

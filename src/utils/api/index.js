import apisauce from "apisauce";
const BASE_URI = "https://api.ouk23.org/v1";

// const auth_token = localStorage.getItem("token");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};
const Api = (token, baseURL = BASE_URI) => {
  const api = apisauce.create({
    baseURL,
    headers
  });

  let Authorization = `Bearer ${token}`;
  api.setHeaders({ Authorization, ...headers });
  return {
    getGroups: (query) => api.get(`${baseURL}/admin/group/${query}`),
    getAdminDetails: () => api.get(`${baseURL}/admin/dashboard`),
    getBlog: (query) => api.get(`${baseURL}/admin/post/${query}`),
    getUsers: (query) => api.get(`${baseURL}/admin/users/registered/${query}`),
    getAdmin: (query) => api.get(`${baseURL}/admin/users/admin/${query}`),
    getSuggestions: (query) => api.get(`${baseURL}/admin/suggestion/${query}`),
    viewSuggestion: (id) => api.get(`${baseURL}/admin/suggestion/${id}`),
    updateGroup: (id, data) =>
      api.patch(`${baseURL}/admin/group/update/${id}`, data),
    updateUser: (id, data) =>
      api.patch(`${baseURL}/admin/users/update/${id}`, data),
    enableUser: (id) => api.patch(`${baseURL}/admin/users/enable/${id}`),
    disableUser: (id) => api.patch(`${baseURL}/admin/users/disable/${id}`),
    suspendGroup: (id) => api.patch(`${baseURL}/admin/group/suspend/${id}`),
    unSuspendGroup: (id) => api.patch(`${baseURL}/admin/group/unsuspend/${id}`),
    publishBlog: (id) => api.patch(`${baseURL}/admin/post/publish/${id}`),
    unPublishBlog: (id) => api.patch(`${baseURL}/admin/post/unpublish/${id}`),
    createBlog: (body) => api.post(`${baseURL}/admin/post`, body),
    createAdmin: (body) =>
      api.post(`${baseURL}/admin/users/admin/create`, body),
    createGroup: (body) => api.post(`${baseURL}/admin/group`, body),
    sendGroupMessage: (id, body) =>
      api.post(`${baseURL}/admin/group/${id}/sendmessage`, body),
    forgotPassword: (body) => api.post(`${baseURL}/forgot-password`, body),
    validateOtp: (body) => api.post(`${baseURL}/verify-code`, body),
    setPassword: (body) => api.post(`${baseURL}/set-password`, body),
    login: (body) => api.post(`${baseURL}/login`, body),
    signup: (body) => api.post(`${baseURL}/signup`, body)
  };
};

export default Api;

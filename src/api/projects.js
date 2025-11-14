import axiosClient from "./axiosClient";
export const getProjects = (page = 1) => axiosClient.get(`/api/v1/admin-projects?page=${page}`);
export const createProject = (data) => axiosClient.post("/api/v1/admin-projects", data,{
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProject = (id) => axiosClient.delete(`/api/v1/admin-projects/${id}`);
export const updateProject = (id) => axiosClient.patch(`/api/v1/admin-projects/${id}`,{
    headers: { "Content-Type": "multipart/form-data" },
  })
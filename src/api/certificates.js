import axiosClient from "./axiosClient";

export const getCertificates = () => axiosClient.get("/api/v1/admin-certificates");
export const createCertificate = (data) => axiosClient.post("/api/v1/admin-certificates", data);
export const deleteCertificate = (id) => axiosClient.delete(`/api/v1/admin-certificates/${id}`);
export const updateCertificate = (id) => axiosClient.patch(`/api/v1/admin-certificates/${id}`)
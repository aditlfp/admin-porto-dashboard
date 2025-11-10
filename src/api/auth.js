import axiosClient from "./axiosClient";

export const getCsrfCookie = () => axiosClient.get("/sanctum/csrf-cookie");

// Login
export const login = async (credentials) => {
  await getCsrfCookie();
  const response = await axiosClient.post("/api/login", credentials);
  const { token, user } = response.data;

  if (!token || !user) {
    throw new Error("Invalid response");
  }

  localStorage.setItem("token", token);
  return { user, token };
};

export const logout = async (user) => {
  try {
    await axiosClient.post("/api/logout", user); // no need to send token — interceptor adds it
  } catch (e) {
    console.warn("Logout API failed", e);
  } finally {
    localStorage.removeItem("token");
  }};

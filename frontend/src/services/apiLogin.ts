import api from "./api";

//Buscar todos os usuários
export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

// Login
export async function loginUser(email: string, password: string) {
  const { data } = await api.post("/users/login", { email, password });
  return data;
}
import api from "./api";

//Buscar todos os usuários
export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

//Criar novo usuário (registro)
export async function addUser(user: { username: string; email: string; password: string }) {
  const { data } = await api.post("/users", user);
  return data;
}

//Registro via autenticação (cria conta e já devolve token JWT)
export async function createUser(user: { username: string; email: string; password: string }) {
  const { data } = await api.post("/auth/register", user);
  return data;
}

//Deletar usuário
export async function deleteUser(userId: string | number) {
  const { data } = await api.delete(`/users/${userId}`);
  return data;
}

//Atualizar usuário
export async function updateUser(userId: string | number, updatedUser: { username?: string; email?: string; password?: string; bio?: string }) {
  const { data } = await api.put(`/users/${userId}`, updatedUser);
  return data;
}

//Buscar usuário por ID
export async function getUserById(userId: string | number) {
  const { data } = await api.get(`/users/${userId}`);
  return data;
}

//Buscar usuário por email
export async function getUserByEmail(email: string) {
  const { data } = await api.get(`/users/email/${email}`);
  return data;
}
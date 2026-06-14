import api from "./api";

//Buscar todos os usuários
export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

// Login (gera token JWT)
export async function loginUser(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}

// Logout (invalida o token no servidor)
export async function logoutUser() {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    // best-effort: mesmo se falhar, o cliente limpa a sessão
  }
}
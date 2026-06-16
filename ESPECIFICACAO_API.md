# Especificação da API REST — BookForum

**Disciplina:** Desenvolvimento Web Back-end (BRADWBK)
**Domínio da aplicação:** Rede social de leitura ("Instagram para livros"). Os
usuários criam conta, publicam *reviews* de livros, curtem e comentam, trocam
mensagens privadas, favoritam livros e acompanham gamificação (XP).

> Observação: o mesmo domínio pode ser reaproveitado de outras disciplinas do curso.

---

## 1. Integrantes do grupo

| Nome | Prontuário |
|------|------------|
| *(preencher)* | *(preencher)* |
| *(preencher)* | *(preencher)* |

---

## 2. Entidades e relacionamentos

Quatro entidades centrais (há outras complementares no sistema):

| Entidade | Descrição |
|----------|-----------|
| **User** | Usuário da plataforma (nome, e-mail, senha BCrypt, avatar, bio, papel). |
| **Post** | *Review* de um livro publicada por um usuário (capa, texto, curtidas, comentários). |
| **Book** | Livro cadastrado (título, autor, descrição, capa, dono). |
| **Message** | Mensagem privada trocada entre dois usuários. |

**Relacionamentos exigidos:**

- **Um-para-Muitos (1:N):** `User` → `Post`. Um usuário possui vários posts; cada
  post pertence a um único autor (`Post.user`, `@ManyToOne`).
  *(Também: `Post` → `PostComment`, `Book` → `Topic`.)*
- **Muitos-para-Muitos (N:M):** `User` ↔ `Book` (livros favoritos), via tabela de
  junção `user_favorite_books` (`User.favoriteBooks`, `@ManyToMany`).

---

## 3. Autenticação

A API usa **JWT (HS256)** e senha criptografada com **BCrypt**.

- Após `register`/`login`, o cliente recebe um **token** e deve enviá-lo em todas as
  requisições protegidas no header:
  `Authorization: Bearer <token>`
- **Rotas públicas** (não exigem token): `POST /api/auth/**`,
  `GET /api/users/{id}/avatar`, `GET /uploads/**`, `/ws` (WebSocket).
- **Qualquer rota protegida sem token válido retorna `401 Unauthorized`.** Para não
  repetir, esse `401` está implícito em todas as tabelas abaixo (exceto nas rotas
  públicas).

---

## 4. Modelagem REST

### 4.1. Autenticação — `/api/auth`

| Verbo | Path | Body de Requisição | Body de Retorno | Status sucesso | Status erro |
|------|------|--------------------|-----------------|----------------|-------------|
| POST | `/api/auth/register` | `{ "username": "ana", "email": "ana@x.com", "password": "123" }` | `{ "token": "...", "id": 1, "username": "ana", "email": "ana@x.com", "avatarUrl": null, "role": "USER", "bio": null }` | `201 Created` | `400` (campos faltando), `409` (e-mail já existe) |
| POST | `/api/auth/login` | `{ "email": "ana@x.com", "password": "123" }` | `{ "token": "...", "id": 1, "username": "ana", "role": "USER", ... }` | `200 OK` | `404` (e-mail não encontrado), `401` (senha incorreta) |
| POST | `/api/auth/logout` | — (header `Authorization: Bearer <token>`) | `"Logout efetuado"` | `200 OK` | — |

### 4.2. Usuários — `/api/users` (entidade **User**, CRUD completo)

| Verbo | Path | Body de Requisição | Body de Retorno | Status sucesso | Status erro |
|------|------|--------------------|-----------------|----------------|-------------|
| GET | `/api/users` | — | `[ { "id": 1, "username": "ana", "email": "...", "avatarUrl": "...", "role": "USER", "bio": "..." } ]` | `200 OK` | `401` |
| GET | `/api/users/{id}` | — | `{ "id": 1, "username": "ana", ... }` | `200 OK` | `404` |
| GET | `/api/users/email/{email}` | — | `{ "id": 1, "username": "ana", ... }` | `200 OK` | `404` |
| PUT | `/api/users/{id}` | `{ "username": "ana2", "email": "...", "bio": "...", "password": "(opcional)" }` | `{ "id": 1, "username": "ana2", ... }` | `200 OK` | `404` |
| DELETE | `/api/users/{id}` | — | — | `204 No Content` | `404` |
| POST | `/api/users/{id}/avatar` | `multipart/form-data` campo `file` (imagem) | `{ "id": 1, "avatarUrl": "/api/users/1/avatar?v=...", ... }` | `200 OK` | `400` (arquivo vazio), `404` |
| GET | `/api/users/{id}/avatar` *(pública)* | — | bytes da imagem (`image/*`) | `200 OK` | `404` (sem foto) |
| POST | `/api/users/{id}/promote?requesterId=` | — | `{ "id": 1, "role": "ADMIN", ... }` | `200 OK` | `403`, `404` |

### 4.3. Posts / Reviews — `/api/posts` (entidade **Post**, CRUD completo)

| Verbo | Path | Body de Requisição | Body de Retorno | Status sucesso | Status erro |
|------|------|--------------------|-----------------|----------------|-------------|
| GET | `/api/posts/feed?userId={id}` | — | `[ { "id": 1, "userId": 2, "username": "ana", "bookTitle": "...", "content": "...", "likesCount": 3, "likedByCurrentUser": true, "comments": [...] } ]` | `200 OK` | `401` |
| GET | `/api/posts/user/{userId}?currentUserId={id}` | — | `[ { ...PostDTO } ]` | `200 OK` | `401` |
| POST | `/api/posts` | `{ "userId": 2, "bookTitle": "1984", "bookAuthor": "Orwell", "coverImageUrl": "...", "content": "Ótimo!" }` | `{ ...PostDTO }` | `200 OK` | `401` |
| POST | `/api/posts/{id}/like?userId={id}` | — | `{ ...PostDTO }` (com `likesCount`/`likedByCurrentUser` atualizados) | `200 OK` | `401` |
| POST | `/api/posts/{id}/comments` | `{ "userId": 2, "content": "Concordo!" }` | `{ ...PostDTO }` (com novo comentário) | `200 OK` | `401` |
| DELETE | `/api/posts/{id}?userId={id}` | — | — | `204 No Content` | `401` |

### 4.4. Mensagens — `/api/messages` (entidade **Message**)

| Verbo | Path | Body de Requisição | Body de Retorno | Status sucesso | Status erro |
|------|------|--------------------|-----------------|----------------|-------------|
| POST | `/api/messages` | `{ "senderId": 1, "receiverId": 2, "content": "oi" }` | `{ "id": 5, "senderId": 1, "receiverId": 2, "content": "oi", "createdAt": "..." }` | `201 Created` | `400` (campos faltando) |
| GET | `/api/messages/conversation/{a}/{b}` | — | `[ { ...MessageDTO } ]` | `200 OK` | `401` |
| GET | `/api/messages/for/{userId}` | — | `[ { ...MessageDTO } ]` (todas do usuário) | `200 OK` | `401` |

### 4.5. Livros — `/api/books` (entidade **Book**)

| Verbo | Path | Body de Requisição | Body de Retorno | Status sucesso | Status erro |
|------|------|--------------------|-----------------|----------------|-------------|
| GET | `/api/books` | — | `[ { "id": 1, "title": "1984", "author": "Orwell", "description": "...", "available": true } ]` | `200 OK` | `401` |
| POST | `/api/books` | `{ "title": "1984", "author": "Orwell", "description": "...", "coverImageUrl": "..." }` | `{ "id": 1, "title": "1984", ... }` | `200 OK` | `401` |
| GET | `/api/books/users/{userId}/books` | — | `[ { ...Book } ]` (livros do dono) | `200 OK` | `401` |

> **Relacionamento N:M (favoritos):** os livros favoritos do usuário são persistidos
> na tabela de junção `user_favorite_books` (entidades `User` ↔ `Book`).

---

## 5. Outros recursos (resumo)

| Recurso | Base | Operações |
|---------|------|-----------|
| Notificações | `/api/notifications` | `GET /for/{userId}`, `POST /{id}/read` |
| XP / Gamificação | `/api/xp` | `GET /{userId}`, `POST /{userId}/book-read`, `GET /leaderboard` |
| Atividades | `/api/activities` | CRUD de admin + `GET /user/{userId}`, `POST /user/{id}/complete` |
| Registro de livros | `/api/register-books` | `GET`, `GET /search`, `POST` |
| Tópicos | `/api/topics` | `GET /book/{bookId}` |
| Comunidades | `/api/communities` | `GET`, `POST` |
| Doações | `/api/donations` | `GET`, `POST` |

---

## 6. Convenções gerais

- Formato de dados: **JSON** (exceto upload de avatar, que é `multipart/form-data`).
- Datas em ISO-8601 (`createdAt`).
- Erros de autenticação/autorização: `401 Unauthorized` (sem token/inválido) e
  `403 Forbidden` (sem permissão, ex.: rota de admin).
- Recurso não encontrado: `404 Not Found`. Requisição malformada: `400 Bad Request`.

# BookForum — Documentação do Sistema

> Rede social de leitura (estilo Instagram para livros): os usuários publicam
> *reviews* de livros, curtem, comentam, trocam mensagens, ganham XP por leituras,
> participam de comunidades e recebem notificações.

---

## 1. Visão geral

O **BookForum** é uma aplicação web full-stack composta por:

- **Backend**: API REST + WebSocket em **Spring Boot 3.5** (Java 17).
- **Frontend**: SPA em **Vue 3 + Vuetify 3** (Vite), empacotável como app mobile via **Capacitor**.
- **Banco de dados**: **MySQL 8**.
- **Implantação**: **Docker Compose** atrás de um **nginx** (proxy reverso no host) com HTTPS via Certbot.

Domínio de produção: `https://bookforum.vgrn.cloud`

---

## 2. Arquitetura

```
                    Internet (HTTPS)
                          │
              ┌───────────▼────────────┐
              │  nginx do host (VPS)   │  proxy reverso + TLS (Certbot)
              │  bookforum.vgrn.cloud  │
              └─────┬─────────────┬────┘
                    │ /           │ /api, /ws
                    ▼             ▼
        ┌───────────────┐   ┌──────────────────┐
        │ frontend       │   │ backend          │
        │ (nginx Alpine) │   │ (Spring Boot)    │
        │ porta 3002→80  │   │ porta 8086       │
        └───────────────┘   └────────┬─────────┘
                                      │ JDBC
                                      ▼
                              ┌───────────────┐
                              │ MySQL 8 (db)  │
                              │ porta 3306    │
                              │ vol mysql_data│
                              └───────────────┘
```

- O **frontend** é servido como estático por um nginx interno (container) e fala com o backend.
- O **backend** expõe a API em `/api/**` e o WebSocket (STOMP/SockJS) em `/ws`.
- A comunicação **container → container** usa a rede do Docker (`http://backend:8086`), independente das portas publicadas no host.

---

## 3. Stack tecnológica

| Camada | Tecnologias |
|--------|-------------|
| Backend | Spring Boot 3.5.7, Spring Web, Spring Data JPA, Spring Security, Spring WebSocket, Java 17 |
| Banco | MySQL 8 (driver `mysql-connector-j`; PostgreSQL também disponível como runtime) |
| Frontend | Vue 3.5, Vuetify 3.10, Vue Router 4, Pinia, Axios, Vite 7 |
| Tempo real | STOMP sobre SockJS (`@stomp/stompjs`, `sockjs-client`) |
| Mobile | Capacitor (Android/iOS) |
| Build/infra | Gradle (backend), Vite (frontend), Docker, Docker Compose, nginx |

---

## 4. Estrutura de pastas

```
trabalho-ifsp-booksforum/
├── backend/
│   └── src/main/java/com/example/backend/
│       ├── BackendApplication.java
│       ├── config/         # Security, CORS, WebSocket, WebMvc (recursos estáticos)
│       ├── controller/     # endpoints REST
│       ├── service/        # regras de negócio
│       ├── repository/     # Spring Data JPA
│       ├── model/          # entidades JPA
│       └── dto/            # objetos de transferência
├── frontend/
│   └── src/
│       ├── views/          # telas (rotas)
│       ├── components/      # componentes reutilizáveis (AppShell, PostCard, etc.)
│       ├── services/       # clientes HTTP/WebSocket (axios)
│       ├── composable/     # auth, dialog, tema
│       ├── router/         # rotas (vue-router)
│       └── plugins/        # Vuetify, tema
├── docker-compose.yml      # orquestração (db, backend, frontend)
└── DOCUMENTACAO.md         # este arquivo
```

---

## 5. Modelo de dados (entidades JPA)

| Entidade | Descrição | Campos principais |
|----------|-----------|-------------------|
| **User** | Usuário do sistema | `id, username, email, password (BCrypt), avatarUrl, avatarData (BLOB), avatarContentType, bio, role (USER/ADMIN), favoriteBooks` |
| **Book** | Livro do catálogo | título, autor, capa, etc. |
| **RegisterBook** | Cadastro/registro de livro pelo usuário | dados de cadastro + busca |
| **Post** | Publicação/review de um livro | autor, livro, texto, capa, curtidas, comentários |
| **PostComment** | Comentário em um post | autor, conteúdo, post |
| **PostLike** | Curtida em um post | usuário, post |
| **Comment** | Comentário (genérico) | — |
| **Message** | Mensagem privada entre usuários | `senderId, receiverId, content, createdAt` |
| **Notification** | Notificação | `userId, type, read, ...` (tipo `message` é tratado à parte) |
| **Community** | Comunidade | — |
| **Topic** | Tópico vinculado a um livro | — |
| **Donation** | Doação de livro | — |
| **Activity** | Atividade/tarefa criada por admin | descrição, metas |
| **UserActivity** | Atribuição de atividade a um usuário | progresso, conclusão |
| **UserXP** | Gamificação (XP) | `level, totalBooksRead, streak, xp` |

> **Foto de perfil**: a imagem é guardada **no banco** (`User.avatarData` como `LONGBLOB` +
> `avatarContentType`). O campo `avatarUrl` aponta para o endpoint que serve esses bytes
> (`/api/users/{id}/avatar?v=<timestamp>`). Isso garante que a foto **sobrevive a rebuilds**
> do container (o disco do container é efêmero; o MySQL persiste no volume `mysql_data`).

A criação de schema é automática (`spring.jpa.hibernate.ddl-auto=update`).

---

## 6. API REST

Base: `/api`. CORS liberado para origens locais e `*.vercel.app` (ver `CorsConfig`).
Segurança: todas as rotas estão **liberadas** (`permitAll`) — a autorização é feita na
camada de aplicação (ex.: checagem de papel `ADMIN` em endpoints de admin).

### Usuários — `/api/users`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/users` | Lista usuários |
| GET | `/api/users/{id}` | Busca por ID |
| GET | `/api/users/email/{email}` | Busca por e-mail |
| POST | `/api/users` / `/api/users/register` | Cria usuário |
| PUT | `/api/users/{id}` | Atualiza (nome, e-mail, bio, senha, avatar) |
| POST | `/api/users/login` | Login (retorna usuário) |
| POST | `/api/users/{id}/avatar` | Upload de foto (multipart → salva no banco) |
| GET | `/api/users/{id}/avatar` | Serve a foto do banco |
| DELETE | `/api/users/{id}` | Exclui conta |
| POST | `/api/users/{id}/promote` | Promove a ADMIN (só superusuário) |
| POST | `/api/users/{id}/bootstrap-admin` | Promoção inicial via chave secreta |

### Posts (feed) — `/api/posts`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/posts/feed` | Feed de posts |
| GET | `/api/posts/user/{userId}` | Posts de um usuário |
| POST | `/api/posts` | Cria post |
| POST | `/api/posts/{id}/like` | Curte/descurte |
| POST | `/api/posts/{id}/comments` | Comenta |
| DELETE | `/api/posts/{id}` | Exclui post |

### Mensagens — `/api/messages`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/messages` | Envia mensagem |
| GET | `/api/messages/conversation/{a}/{b}` | Conversa entre dois usuários |
| GET | `/api/messages/for/{userId}` | Todas as mensagens de um usuário |

### Notificações — `/api/notifications`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/notifications/for/{userId}` | Notificações do usuário |
| PATCH | `/api/notifications/{id}/read` | Marca como lida |

### XP / Gamificação — `/api/xp`
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/xp/{userId}` | XP do usuário |
| POST | `/api/xp/{userId}/book-read` | Registra leitura (+XP) |
| GET | `/api/xp/leaderboard` | Ranking |

### Atividades — `/api/activities`
| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/activities/admin/create` | (admin) Cria atividade |
| POST | `/api/activities/admin/{activityId}/assign` | (admin) Atribui a usuários |
| GET | `/api/activities/admin/all` | (admin) Lista todas |
| GET | `/api/activities/admin/{activityId}/progress` | (admin) Progresso |
| DELETE | `/api/activities/admin/{activityId}` | (admin) Exclui |
| GET | `/api/activities/admin/users` | (admin) Lista usuários |
| GET | `/api/activities/user/{userId}` | Atividades do usuário |
| POST | `/api/activities/user/{userActivityId}/complete` | Conclui atividade |

### Livros e afins
| Recurso | Base | Endpoints |
|---------|------|-----------|
| Livros | `/api/books` | GET lista, POST cria, GET `/users/{userId}/books` |
| Registro de livros | `/api/register-books` | GET lista, GET `/search`, POST cria |
| Tópicos | `/api/topics` | GET `/book/{bookId}` |
| Comunidades | `/api/communities` | GET lista, POST cria |
| Doações | `/api/donations` | GET lista, POST cria |
| Comentários | `/comments` | GET lista, POST cria |

---

## 7. WebSocket (chat em tempo real)

Configurado em `WebSocketConfig` (STOMP + SockJS):

- **Endpoint de conexão**: `/ws` (SockJS, origens `*`).
- **Broker simples**: tópicos `/topic` e filas `/queue`.
- **Prefixo de aplicação**: `/app` (mensagens enviadas pelo cliente para `@MessageMapping`).
- **Destino de usuário**: `/user` (`convertAndSendToUser`).

O frontend usa `@stomp/stompjs` + `sockjs-client` (`services/socket.ts`) para receber
mensagens da conversa em tempo real.

---

## 8. Frontend

### Rotas (`router/index.ts`)
| Caminho | Tela | Observação |
|---------|------|-----------|
| `/` | `home.vue` | Landing + login/cadastro |
| `/feed` | `FeedView.vue` | Feed principal |
| `/explore` | `ExploreView.vue` | Explorar |
| `/create` | `CreatePostView.vue` | Criar post |
| `/profile` | `ProfileView.vue` | Perfil (posts, XP, bio) |
| `/leaderboard` | `LeaderboardView.vue` | Ranking |
| `/message` | `message.vue` | Conversas |
| `/myBooks` | `myBooks.vue` | Biblioteca |
| `/activities` | `ActivitiesView.vue` | Atividades |
| `/notifications` | `NotificationsView.vue` | Notificações |
| `/admin` | `AdminView.vue` | Painel admin (requer `ADMIN`) |

`startPage` redireciona para `/feed`. As rotas internas exigem autenticação
(`meta.requiresAuth`); `/admin` exige papel `ADMIN` (`meta.requiresAdmin`).

### Navegação (`AppShell.vue`)
A casca principal segue um layout estilo Instagram:

- **Barra superior**: logo "BookForum", alternância de tema, **🔔 Notificações** (com badge) e atalho de admin (🛡️) para ADMIN.
- **Barra inferior**: 🏠 Feed · 🔍 Explorar · ➕ Criar · 💬 **Mensagens** (com badge) · 👤 Perfil.

> As contagens (badges) são atualizadas a cada 30s via `getNotificationsForUser`:
> notificações do tipo `message` alimentam o badge de Mensagens; as demais, o de Notificações.

### Serviços (`services/*.ts`)
Cada recurso tem seu cliente axios: `api.ts` (instância base), `apiRegisterUsers`,
`apiPosts`, `apiMessages`, `apiNotifications`, `apiXP`, `apiActivities`, `apiBooks`,
`apiRegisterBook`, `apiTopics`, `apiCommunity`, `apiLogin`, `socket.ts` (WebSocket).

---

## 9. Autenticação e papéis

- **Login** (`POST /api/users/login`): valida e-mail + senha (BCrypt) e retorna o usuário.
- O frontend guarda os dados do usuário no `localStorage` (`user`, `token`) e usa
  `composable/auth.ts` (`getLoggedUser`, `logout`).
- **Papéis**: `USER` (padrão) e `ADMIN`.
  - O **superusuário** (`bruno-cardoso12@hotmail.com`) é promovido a `ADMIN`
    automaticamente no login.
  - Promoção de outros usuários: `POST /api/users/{id}/promote` (só o superusuário).

> ⚠️ A senha gerada do Spring Security que aparece no log (`Using generated security
> password: ...`) **não é usada** — a autenticação é feita pela própria aplicação. O
> Spring Security está configurado com `permitAll` em todas as rotas.

---

## 10. Funcionalidades principais

- **Feed de reviews**: posts com capa, texto, curtidas e comentários.
- **Perfil**: avatar (no banco), bio, estatísticas (posts, livros lidos, nível), conquistas (chips de XP) e grade de posts.
- **Mensagens**: chat privado entre usuários, em tempo real via WebSocket.
- **Notificações**: avisos diversos; tipo `message` é contabilizado separadamente.
- **Gamificação (XP)**: nível, total de livros lidos, *streak* de dias e ranking.
- **Atividades**: tarefas criadas e atribuídas por admins, com progresso e conclusão.
- **Comunidades, Tópicos, Doações, Biblioteca**: recursos complementares.
- **Tema claro/escuro** e **app mobile** (Capacitor).

---

## 11. Implantação (Docker + nginx)

### Containers (`docker-compose.yml`)
| Serviço | Porta (host → container) | Volume |
|---------|--------------------------|--------|
| `db` (MySQL 8) | 3306 → 3306 | `mysql_data` (persistente) |
| `backend` (Spring Boot) | **8086 → 8086** | — |
| `frontend` (nginx) | 3002 → 80 | — |

> ⚠️ **Atenção à porta do backend**: o app escuta na **8086** dentro do container, então o
> mapeamento publicado **deve** ser `8086:8086`. Um mapeamento errado (ex.: `8086:8080`)
> faz o nginx do host bater em uma porta morta e retornar **502 Bad Gateway** /
> `Connection reset by peer` no `/api`.

### nginx do host (proxy reverso)
Para `bookforum.vgrn.cloud`:
- `/` → `http://127.0.0.1:3002` (frontend)
- `/api` (e `/ws`) → `http://127.0.0.1:8086` (backend)
- TLS gerenciado pelo Certbot.

### Passo a passo de deploy na VPS
```bash
cd ~/sistemaIFSP/trabalho-ifsp-booksforum
git pull
docker compose up -d --build          # rebuild é obrigatório p/ refletir mudanças de código
docker compose ps                     # conferir STATUS e PORTS
```
Para mudanças só no frontend, basta `docker compose up -d --build frontend`.

### Diagnóstico rápido (502)
```bash
docker compose ps                                   # algum Exited/Restarting?
docker compose logs --tail=60 backend
docker compose logs --tail=60 frontend
curl -i http://127.0.0.1:8086/api/users             # backend acessível pelo host?
sudo nginx -T | grep -E "server_name|proxy_pass"    # proxy aponta p/ as portas certas?
```

---

## 12. Variáveis de ambiente

| Variável | Padrão | Onde |
|----------|--------|------|
| `PORT` | `8086` | backend (porta do servidor) |
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/bookgram` | backend |
| `SPRING_DATASOURCE_USERNAME` | `bookgram_user` | backend |
| `SPRING_DATASOURCE_PASSWORD` | `1234` | backend |
| `ALLOWED_ORIGINS` | origens locais + `*.vercel.app` | backend (CORS) |
| `VITE_API_URL` | — | frontend (base da API) |

> No `docker-compose.yml`, o backend aponta para o banco via `jdbc:mysql://db:3306/bookgram`
> (nome do serviço Docker `db`).

---

## 13. Desenvolvimento local

**Backend**
```bash
cd backend
./gradlew bootRun          # sobe em http://localhost:8086 (precisa de MySQL)
```

**Frontend**
```bash
cd frontend
npm install
npm run dev                # Vite em http://localhost:5173
```

**Tudo via Docker**
```bash
docker compose up -d --build
# frontend: http://localhost:3002 | backend: http://localhost:8086 | db: 3306
```

---

## 14. Notas e pendências conhecidas

- A foto de perfil agora persiste (armazenada no banco). Fotos antigas (que ficavam em
  disco) foram perdidas e precisam ser reenviadas uma vez.
- Restam termos em **português de Portugal** em comentários do backend
  (`utilizador`/`superutilizador`) — não aparecem para o usuário.
- A camada de segurança usa `permitAll`; a autorização real é feita na aplicação.
  Para produção, recomenda-se reforçar autenticação/autorização (ex.: JWT).

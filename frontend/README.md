# Frontend — Bookgram

Interface web desenvolvida com **Vue 3 + Vite + Vuetify**, servida via **Nginx**.

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Backend rodando (veja o [README do backend](../backend/README.md))

---

## Opção 1 — Rodar tudo junto com Docker Compose (recomendado)

Na raiz do projeto (onde está o `docker-compose.yml`):

```bash
docker compose up --build
```

O frontend ficará acessível em:

```
http://localhost:3002
```

---

## Opção 2 — Rodar o frontend localmente (modo desenvolvimento)

### 1. Entre na pasta do frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O frontend ficará disponível em:

```
http://localhost:3002
```

> Certifique-se de que o backend está rodando em `http://localhost:8086`.

---

## Como testar a aplicação

### Criar uma conta

1. Acesse `http://localhost:3002`
2. Clique em **Registrar**
3. Preencha nome, e-mail e senha
4. Faça login com as credenciais criadas

### Funcionalidades para testar

| Funcionalidade        | Onde encontrar                        |
|-----------------------|---------------------------------------|
| Login / Registro      | Tela inicial                          |
| Feed de posts         | Página principal após login           |
| Explorar              | Menu → Explorar                       |
| Meus livros           | Menu → Meus Livros                    |
| Adicionar livro       | Meus Livros → botão adicionar         |
| Perfil                | Menu → Perfil                         |
| Mensagens             | Menu → Mensagens                      |
| Notificações          | Ícone de sino no topo                 |
| Leaderboard de XP     | Menu → Ranking                        |

---

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/` e são servidos automaticamente pelo Nginx no Docker.

---

## Parar os serviços

```bash
docker compose down
```

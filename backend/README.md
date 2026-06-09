# Backend — Bookgram

API REST desenvolvida com **Spring Boot** e banco de dados **MySQL**.

---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

---

## Como rodar com Docker

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd comunidade_de_livros
```

### 2. Suba todos os serviços (banco + backend + frontend)

Na raiz do projeto (onde está o `docker-compose.yml`):

```bash
docker compose up --build
```

> Na primeira execução o Docker vai baixar as imagens e compilar o projeto. Pode demorar alguns minutos.

### 3. Verifique se os serviços estão rodando

```bash
docker compose ps
```

Você deve ver três containers com status `running`:

| Container         | Porta          |
|-------------------|----------------|
| bookgram_db       | 3306           |
| bookgram_backend  | **8080**       |
| bookgram_frontend | 3000           |

### 4. Acesse a API

A API estará disponível em:

```
http://localhost:8080
```

---

## Rodar apenas o backend (sem frontend)

```bash
docker compose up --build db backend
```

---

## Parar os serviços

```bash
docker compose down
```

Para remover também os dados do banco:

```bash
docker compose down -v
```

---

## Variáveis de ambiente (configuradas automaticamente pelo Docker Compose)

| Variável                    | Valor padrão                                          |
|-----------------------------|-------------------------------------------------------|
| `SPRING_DATASOURCE_URL`     | `jdbc:mysql://db:3306/bookgram?useSSL=false&serverTimezone=UTC` |
| `SPRING_DATASOURCE_USERNAME`| `bookgram_user`                                       |
| `SPRING_DATASOURCE_PASSWORD`| `1234`                                                |
| `ALLOWED_ORIGINS`           | `http://localhost:5173`, `http://localhost:3000`       |

---

## Problemas comuns

**Porta 8080 já está em uso:**
```bash
# Verifique qual processo está usando a porta
sudo lsof -i :8080
```

**Banco de dados demora para subir:**  
O backend aguarda o MySQL estar saudável antes de iniciar. Se mesmo assim falhar, rode novamente:
```bash
docker compose restart backend
```

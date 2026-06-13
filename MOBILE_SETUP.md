# 📱 Rodar o Bookgram no Celular (Android)

Guia para gerar o APK e testar o app no celular usando o servidor local do computador.

---

## Pré-requisitos

- [Node.js 20+](https://nodejs.org)
- [Android Studio](https://developer.android.com/studio) instalado
- Java 17+ instalado
- Celular Android com **Depuração USB ativada** (ou usar o emulador do Android Studio)

---

## 1. Descobrir o IP do seu computador na rede

O celular e o computador precisam estar na **mesma rede Wi-Fi**.

```bash
# Linux/Mac
ip a | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

Anote o IP, ex: `192.168.1.100`

---

## 2. Ajustar o IP no backend (docker-compose.yml)

No arquivo `docker-compose.yml`, na variável `ALLOWED_ORIGINS` do serviço `backend`, adicione o seu IP atual:

```yaml
ALLOWED_ORIGINS: http://localhost:3002,http://SEU_IP:3002
```

---

## 3. Ajustar o IP no frontend

Crie (ou edite) o arquivo `frontend/.env.local` apontando para o IP do seu computador:

```env
VITE_API_URL=http://SEU_IP:8086
```

> Troque `SEU_IP` pelo IP do passo 1, ex: `VITE_API_URL=http://192.168.1.100:8086`

---

## 4. Subir o servidor com Docker

Na raiz do projeto:

```bash
docker-compose up --build
```

Verifique que o backend está rodando em `http://localhost:8086`.

---

## 5. Build do frontend

```bash
cd frontend
npm install
npm run build
```

Isso gera a pasta `frontend/dist/` que o Capacitor usa.

---

## 6. Sincronizar com o Capacitor

```bash
# Ainda dentro da pasta frontend
npx cap sync android
```

---

## 7. Abrir no Android Studio e gerar o APK

```bash
npx cap open android
```

O Android Studio vai abrir. Então:

1. Aguarde o Gradle sincronizar (barra de progresso no rodapé)
2. Conecte o celular via USB (ou use o emulador)
3. Clique no botão **▶ Run** (ou `Shift+F10`)

### Para gerar APK para instalar manualmente:

No Android Studio:
- Menu **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- O APK gerado estará em:
  ```
  frontend/android/app/build/outputs/apk/debug/app-debug.apk
  ```
- Transfira para o celular e instale (precisa ter "Fontes desconhecidas" habilitado)

---

## 8. Habilitar instalação de APK externo no Android

**Configurações → Segurança → Instalar apps desconhecidos** → habilitar para o gerenciador de arquivos.

---

## Resumo rápido (depois da primeira vez)

```bash
# 1. Subir servidor
docker-compose up

# 2. Build e sync
cd frontend
npm run build && npx cap sync android

# 3. Abrir Android Studio e rodar
npx cap open android
```

---

## Problemas comuns

| Problema | Solução |
|---|---|
| App não conecta ao servidor | Verifique se o IP no `.env.local` está correto e o celular está na mesma rede Wi-Fi |
| CORS error | Adicione o IP do computador no `ALLOWED_ORIGINS` do `docker-compose.yml` |
| Gradle sync falha | No Android Studio: **File → Sync Project with Gradle Files** |
| APK instala mas tela branca | Rode `npm run build` novamente antes do `cap sync` |

---

## 📚 API de Busca de Livros

A busca de livros foi migrada do **Google Books** para a **Open Library** (Internet Archive).

### Motivo da mudança

O Google Books API possui um limite diário de requisições por projeto (~1000/dia). Após atingir esse limite, retorna erro `429 - Quota exceeded`, impossibilitando qualquer busca de livros.

### Nova API: Open Library

| | Google Books (antigo) | Open Library (atual) |
|---|---|---|
| URL base | `googleapis.com/books/v1/volumes` | `openlibrary.org/search.json` |
| Limite diário | ~1000 requisições | **Ilimitado** |
| Chave de API | Obrigatória | **Não precisa** |
| Capas | `imageLinks.thumbnail` | `covers.openlibrary.org/b/id/{cover_i}-M.jpg` |

### Arquivos alterados

- `frontend/src/components/registerBook.vue` — busca e autocompletar ao cadastrar livro
- `frontend/src/views/CreatePostView.vue` — busca de livros ao criar um post

### Exemplo de uso

```typescript
// Buscar livros
const res = await fetch(`https://openlibrary.org/search.json?q=harry+potter&limit=8`)
const data = await res.json()
// data.docs[] contém os resultados

// Capa do livro
const coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
```

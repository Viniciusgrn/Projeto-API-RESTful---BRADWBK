# Balanceamento de carga com NGINX (CR9 / CR10)

Esta pasta contém a configuração do NGINX como **balanceador de carga** entre duas
instâncias do backend, e o roteiro do teste comparativo de desempenho.

## Arquitetura

```
                    ┌──────────────► backend  (127.0.0.1:8086)
Internet → NGINX ───┤  upstream (round-robin)
 (host, :443/:80)   └──────────────► backend2 (127.0.0.1:8087)
                                          │
                          frontend SPA ──► (127.0.0.1:3002)
                                          │
                              MySQL ──────► (db, volume mysql_data)
```

- `docker-compose.yml` → `backend` (8086), `frontend` (3002), `db`.
- `docker-compose.lb.yml` → adiciona `backend2` (8087). **Opt-in** (só com `-f`).
- `nginx/bookforum-loadbalancer.conf` → bloco `upstream` + `proxy_pass`.

---

## 1. Subir COM balanceamento (2 instâncias)

Na VPS, na raiz do projeto:

```bash
docker compose -f docker-compose.yml -f docker-compose.lb.yml up -d --build
docker compose ps   # deve mostrar bookgram_backend (8086) e bookgram_backend2 (8087)
```

## 2. Aplicar a config do NGINX no host

1. Edite o arquivo do site (ex.: `/etc/nginx/sites-available/bookforum.vgrn.cloud`),
   adicionando o bloco `upstream bookforum_backend { ... }` e trocando o
   `proxy_pass` da `location /api/` para `http://bookforum_backend`
   (use `nginx/bookforum-loadbalancer.conf` como referência; mantenha as linhas de
   SSL geradas pelo Certbot).
2. Teste e recarregue:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## 3. Verificar que está balanceando

```bash
# repita algumas vezes — o header X-Upstream deve alternar entre :8086 e :8087
curl -s -o /dev/null -D - https://bookforum.vgrn.cloud/api/users | grep -i x-upstream
```

---

## 4. Teste de desempenho comparativo (CR10 — JMeter)

Rodar o **mesmo** plano de teste nos dois cenários e comparar
**throughput** e **tempo de resposta médio**:

| Cenário | Como configurar |
|---------|-----------------|
| **SEM balanceamento** | No `upstream`, comente o `server 127.0.0.1:8087;`, `reload` no nginx (só a instância 1 atende). Ou suba só `docker compose up -d`. |
| **COM balanceamento** | As duas instâncias ativas e ambas no `upstream`. |

Sugestão de plano no JMeter:
- **Thread Group:** 100 usuários, ramp-up 10s, loop 20 (ajuste à sua máquina).
- **Requisições:** `POST /api/auth/login` (pega token) → `GET /api/posts/feed`
  e `GET /api/users` com o header `Authorization: Bearer ${token}`.
- **Listeners:** *Summary Report* e *Aggregate Report* (exportar como evidência).
- Rode 1x SEM e 1x COM balanceamento, salve os relatórios e compare no PDF.

> Dica: para isolar o efeito do balanceamento da app, mantenha o MySQL igual nos dois
> testes. Se o banco virar gargalo, considere também duplicar/escalar o SGBD, como
> sugerido no enunciado.

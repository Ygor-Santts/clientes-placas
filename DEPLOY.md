# Deploy – Sistema de Clientes e Placas

A aplicação é uma **SPA estática**: todo o CRUD usa IndexedDB no navegador. Não há backend para deploy.

## Build

```bash
cd frontend
npm install
npm run build
```

A pasta `frontend/dist` contém os arquivos para publicar.

## Docker (opcional)

Na raiz do repositório:

```bash
docker compose up --build -d
```

- **Porta 80:** SPA servida por nginx (apenas arquivos estáticos).
- Dados continuam no IndexedDB do navegador de cada usuário.

Parar:

```bash
docker compose down
```

## Plataformas gratuitas (exemplos)

### Render (Static Site)

1. Conectar o repositório.
2. **Build command:** `cd frontend && npm install && npm run build`
3. **Publish directory:** `frontend/dist`
4. Deploy. Não é necessário configurar variáveis de ambiente para API.

### Fly.io

1. Usar o Dockerfile do frontend (pasta `frontend/`).
2. No `fly.toml`, definir que o app serve na porta 80.
3. Deploy com `fly deploy` a partir da pasta do projeto (contexto de build: `frontend`).

### VPS (Oracle Cloud Always Free, etc.)

1. Instalar nginx (ou Caddy) na VM.
2. Fazer o build localmente ou na VM: `cd frontend && npm run build`.
3. Copiar o conteúdo de `frontend/dist` para o diretório que o nginx (ou Caddy) usa como root (ex.: `/var/www/html`).
4. Configurar o servidor para fallback em `index.html` em rotas do Vue Router (try_files no nginx ou equivalente no Caddy).
5. Opcional: usar Caddy ou outro proxy reverso com Let’s Encrypt para HTTPS.

## HTTPS com proxy reverso (Caddy)

Exemplo com Caddy na frente do servidor que serve a SPA:

1. **Caddyfile:**

   ```
   seu-dominio.com {
     root * /var/www/html
     file_server
     try_files {path} /index.html
   }
   ```

2. Caddy obtém certificado automático (Let’s Encrypt) e serve os arquivos estáticos.

## Resumo

| Ambiente      | Comando / passo principal |
|---------------|----------------------------|
| Local Docker  | `docker compose up --build -d` |
| Render        | Static Site: build `frontend`, publish `frontend/dist` |
| Fly.io        | Deploy com Dockerfile do `frontend` |
| VPS           | Build local ou na VM; copiar `frontend/dist` para o servidor web |

Não é necessário configurar backend nem variáveis como `VITE_API_URL`: a aplicação usa apenas IndexedDB e a API pública ViaCEP para CEP.

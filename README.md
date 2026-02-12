# Sistema de Clientes e Placas

Sistema de controle de clientes e placas de veículos: SPA em Vue 3 (Composition API) + TypeScript + Vite, com persistência em **IndexedDB (Dexie)** no navegador. A única API externa usada é o **ViaCEP** para preenchimento de endereço por CEP.

## Visão geral

- **Frontend:** Vue 3, TypeScript, Vite, Vuetify 3, Pinia, Vue Router, Dexie.js (IndexedDB).
- **Persistência:** IndexedDB no navegador (sem backend).
- **API externa:** ViaCEP (https://viacep.com.br) para buscar endereço ao informar CEP.

## Pré-requisitos

- Node.js 18+
- npm (ou pnpm/yarn)

## Desenvolvimento

```bash
cd frontend
npm install
npm run dev
```

Acesse `http://localhost:5173`. Os dados ficam no navegador (IndexedDB).

Na raiz do projeto você também pode usar:

```bash
# Linux/macOS/Git Bash
chmod +x run.sh
./run.sh
```

Isso instala as dependências do frontend (se necessário) e sobe o servidor de desenvolvimento.

## Build e produção

```bash
cd frontend
npm run build
```

A pasta `frontend/dist` conterá a SPA. Para servir em produção, use qualquer servidor estático (nginx, Caddy, etc.) ou Docker:

```bash
docker compose up --build -d
```

Porta 80: SPA em `/`. Ver [DEPLOY.md](DEPLOY.md) para deploy em nuvem.

## Scripts

| Onde     | Script           | Descrição                   |
|----------|------------------|-----------------------------|
| Raiz     | `npm run run`    | Executa `run.sh` (dev)      |
| Raiz     | `npm run dev:frontend` | Frontend em modo dev  |
| Raiz     | `npm run build:frontend` | Build da SPA        |
| Raiz     | `npm run test:frontend`  | Testes (Vitest)     |
| frontend | `npm run dev`    | Servidor de desenvolvimento |
| frontend | `npm run build`  | Build de produção           |
| frontend | `npm run test`   | Testes (Vitest)            |

## Estrutura

```
projeto/
├── frontend/          # Vue 3 + Vite + Vuetify 3 + Pinia + Dexie
│   ├── src/
│   │   ├── api/       # clienteService (IndexedDB), viaCep (ViaCEP)
│   │   ├── db/        # Dexie (schema clientes)
│   │   ├── stores/    # Pinia (useClienteStore)
│   │   ├── components/
│   │   ├── composables/
│   │   ├── views/
│   │   ├── types/
│   │   └── router/
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
├── run.sh
├── README.md
└── DEPLOY.md
```

## Testes

```bash
cd frontend
npm run test        # watch
npm run test:run    # uma execução
```

Inclui testes de validações, máscaras, debounce e integração com Dexie (IndexedDB).

## Licença

Uso interno / educacional.

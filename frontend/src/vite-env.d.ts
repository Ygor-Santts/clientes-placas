/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SEED_MOCK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

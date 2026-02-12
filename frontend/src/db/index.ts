import Dexie from 'dexie'
import type { Cliente } from '@/types/cliente'

export class AppDatabase extends Dexie {
  clientes!: Dexie.Table<Cliente, number>

  constructor() {
    super('SistemaClientesPlacas')
    this.version(1).stores({
      clientes: '++id, nome, cpf, placaCarro',
    })
  }
}

export const db = new AppDatabase()

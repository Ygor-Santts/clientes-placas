import { describe, it, expect, beforeEach } from 'vitest'
import Dexie from 'dexie'
import type { Cliente } from '@/types/cliente'

const dbName = 'TestClientesPlacas'

class TestDb extends Dexie {
  clientes!: Dexie.Table<Cliente, number>

  constructor() {
    super(dbName)
    this.version(1).stores({ clientes: '++id, nome, cpf, placaCarro' })
  }
}

describe('clienteService (IndexedDB)', () => {
  let db: TestDb

  beforeEach(async () => {
    db = new TestDb()
    await db.clientes.clear()
  })

  it('adiciona e lista clientes', async () => {
    const id = await db.clientes.add({
      id: 0,
      nome: 'Teste',
      telefone: '(11) 99999-9999',
      cpf: '529.982.247-25',
      placaCarro: 'ABC1D23',
    })
    const list = await db.clientes.toArray()
    expect(list).toHaveLength(1)
    expect(list[0].nome).toBe('Teste')
    expect(list[0].id).toBe(id)
  })

  it('filtra por último dígito da placa', async () => {
    await db.clientes.bulkAdd([
      { id: 1, nome: 'A', telefone: '1', cpf: '1', placaCarro: 'ABC1D23' },
      { id: 2, nome: 'B', telefone: '2', cpf: '2', placaCarro: 'XYZ9E99' },
      { id: 3, nome: 'C', telefone: '3', cpf: '3', placaCarro: 'AAA1234' },
    ] as Cliente[])
    const todos = await db.clientes.toArray()
    const final3 = todos.filter((c) => {
      const placa = c.placaCarro.replace(/\D/g, '')
      const ultimo = placa.length >= 1 ? parseInt(placa.slice(-1), 10) : -1
      return !Number.isNaN(ultimo) && ultimo === 3
    })
    expect(final3).toHaveLength(1)
    expect(final3[0].placaCarro).toBe('ABC1D23')
  })
})

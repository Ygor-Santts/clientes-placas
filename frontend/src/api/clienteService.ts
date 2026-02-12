import type { Cliente, ClienteCreate } from '@/types/cliente'
import { db } from '@/db'

export async function listarClientes(): Promise<Cliente[]> {
  return db.clientes.toArray()
}

export async function buscarClientePorId(id: number): Promise<Cliente | null> {
  return (await db.clientes.get(id)) ?? null
}

export async function criarCliente(data: ClienteCreate): Promise<Cliente> {
  const id = await db.clientes.add(data as Cliente)
  const created = await db.clientes.get(id)
  if (!created) throw new Error('Falha ao criar cliente')
  return created
}

export async function atualizarCliente(id: number, data: Partial<ClienteCreate>): Promise<Cliente> {
  await db.clientes.update(id, data)
  const updated = await db.clientes.get(id)
  if (!updated) throw new Error('Falha ao atualizar cliente')
  return updated
}

export async function removerCliente(id: number): Promise<void> {
  await db.clientes.delete(id)
}

export async function buscarPorFinalPlaca(finalNumero: number): Promise<Cliente[]> {
  const todos = await db.clientes.toArray()
  return todos.filter((c) => {
    const placa = c.placaCarro.replace(/\D/g, '')
    const ultimo = placa.length >= 1 ? parseInt(placa.slice(-1), 10) : -1
    return !Number.isNaN(ultimo) && ultimo === finalNumero
  })
}

import { db } from '@/db'
import { mockClientes } from '@/data/mockClientes'

export async function seedMockClientes(force = false): Promise<boolean> {
  const count = await db.clientes.count()
  if (count > 0 && !force) return false
  for (const c of mockClientes) {
    await db.clientes.add(c as Parameters<typeof db.clientes.add>[0])
  }
  return true
}

<script setup lang="ts">
import type { Cliente } from '@/types/cliente'

defineProps<{
  clientes: Cliente[]
  loading: boolean
}>()

const emit = defineEmits<{
  novo: []
  editar: [id: number]
  excluir: [id: number]
}>()

function enderecoResumo(c: Cliente) {
  const parts = [c.logradouro, c.bairro, c.cidade].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}
</script>

<template>
  <v-card>
    <v-card-actions class="pt-4">
      <v-btn color="primary" prepend-icon="mdi-plus" @click="emit('novo')">
        Novo cliente
      </v-btn>
    </v-card-actions>
    <v-table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>CPF</th>
          <th>Placa</th>
          <th>Endereço</th>
          <th width="120">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="6" class="text-center pa-4">
            <v-progress-circular indeterminate color="primary" />
          </td>
        </tr>
        <tr v-else-if="clientes.length === 0">
          <td colspan="6" class="text-center text-medium-emphasis pa-4">
            Nenhum cliente cadastrado.
          </td>
        </tr>
        <tr v-for="c in clientes" :key="c.id">
          <td>{{ c.nome }}</td>
          <td>{{ c.telefone }}</td>
          <td>{{ c.cpf }}</td>
          <td>{{ c.placaCarro }}</td>
          <td>{{ enderecoResumo(c) }}</td>
          <td>
            <v-btn
              size="small"
              variant="text"
              icon="mdi-pencil"
              aria-label="Editar cliente"
              @click="emit('editar', c.id)"
            />
            <v-btn
              size="small"
              variant="text"
              icon="mdi-delete"
              color="error"
              aria-label="Excluir cliente"
              @click="emit('excluir', c.id)"
            />
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup lang="ts">
import EmptyState from '@/components/EmptyState.vue'
import type { Cliente } from '@/types/cliente'

defineProps<{
  clientes: Cliente[]
  loading: boolean
}>()

const emit = defineEmits<{
  novo: []
  editar: [id: number]
  excluir: [id: number]
  carregarMock: []
}>()

function enderecoResumo(c: Cliente) {
  const parts = [c.logradouro, c.bairro, c.cidade].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center pa-4 pb-0 pb-2">
      <v-icon start color="primary">mdi-account-group</v-icon>
      Lista de clientes
      <v-card-actions class="pt-2 px-4">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="emit('novo')">
          Novo cliente
        </v-btn>
      </v-card-actions>
    </v-card-title>
    <v-divider />
    <v-table class="table-row">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Telefone</th>
          <th class="text-left">CPF</th>
          <th class="text-left">Placa</th>
          <th class="text-left">Endereço</th>
          <th class="text-left" width="120">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td colspan="6" class="text-center pa-8">
            <v-progress-circular indeterminate color="primary" size="48" />
            <p class="text-body2 text-medium-emphasis mt-2">Carregando...</p>
          </td>
        </tr>
        <tr v-else-if="clientes.length === 0">
          <td colspan="6">
            <EmptyState
              icon="mdi-account-off-outline"
              title="Nenhum cliente cadastrado"
              description="Clique em 'Novo cliente' para começar."
            >
              <template #actions>
                <div class="empty-state-actions">
                  <v-btn
                    color="primary"
                    height="70"
                     width="100%"
                    prepend-icon="mdi-plus"
                    @click="emit('novo')"
                  >
                    Cadastrar primeiro cliente
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="primary"
                    height="70"
                    width="100%"
                    prepend-icon="mdi-database-import"
                    @click="emit('carregarMock')"
                  >
                    Carregar dados de exemplo
                  </v-btn>
                </div>
              </template>
            </EmptyState>
          </td>
        </tr>
        <tr v-for="c in clientes" :key="c.id" class="table-row">
          <td>
            <span class="font-weight-medium">{{ c.nome }}</span>
          </td>
          <td>{{ c.telefone }}</td>
          <td>{{ c.cpf }}</td>
          <td>
            <v-chip size="small" color="primary" variant="tonal" class="font-weight-medium">
              {{ c.placaCarro }}
            </v-chip>
          </td>
          <td class="text-medium-emphasis">{{ enderecoResumo(c) }}</td>
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
              icon="mdi-delete-outline"
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

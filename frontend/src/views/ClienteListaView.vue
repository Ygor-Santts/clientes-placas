<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClienteStore } from '@/stores/clienteStore'
import ClienteLista from '@/components/ClienteLista.vue'

const router = useRouter()
const store = useClienteStore()

onMounted(async () => {
  try {
    await store.carregarTodos()
  } catch {}
})

function novo() {
  router.push({ name: 'cliente-novo' })
}

function editar(id: number) {
  router.push({ name: 'cliente-editar', params: { id } })
}

async function excluir(id: number) {
  if (!confirm('Deseja realmente excluir este cliente?')) return
  try {
    await store.remover(id)
  } catch {}
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">Clientes</h1>
    <ClienteLista
      :clientes="store.listar"
      :loading="store.loading"
      @novo="novo"
      @editar="editar"
      @excluir="excluir"
    />
  </v-container>
</template>

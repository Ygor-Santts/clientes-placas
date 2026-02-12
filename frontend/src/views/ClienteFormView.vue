<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useClienteStore } from '@/stores/clienteStore'
import ClienteFormulario from '@/components/ClienteFormulario.vue'
import type { Cliente, ClienteCreate } from '@/types/cliente'

const router = useRouter()
const route = useRoute()
const store = useClienteStore()

const id = computed(() => {
  const p = route.params.id
  if (p === 'novo') return null
  const n = Number(p)
  return Number.isNaN(n) ? null : n
})

const loading = ref(true)
const cliente = ref<Cliente | null>(null)

onMounted(async () => {
  if (id.value != null) {
    try {
      cliente.value = await store.buscarPorId(id.value) ?? null
      if (!cliente.value) router.replace({ name: 'lista' })
    } catch {
      router.replace({ name: 'lista' })
    }
  }
  loading.value = false
})

async function salvar(data: ClienteCreate) {
  try {
    if (id.value == null) {
      const novo = await store.criar(data)
      router.push({ name: 'cliente-editar', params: { id: novo.id } })
    } else {
      await store.atualizar(id.value, data)
      router.push({ name: 'lista' })
    }
  } catch {}
}

function cancelar() {
  router.push({ name: 'lista' })
}
</script>

<template>
  <v-container fluid>
    <h1 class="text-h5 mb-4">{{ id == null ? 'Novo Cliente' : 'Editar Cliente' }}</h1>
    <ClienteFormulario
      v-if="!loading"
      :cliente="cliente"
      @salvar="salvar"
      @cancelar="cancelar"
    />
    <v-progress-linear v-else indeterminate color="primary" />
  </v-container>
</template>

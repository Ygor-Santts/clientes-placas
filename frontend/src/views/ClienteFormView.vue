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
  <div>
    <div class="d-flex align-center mb-4">
      <h1 class="text-h4 font-weight-bold text-primary">
        {{ id == null ? 'Novo cliente' : 'Editar cliente' }}
      </h1>
    </div>
    <v-card v-if="!loading" class="pa-4 pa-sm-6">
      <ClienteFormulario
        :cliente="cliente"
        @salvar="salvar"
        @cancelar="cancelar"
      />
    </v-card>
    <v-card v-else class="pa-8">
      <v-progress-linear indeterminate color="primary" rounded />
      <p class="text-center text-medium-emphasis mt-3">Carregando...</p>
    </v-card>
  </div>
</template>

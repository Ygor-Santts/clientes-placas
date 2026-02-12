<script setup lang="ts">
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClienteStore } from '@/stores/clienteStore'
import ClienteLista from '@/components/ClienteLista.vue'

const router = useRouter()
const store = useClienteStore()
const dialogExcluir = ref(false)
const idExcluir = ref<number | null>(null)

const clienteExcluir = computed(() => {
  if (idExcluir.value == null) return null
  return store.listar.find((c) => c.id === idExcluir.value!) ?? null
})

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

function abrirDialogExcluir(id: number) {
  idExcluir.value = id
  dialogExcluir.value = true
}

function fecharDialogExcluir() {
  dialogExcluir.value = false
  idExcluir.value = null
}

async function confirmarExcluir() {
  if (idExcluir.value == null) return
  try {
    await store.remover(idExcluir.value)
    fecharDialogExcluir()
  } catch {}
}
</script>

<template>
  <div>
    <div class="d-flex align-center mb-4">
      <h1 class="text-h4 font-weight-bold text-primary">Clientes</h1>
    </div>
    <ClienteLista
      :clientes="store.listar"
      :loading="store.loading"
      @novo="novo"
      @editar="editar"
      @excluir="abrirDialogExcluir"
    />
    <v-dialog v-model="dialogExcluir" max-width="400" persistent rounded="lg">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon color="error" start>mdi-alert-circle-outline</v-icon>
          Excluir cliente?
        </v-card-title>
        <v-card-text>
          <span v-if="clienteExcluir">
            Deseja realmente excluir <strong>{{ clienteExcluir.nome }}</strong>? Esta ação não pode ser desfeita.
          </span>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" @click="fecharDialogExcluir">Cancelar</v-btn>
          <v-btn color="error" variant="flat" @click="confirmarExcluir">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

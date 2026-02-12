<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useClienteStore } from '@/stores/clienteStore'

const router = useRouter()
const store = useClienteStore()

onMounted(async () => {
  try {
    await store.carregarTodos()
  } catch {}
})
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Sistema de Clientes e Placas</v-app-bar-title>
      <v-spacer />
      <v-btn to="/" variant="text" icon="mdi-format-list-bulleted" aria-label="Lista de clientes" />
      <v-btn to="/cliente/novo" variant="text" icon="mdi-plus" aria-label="Novo cliente" />
      <v-btn to="/consulta-final-placa" variant="text" icon="mdi-numeric" aria-label="Consulta por final da placa" />
    </v-app-bar>
    <v-main>
      <div id="main-content" tabindex="-1">
        <v-alert
          v-if="store.error"
          type="error"
          closable
          role="alert"
          aria-live="assertive"
          class="ma-4"
          @click:close="store.clearError()"
        >
          {{ store.error }}
        </v-alert>
        <router-view v-slot="{ Component }">
          <suspense>
            <component :is="Component" />
            <template #fallback>
              <v-progress-linear indeterminate color="primary" class="ma-4" />
            </template>
          </suspense>
        </router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useClienteStore } from '@/stores/clienteStore'

const store = useClienteStore()

onMounted(async () => {
  try {
    await store.carregarTodos()
  } catch {}
})
</script>

<template>
  <v-app>
    <v-app-bar color="primary" elevation="1" density="default">
      <v-app-bar-title class="font-weight-semibold">
        Sistema de Clientes e Placas
      </v-app-bar-title>
      <v-spacer />
      <v-btn to="/" variant="text" class="mr-1">
        <v-icon start>mdi-format-list-bulleted</v-icon>
        Clientes
      </v-btn>
      <v-btn to="/cliente/novo" variant="flat" color="white" class="text-primary">
        <v-icon start>mdi-plus</v-icon>
        Novo
      </v-btn>
      <v-btn to="/consulta-final-placa" variant="text" class="ml-1">
        <v-icon start>mdi-numeric</v-icon>
        Final da placa
      </v-btn>
    </v-app-bar>
    <v-main class="pb-8">
      <div id="main-content" tabindex="-1" class="app-content pa-4">
        <v-alert
          v-if="store.error"
          type="error"
          closable
          role="alert"
          aria-live="assertive"
          class="mb-4"
          rounded="lg"
          @click:close="store.clearError()"
        >
          {{ store.error }}
        </v-alert>
        <router-view v-slot="{ Component }">
          <suspense>
            <component :is="Component" />
            <template #fallback>
              <v-progress-linear indeterminate color="primary" class="rounded-lg" />
            </template>
          </suspense>
        </router-view>
      </div>
    </v-main>
    <v-snackbar
      :model-value="!!store.snackbarMessage"
      color="primary"
      location="bottom"
      rounded="pill"
      @update:model-value="(v) => !v && (store.snackbarMessage = null)"
    >
      {{ store.snackbarMessage }}
      <template #actions>
        <v-btn variant="text" size="small" icon="mdi-close" @click="store.snackbarMessage = null" />
      </template>
    </v-snackbar>
  </v-app>
</template>

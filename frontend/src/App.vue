<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useClienteStore } from '@/stores/clienteStore'
import { seedMockClientes } from '@/api/seedMock'

const theme = useTheme()
const store = useClienteStore()
const { smAndDown } = useDisplay()

const drawerOpen = ref(false)
const THEME_KEY = 'app-theme'
const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'appThemeDark' : 'appThemeLight'
  try {
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
  } catch {}
}

onMounted(async () => {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark') {
      isDark.value = true
      theme.global.name.value = 'appThemeDark'
    }
  } catch {}
  if (import.meta.env.VITE_SEED_MOCK === 'true') {
    try {
      const seeded = await seedMockClientes(false)
      if (seeded) store.showSnackbar('Dados de exemplo carregados.')
    } catch {}
  }
  try {
    await store.carregarTodos()
  } catch {}
})
</script>

<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerOpen"
      location="start"
      temporary
    >
      <v-list nav density="comfortable">
        <v-list-item to="/" prepend-icon="mdi-format-list-bulleted" title="Clientes" @click="drawerOpen = false" />
        <v-list-item to="/cliente/novo" prepend-icon="mdi-plus" title="Novo cliente" @click="drawerOpen = false" />
        <v-list-item to="/consulta-final-placa" prepend-icon="mdi-numeric" title="Final da placa" @click="drawerOpen = false" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" elevation="1" density="default">
      <v-app-bar-nav-icon
        v-if="smAndDown"
        aria-label="Abrir menu"
        @click="drawerOpen = true"
      />
      <v-app-bar-title class="font-weight-semibold">
        {{ smAndDown ? 'Clientes e Placas' : 'Sistema de Clientes e Placas' }}
      </v-app-bar-title>
      <v-spacer />
      <template v-if="!smAndDown">
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
      </template>
      <v-btn
        variant="text"
        icon="mdi-theme-light-dark"
        aria-label="Alternar tema claro/escuro"
        class="ml-2"
        @click="toggleTheme"
      />
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

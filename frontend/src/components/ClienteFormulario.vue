<script setup lang="ts">
import { ref, watch } from 'vue'
import { mascaraCpf, mascaraTelefone, mascaraCep, mascaraPlaca } from '@/composables/useMascaras'
import { validarCpf, validarTelefone, validarPlaca } from '@/composables/useValidacoes'
import { useViaCep } from '@/composables/useViaCep'
import type { Cliente, ClienteCreate } from '@/types/cliente'

const props = defineProps<{
  cliente: Cliente | null
}>()

const emit = defineEmits<{
  salvar: [data: ClienteCreate]
  cancelar: []
}>()

const { buscar: buscarCep, loading: loadingCep } = useViaCep()

const nome = ref('')
const telefone = ref('')
const cpf = ref('')
const placaCarro = ref('')
const cep = ref('')
const logradouro = ref('')
const bairro = ref('')
const cidade = ref('')
const uf = ref('')

const erros = ref<Record<string, string>>({})
const alertMessage = ref('')

watch(
  () => props.cliente,
  (c) => {
    if (!c) {
      nome.value = ''
      telefone.value = ''
      cpf.value = ''
      placaCarro.value = ''
      cep.value = ''
      logradouro.value = ''
      bairro.value = ''
      cidade.value = ''
      uf.value = ''
      return
    }
    nome.value = c.nome
    telefone.value = c.telefone
    cpf.value = c.cpf
    placaCarro.value = c.placaCarro
    cep.value = c.cep ?? ''
    logradouro.value = c.logradouro ?? ''
    bairro.value = c.bairro ?? ''
    cidade.value = c.cidade ?? ''
    uf.value = c.uf ?? ''
  },
  { immediate: true }
)

function onCepBlur() {
  const digits = cep.value.replace(/\D/g, '')
  if (digits.length === 8) {
    buscarCep(cep.value).then((data) => {
      if (data) {
        logradouro.value = data.logradouro
        bairro.value = data.bairro
        cidade.value = data.localidade
        uf.value = data.uf
      }
    })
  }
}

function validar(): boolean {
  const e: Record<string, string> = {}
  if (!nome.value.trim()) e.nome = 'Nome é obrigatório'
  if (!telefone.value.trim()) e.telefone = 'Telefone é obrigatório'
  else if (!validarTelefone(telefone.value)) e.telefone = 'Telefone inválido (10 ou 11 dígitos)'
  if (!cpf.value.trim()) e.cpf = 'CPF é obrigatório'
  else if (!validarCpf(cpf.value)) e.cpf = 'CPF inválido'
  if (!placaCarro.value.trim()) e.placaCarro = 'Placa é obrigatória'
  else if (!validarPlaca(placaCarro.value)) e.placaCarro = 'Placa inválida (Mercosul ou antigo)'
  erros.value = e
  if (Object.keys(e).length) {
    alertMessage.value = 'Corrija os erros do formulário.'
    return false
  }
  alertMessage.value = ''
  return true
}

function submit() {
  if (!validar()) return
  emit('salvar', {
    nome: nome.value.trim(),
    telefone: telefone.value,
    cpf: cpf.value,
    placaCarro: placaCarro.value,
    cep: cep.value || undefined,
    logradouro: logradouro.value || undefined,
    bairro: bairro.value || undefined,
    cidade: cidade.value || undefined,
    uf: uf.value || undefined,
  })
}

function onInputCpf(e: Event) {
  const t = (e.target as HTMLInputElement).value
  cpf.value = mascaraCpf(t)
}

function onInputTelefone(e: Event) {
  const t = (e.target as HTMLInputElement).value
  telefone.value = mascaraTelefone(t)
}

function onInputCep(e: Event) {
  const t = (e.target as HTMLInputElement).value
  cep.value = mascaraCep(t)
}

function onInputPlaca(e: Event) {
  const t = (e.target as HTMLInputElement).value
  placaCarro.value = mascaraPlaca(t)
}
</script>

<template>
  <v-form @submit.prevent="submit">
    <v-alert
      v-if="alertMessage"
      type="warning"
      density="compact"
      role="alert"
      aria-live="assertive"
      class="mb-4"
      rounded="lg"
    >
      {{ alertMessage }}
    </v-alert>
    <p class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3">
      <v-icon size="small" start>mdi-account</v-icon>
      Dados do cliente
    </p>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="nome"
          label="Nome"
          required
          :error-messages="erros.nome"
          aria-required="true"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="telefone"
          label="Telefone"
          required
          :error-messages="erros.telefone"
          aria-required="true"
          hide-details="auto"
          @input="onInputTelefone"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="cpf"
          label="CPF"
          required
          :error-messages="erros.cpf"
          aria-required="true"
          hide-details="auto"
          @input="onInputCpf"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          :model-value="placaCarro"
          label="Placa do carro"
          required
          :error-messages="erros.placaCarro"
          aria-required="true"
          hide-details="auto"
          maxlength="7"
          @input="onInputPlaca"
        />
      </v-col>
    </v-row>
    <p class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3 mt-4">
      <v-icon size="small" start>mdi-map-marker</v-icon>
      Endereço (opcional)
    </p>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          :model-value="cep"
          label="CEP"
          hide-details="auto"
          @input="onInputCep"
          @blur="onCepBlur"
        />
        <v-progress-linear v-if="loadingCep" indeterminate color="primary" class="mt-1" />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="logradouro"
          label="Logradouro"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="bairro"
          label="Bairro"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="cidade"
          label="Cidade"
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="uf"
          label="UF"
          hide-details="auto"
          maxlength="2"
        />
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-card-actions class="px-0">
      <v-btn type="submit" color="primary" prepend-icon="mdi-content-save">Salvar</v-btn>
      <v-btn variant="text" @click="emit('cancelar')">Cancelar</v-btn>
    </v-card-actions>
  </v-form>
</template>

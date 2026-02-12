<script setup lang="ts">
import { ref, watch } from 'vue'
import { validarCpf, validarTelefone, validarPlaca } from '@/composables/useValidacoes'
import { useViaCep } from '@/composables/useViaCep'
import { LIMITES_FORMULARIO } from '@/constants/formulario'
import CampoCPF from '@/components/form/CampoCPF.vue'
import CampoTelefone from '@/components/form/CampoTelefone.vue'
import CampoCEP from '@/components/form/CampoCEP.vue'
import CampoPlaca from '@/components/form/CampoPlaca.vue'
import type { Cliente, ClienteCreate } from '@/types/cliente'

const props = defineProps<{
  cliente: Cliente | null
  saving?: boolean
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
  const cepDigits = cep.value.replace(/\D/g, '')
  if (cepDigits.length > 0 && cepDigits.length !== 8) e.cep = 'CEP deve ter 8 dígitos'
  erros.value = e
  if (Object.keys(e).length) {
    alertMessage.value = 'Corrija os erros do formulário.'
    return false
  }
  alertMessage.value = ''
  return true
}

function clearErro(campo: keyof typeof erros.value) {
  if (erros.value[campo]) {
    const next = { ...erros.value }
    delete next[campo]
    erros.value = next
    if (Object.keys(next).length === 0) alertMessage.value = ''
  }
}

function submit() {
  if (props.saving || !validar()) return
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
          :maxlength="LIMITES_FORMULARIO.nome"
          counter
          aria-required="true"
          hide-details="auto"
          @input="clearErro('nome')"
        />
      </v-col>
      <v-col cols="12" md="6">
        <CampoTelefone
          v-model="telefone"
          :error-messages="erros.telefone"
          required
          @clear-error="clearErro('telefone')"
        />
      </v-col>
      <v-col cols="12" md="6">
        <CampoCPF
          v-model="cpf"
          :error-messages="erros.cpf"
          required
          @clear-error="clearErro('cpf')"
        />
      </v-col>
      <v-col cols="12" md="6">
        <CampoPlaca
          v-model="placaCarro"
          :error-messages="erros.placaCarro"
          required
          @clear-error="clearErro('placaCarro')"
        />
      </v-col>
    </v-row>
    <p class="text-subtitle-1 font-weight-medium text-medium-emphasis mb-3 mt-4">
      <v-icon size="small" start>mdi-map-marker</v-icon>
      Endereço (opcional)
    </p>
    <v-row>
      <v-col cols="12" md="4">
        <CampoCEP
          v-model="cep"
          :error-messages="erros.cep"
          :loading="loadingCep"
          @clear-error="clearErro('cep')"
          @blur="onCepBlur"
        />
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          v-model="logradouro"
          label="Logradouro"
          :maxlength="LIMITES_FORMULARIO.logradouro"
          counter
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="bairro"
          label="Bairro"
          :maxlength="LIMITES_FORMULARIO.bairro"
          counter
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="cidade"
          label="Cidade"
          :maxlength="LIMITES_FORMULARIO.cidade"
          counter
          hide-details="auto"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          v-model="uf"
          label="UF"
          :maxlength="LIMITES_FORMULARIO.uf"
          counter
          hide-details="auto"
        />
      </v-col>
    </v-row>
    <v-divider class="my-4" />
    <v-card-actions class="px-0">
      <v-btn
        type="submit"
        color="primary"
        prepend-icon="mdi-content-save"
        :loading="saving"
        :disabled="saving"
      >
        Salvar
      </v-btn>
      <v-btn variant="text" :disabled="saving" @click="emit('cancelar')">Cancelar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { mascaraCep } from '@/composables/useMascaras'
import { LIMITES_FORMULARIO } from '@/constants/formulario'

defineProps<{
  modelValue: string
  errorMessages?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clearError: []
  blur: []
}>()

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  const masked = mascaraCep(value).slice(0, LIMITES_FORMULARIO.cep)
  emit('update:modelValue', masked)
  emit('clearError')
}

function onBlur() {
  emit('blur')
}
</script>

<template>
  <div>
    <v-text-field
      :model-value="modelValue"
      label="CEP"
      :error-messages="errorMessages"
      :maxlength="LIMITES_FORMULARIO.cep"
      counter
      hide-details="auto"
      @input="onInput"
      @blur="onBlur"
    />
    <v-progress-linear v-if="loading" indeterminate color="primary" class="mt-1" />
  </div>
</template>

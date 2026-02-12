<script setup lang="ts">
import { mascaraCpf } from '@/composables/useMascaras'
import { LIMITES_FORMULARIO } from '@/constants/formulario'

withDefaults(
  defineProps<{
    modelValue: string
    errorMessages?: string
    required?: boolean
  }>(),
  { required: false }
)

const emit = defineEmits<{ 'update:modelValue': [value: string]; clearError: [] }>()

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  const masked = mascaraCpf(value).slice(0, LIMITES_FORMULARIO.cpf)
  emit('update:modelValue', masked)
  emit('clearError')
}
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    label="CPF"
    :required="required"
    :error-messages="errorMessages"
    :maxlength="LIMITES_FORMULARIO.cpf"
    counter
    aria-required="true"
    hide-details="auto"
    @input="onInput"
  />
</template>

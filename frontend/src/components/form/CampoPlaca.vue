<script setup lang="ts">
import { mascaraPlaca } from '@/composables/useMascaras'
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
  const masked = mascaraPlaca(value).slice(0, LIMITES_FORMULARIO.placaCarro)
  emit('update:modelValue', masked)
  emit('clearError')
}
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    label="Placa do carro"
    :required="required"
    :error-messages="errorMessages"
    :maxlength="LIMITES_FORMULARIO.placaCarro"
    counter
    aria-required="true"
    hide-details="auto"
    @input="onInput"
  />
</template>

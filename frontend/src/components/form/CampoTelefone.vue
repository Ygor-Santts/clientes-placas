<script setup lang="ts">
import { mascaraTelefone } from '@/composables/useMascaras'
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
  const masked = mascaraTelefone(value).slice(0, LIMITES_FORMULARIO.telefone)
  emit('update:modelValue', masked)
  emit('clearError')
}
</script>

<template>
  <v-text-field
    :model-value="modelValue"
    label="Telefone"
    :required="required"
    :error-messages="errorMessages"
    :maxlength="LIMITES_FORMULARIO.telefone"
    counter
    aria-required="true"
    hide-details="auto"
    @input="onInput"
  />
</template>

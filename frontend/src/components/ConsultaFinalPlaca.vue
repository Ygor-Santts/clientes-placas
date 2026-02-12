<script setup lang="ts">
import EmptyState from '@/components/EmptyState.vue'
import { useConsultaFinalPlaca } from '@/composables/useConsultaFinalPlaca'
import type { Cliente } from '@/types/cliente'

const { digito, resultado } = useConsultaFinalPlaca()

function enderecoResumo(c: Cliente) {
  const parts = [c.logradouro, c.bairro, c.cidade].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}

function selecionarDigito(n: number) {
  digito.value = n
}
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center pa-4 pb-2">
      <v-icon start color="primary">mdi-numeric</v-icon>
      Consulta por final da placa
    </v-card-title>
    <v-card-text class="pt-2">
      <p class="text-body2 text-medium-emphasis mb-3">
        Selecione o último dígito da placa do veículo. A lista é atualizada automaticamente.
      </p>
      <div class="d-flex flex-wrap mb-4">
        <v-btn
          v-for="n in 10"
          :key="n - 1"
          class="mr-2 mb-2"
          :color="digito === n - 1 ? 'primary' : undefined"
          :variant="digito === n - 1 ? 'flat' : 'outlined'"
          size="small"
          rounded="lg"
          @click="selecionarDigito(n - 1)"
        >
          {{ n - 1 }}
        </v-btn>
      </div>
      <v-text-field
        v-model.number="digito"
        type="number"
        label="Ou digite o número (0-9)"
        min="0"
        max="9"
        step="1"
        class="mb-2"
        style="max-width: 160px;"
        density="compact"
        variant="outlined"
        rounded="lg"
        hide-details
      />
    </v-card-text>
    <v-divider />
    <v-table class="table-row">
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Telefone</th>
          <th class="text-left">CPF</th>
          <th class="text-left">Placa</th>
          <th class="text-left">Endereço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="digito === '' || typeof digito !== 'number' || Number.isNaN(digito) || digito < 0 || digito > 9">
          <td colspan="5">
            <EmptyState
              icon="mdi-numeric-off"
              title="Selecione ou digite um número de 0 a 9."
            />
          </td>
        </tr>
        <tr v-else-if="resultado.length === 0">
          <td colspan="5">
            <EmptyState
              icon="mdi-magnify-close"
              :title="`Nenhum cliente com placa terminando em ${digito}.`"
            />
          </td>
        </tr>
        <tr v-for="c in resultado" :key="c.id" class="table-row">
          <td><span class="font-weight-medium">{{ c.nome }}</span></td>
          <td>{{ c.telefone }}</td>
          <td>{{ c.cpf }}</td>
          <td>
            <v-chip size="small" color="primary" variant="tonal">{{ c.placaCarro }}</v-chip>
          </td>
          <td class="text-medium-emphasis">{{ enderecoResumo(c) }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

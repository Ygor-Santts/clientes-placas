<script setup lang="ts">
import { useConsultaFinalPlaca } from '@/composables/useConsultaFinalPlaca'
import type { Cliente } from '@/types/cliente'

const { digito, resultado } = useConsultaFinalPlaca()

function enderecoResumo(c: Cliente) {
  const parts = [c.logradouro, c.bairro, c.cidade].filter(Boolean)
  return parts.length ? parts.join(', ') : '—'
}
</script>

<template>
  <v-card>
    <v-card-text>
      <v-text-field
        v-model.number="digito"
        type="number"
        label="Último dígito da placa (0-9)"
        min="0"
        max="9"
        step="1"
        hide-details="auto"
        aria-label="Digite o último dígito da placa para consultar"
        class="mb-4"
        style="max-width: 200px;"
      />
      <p class="text-caption text-medium-emphasis mb-4">
        Digite um número de 0 a 9. A lista é atualizada automaticamente (com pequeno atraso).
      </p>
    </v-card-text>
    <v-table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>CPF</th>
          <th>Placa</th>
          <th>Endereço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="digito === '' || typeof digito !== 'number' || Number.isNaN(digito) || digito < 0 || digito > 9">
          <td colspan="5" class="text-center text-medium-emphasis pa-4">
            Informe o último dígito da placa (0 a 9).
          </td>
        </tr>
        <tr v-else-if="resultado.length === 0">
          <td colspan="5" class="text-center text-medium-emphasis pa-4">
            Nenhum cliente com placa terminando em {{ digito }}.
          </td>
        </tr>
        <tr v-for="c in resultado" :key="c.id">
          <td>{{ c.nome }}</td>
          <td>{{ c.telefone }}</td>
          <td>{{ c.cpf }}</td>
          <td>{{ c.placaCarro }}</td>
          <td>{{ enderecoResumo(c) }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

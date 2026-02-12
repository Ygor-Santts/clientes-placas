import { ref } from 'vue'
import { buscarEnderecoPorCep, type ViaCepResponse } from '@/api/viaCep'

export function useViaCep() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function buscar(cep: string): Promise<ViaCepResponse | null> {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) {
      error.value = 'CEP deve ter 8 dígitos'
      return null
    }
    loading.value = true
    error.value = null
    try {
      const data = await buscarEnderecoPorCep(cep)
      if (!data) error.value = 'CEP não encontrado'
      return data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao buscar CEP'
      return null
    } finally {
      loading.value = false
    }
  }

  return { loading, error, buscar }
}

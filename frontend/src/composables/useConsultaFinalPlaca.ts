import { ref, watch } from 'vue'
import { useDebounce } from './useDebounce'
import { useClienteStore } from '@/stores/clienteStore'

export function useConsultaFinalPlaca() {
  const store = useClienteStore()
  const digito = ref<number | string>('')
  const resultado = ref<Awaited<ReturnType<typeof store.buscarPorFinalPlaca>>>([])
  const digitoDebounced = useDebounce(digito, 400)

  watch(
    digitoDebounced,
    async (v) => {
      const num = typeof v === 'number' && !Number.isNaN(v) ? v : null
      if (num === null || num < 0 || num > 9) {
        resultado.value = []
        return
      }
      try {
        resultado.value = await store.buscarPorFinalPlaca(num)
      } catch {
        resultado.value = []
      }
    },
    { immediate: true }
  )

  return { digito, resultado }
}

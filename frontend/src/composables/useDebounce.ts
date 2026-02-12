import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delayMs: number): Ref<T> {
  const debounced = ref(source.value) as Ref<T>
  let timeout: ReturnType<typeof setTimeout> | null = null

  watch(
    source,
    (v) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        debounced.value = v
        timeout = null
      }, delayMs)
    },
    { immediate: true }
  )

  return debounced
}

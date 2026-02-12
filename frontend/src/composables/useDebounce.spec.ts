import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('espelha o valor após o delay', async () => {
    const source = ref(0)
    const debounced = useDebounce(source, 400)
    expect(debounced.value).toBe(0)
    source.value = 1
    expect(debounced.value).toBe(0)
    await vi.advanceTimersByTimeAsync(400)
    await nextTick()
    expect(debounced.value).toBe(1)
  })

  it('só emite o último valor se vários mudanças no intervalo', async () => {
    const source = ref('a')
    const debounced = useDebounce(source, 400)
    source.value = 'b'
    source.value = 'c'
    await vi.advanceTimersByTimeAsync(400)
    await nextTick()
    expect(debounced.value).toBe('c')
  })
})

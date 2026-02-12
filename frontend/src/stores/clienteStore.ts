import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cliente, ClienteCreate } from '@/types/cliente'
import * as clienteService from '@/api/clienteService'

export const useClienteStore = defineStore('cliente', () => {
  const clientes = ref<Cliente[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const snackbarMessage = ref<string | null>(null)
  let snackbarTimeout: ReturnType<typeof setTimeout> | null = null

  function showSnackbar(message: string) {
    if (snackbarTimeout) clearTimeout(snackbarTimeout)
    snackbarMessage.value = message
    snackbarTimeout = setTimeout(() => {
      snackbarMessage.value = null
      snackbarTimeout = null
    }, 3500)
  }

  const listar = computed(() => clientes.value)

  async function carregarTodos() {
    loading.value = true
    error.value = null
    try {
      clientes.value = await clienteService.listarClientes()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao carregar clientes'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function buscarPorId(id: number) {
    loading.value = true
    error.value = null
    try {
      return await clienteService.buscarClientePorId(id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao buscar cliente'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function criar(data: ClienteCreate) {
    loading.value = true
    error.value = null
    try {
      const novo = await clienteService.criarCliente(data)
      clientes.value = [...clientes.value, novo]
      showSnackbar('Cliente cadastrado com sucesso!')
      return novo
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao criar cliente'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function atualizar(id: number, data: Partial<ClienteCreate>) {
    loading.value = true
    error.value = null
    try {
      const atualizado = await clienteService.atualizarCliente(id, data)
      const idx = clientes.value.findIndex((c) => c.id === id)
      if (idx >= 0) {
        const next = [...clientes.value]
        next[idx] = atualizado
        clientes.value = next
      }
      showSnackbar('Cliente atualizado com sucesso!')
      return atualizado
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao atualizar cliente'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function remover(id: number) {
    loading.value = true
    error.value = null
    try {
      await clienteService.removerCliente(id)
      clientes.value = clientes.value.filter((c) => c.id !== id)
      showSnackbar('Cliente removido.')
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro ao remover cliente'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function buscarPorFinalPlaca(finalNumero: number) {
    loading.value = true
    error.value = null
    try {
      return await clienteService.buscarPorFinalPlaca(finalNumero)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erro na consulta'
      throw e
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    clientes,
    listar,
    loading,
    error,
    snackbarMessage,
    showSnackbar,
    carregarTodos,
    buscarPorId,
    criar,
    atualizar,
    remover,
    buscarPorFinalPlaca,
    clearError,
  }
})

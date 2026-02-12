import { describe, it, expect } from 'vitest'
import { validarCpf, validarTelefone, validarPlaca } from './useValidacoes'

describe('useValidacoes', () => {
  describe('validarCpf', () => {
    it('aceita CPF válido', () => {
      expect(validarCpf('529.982.247-25')).toBe(true)
      expect(validarCpf('52998224725')).toBe(true)
    })
    it('rejeita CPF com tamanho errado', () => {
      expect(validarCpf('123')).toBe(false)
      expect(validarCpf('123456789012')).toBe(false)
    })
    it('rejeita CPF com todos dígitos iguais', () => {
      expect(validarCpf('111.111.111-11')).toBe(false)
    })
    it('rejeita CPF com dígitos verificadores inválidos', () => {
      expect(validarCpf('111.444.777-36')).toBe(false)
    })
  })

  describe('validarTelefone', () => {
    it('aceita 10 dígitos', () => {
      expect(validarTelefone('1133334444')).toBe(true)
      expect(validarTelefone('(11) 3333-4444')).toBe(true)
    })
    it('aceita 11 dígitos', () => {
      expect(validarTelefone('11988887777')).toBe(true)
      expect(validarTelefone('(11) 98888-7777')).toBe(true)
    })
    it('rejeita outros tamanhos', () => {
      expect(validarTelefone('123')).toBe(false)
      expect(validarTelefone('123456789012')).toBe(false)
    })
  })

  describe('validarPlaca', () => {
    it('aceita placa Mercosul', () => {
      expect(validarPlaca('ABC1D23')).toBe(true)
      expect(validarPlaca('abc1d23')).toBe(true)
    })
    it('aceita placa antiga', () => {
      expect(validarPlaca('ABC1234')).toBe(true)
    })
    it('rejeita tamanho errado', () => {
      expect(validarPlaca('ABC')).toBe(false)
      expect(validarPlaca('ABC12345')).toBe(false)
    })
    it('rejeita formato inválido', () => {
      expect(validarPlaca('1BC1D23')).toBe(false)
      expect(validarPlaca('AB11234')).toBe(false)
    })
  })
})

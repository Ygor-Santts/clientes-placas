import { describe, it, expect } from 'vitest'
import { mascaraCpf, mascaraTelefone, mascaraCep, mascaraPlaca } from './useMascaras'

describe('useMascaras', () => {
  describe('mascaraCpf', () => {
    it('formata para 000.000.000-00', () => {
      expect(mascaraCpf('52998224725')).toBe('529.982.247-25')
      expect(mascaraCpf('529')).toBe('529')
      expect(mascaraCpf('529982247')).toBe('529.982.247')
    })
    it('limita a 11 dígitos', () => {
      expect(mascaraCpf('52998224725111')).toBe('529.982.247-25')
    })
  })

  describe('mascaraTelefone', () => {
    it('formata 10 dígitos', () => {
      expect(mascaraTelefone('1133334444')).toBe('(11) 3333-4444')
    })
    it('formata 11 dígitos', () => {
      expect(mascaraTelefone('11988887777')).toBe('(11) 98888-7777')
    })
  })

  describe('mascaraCep', () => {
    it('formata para 00000-000', () => {
      expect(mascaraCep('01310100')).toBe('01310-100')
    })
    it('limita a 8 dígitos', () => {
      expect(mascaraCep('01310100111')).toBe('01310-100')
    })
  })

  describe('mascaraPlaca', () => {
    it('converte para maiúsculas e limita a 7', () => {
      expect(mascaraPlaca('abc1d23')).toBe('ABC1D23')
      expect(mascaraPlaca('ABC1D2345')).toBe('ABC1D23')
    })
    it('remove caracteres não alfanuméricos', () => {
      expect(mascaraPlaca('ABC-1D23')).toBe('ABC1D23')
    })
  })
})

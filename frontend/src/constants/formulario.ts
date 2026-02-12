/**
 * Limites máximos de caracteres para os campos do formulário de cliente.
 * Valores consideram máscara quando aplicável (ex.: CPF 14 com pontos e traço).
 */
export const LIMITES_FORMULARIO = {
  nome: 120,
  telefone: 15, // (XX) XXXXX-XXXX
  cpf: 14,      // 000.000.000-00
  placaCarro: 7,
  cep: 9,       // 00000-000
  logradouro: 200,
  bairro: 100,
  cidade: 100,
  uf: 2,
} as const

export type LimiteCampo = keyof typeof LIMITES_FORMULARIO

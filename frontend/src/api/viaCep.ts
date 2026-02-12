export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

const VIA_CEP_URL = 'https://viacep.com.br/ws'

export async function buscarEnderecoPorCep(cep: string): Promise<ViaCepResponse | null> {
  const digits = cep.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const res = await fetch(`${VIA_CEP_URL}/${digits}/json/`)
  if (!res.ok) return null
  const data = (await res.json()) as ViaCepResponse
  if (data.erro) return null
  return data
}

export interface Cliente {
  id: number
  nome: string
  telefone: string
  cpf: string
  placaCarro: string
  cep?: string
  logradouro?: string
  bairro?: string
  cidade?: string
  uf?: string
}

export interface ClienteCreate {
  nome: string
  telefone: string
  cpf: string
  placaCarro: string
  cep?: string
  logradouro?: string
  bairro?: string
  cidade?: string
  uf?: string
}

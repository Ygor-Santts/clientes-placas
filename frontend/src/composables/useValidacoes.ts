export function validarCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i], 10) * (10 - i)
  let d1 = (sum * 10) % 11
  if (d1 === 10) d1 = 0
  if (d1 !== parseInt(digits[9], 10)) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i], 10) * (11 - i)
  let d2 = (sum * 10) % 11
  if (d2 === 10) d2 = 0
  if (d2 !== parseInt(digits[10], 10)) return false

  return true
}

export function validarTelefone(telefone: string): boolean {
  const digits = telefone.replace(/\D/g, '')
  return digits.length === 10 || digits.length === 11
}

export function validarPlaca(placa: string): boolean {
  const v = placa.replace(/\s/g, '').toUpperCase()
  if (v.length !== 7) return false
  const mercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/
  const antigo = /^[A-Z]{3}\d{4}$/
  return mercosul.test(v) || antigo.test(v)
}

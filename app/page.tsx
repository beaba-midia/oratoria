import { redirect } from 'next/navigation'

export default function Page() {
  // Rota padrão do teste A/B. Acesse /vendas ou /lideranca diretamente.
  redirect('/vendas')
}

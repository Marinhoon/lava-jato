import Layout from "../components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AgendamentoModal } from "../components/AgendamentoModal"

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lavagem Básica</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Lavagem externa e secagem</p>
            <p className="font-bold mt-2">R$30</p>
            <AgendamentoModal servico="Lavagem Básica" preco="R$30" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lavagem Deluxe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Lavagem externa, secagem e limpeza interna</p>
            <p className="font-bold mt-2">R$50</p>
            <AgendamentoModal servico="Lavagem Deluxe" preco="R$50" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detalhamento Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Detalhamento completo externo e interno</p>
            <p className="font-bold mt-2">R$100</p>
            <AgendamentoModal servico="Detalhamento Premium" preco="R$100" />
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}


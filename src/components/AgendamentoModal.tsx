"use client"

import { useState, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppContext } from "@/contexts/AppContext"
import { toast } from "sonner"

interface AgendamentoModalProps {
  servico: string
  preco: string
}

export function AgendamentoModal({ servico, preco }: AgendamentoModalProps) {
  const { agendamentos, setAgendamentos, clientes, setClientes } = useAppContext()
  const [novoAgendamento, setNovoAgendamento] = useState({
    cliente: "",
    email: "",
    telefone: "",
    data: "",
    hora: "",
  })
  const [erros, setErros] = useState({
    cliente: false,
    email: false,
    telefone: false,
    data: false,
    hora: false,
  })
  const [modalAberto, setModalAberto] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNovoAgendamento((prev) => ({ ...prev, [id]: value }))

    // Remove o erro quando o usuário começa a digitar
    setErros((prev) => ({ ...prev, [id]: !value.trim() }))
  }

  const validarCampos = () => {
    const novosErros = {
      cliente: !novoAgendamento.cliente.trim(),
      email: !novoAgendamento.email.trim(),
      telefone: !novoAgendamento.telefone.trim(),
      data: !novoAgendamento.data.trim(),
      hora: !novoAgendamento.hora.trim(),
    }
    setErros(novosErros)

    // Retorna true se não houver erros
    return !Object.values(novosErros).includes(true)
  }

  const adicionarAgendamento = () => {
    if (!validarCampos()) {
      toast.error("Por favor, preencha todos os campos antes de confirmar.")
      return
    }

    const novoId = agendamentos.length + 1
    const novoAgendamentoCompleto = {
      id: novoId,
      ...novoAgendamento,
      servico,
      preco,
    }

    setAgendamentos([...agendamentos, novoAgendamentoCompleto])

    // Verifica se o cliente já existe antes de adicionar
    const clienteExistente = clientes.find((c) => c.email === novoAgendamento.email)
    if (!clienteExistente) {
      setClientes([
        ...clientes,
        {
          id: clientes.length + 1,
          nome: novoAgendamento.cliente,
          email: novoAgendamento.email,
          telefone: novoAgendamento.telefone,
        },
      ])
    }

    toast.success("Agendamento realizado com sucesso!")
    setNovoAgendamento({ cliente: "", email: "", telefone: "", data: "", hora: "" }) // Limpar formulário
    setModalAberto(false) // Fechar modal
  }

  return (
    <Dialog open={modalAberto} onOpenChange={setModalAberto}>
      <DialogTrigger asChild>
        <Button onClick={() => setModalAberto(true)}>Agendar Agora</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Agendamento - {servico}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[
            { id: "cliente", label: "Nome" },
            { id: "email", label: "Email", type: "email" },
            { id: "telefone", label: "Telefone" },
            { id: "data", label: "Data", type: "date" },
            { id: "hora", label: "Hora", type: "time" },
          ].map(({ id, label, type = "text" }) => (
            <div key={id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={id} className="text-right">{label}</Label>
              <div className="col-span-3">
                <Input
                  id={id}
                  type={type}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value={(novoAgendamento as any)[id]}
                  onChange={handleInputChange}
                  className={`w-full ${erros[id as keyof typeof erros] ? "border-red-500" : ""}`}
                />
                {erros[id as keyof typeof erros] && (
                  <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button onClick={adicionarAgendamento} disabled={Object.values(erros).includes(true)}>
          Confirmar Agendamento
        </Button>
      </DialogContent>
    </Dialog>
  )
}

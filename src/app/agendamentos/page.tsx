"use client"

import { useState, type ChangeEvent } from "react"
import Layout from "../../components/layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([
    { id: 1, cliente: "João Silva", servico: "Lavagem Básica", data: "2023-06-01", hora: "10:00" },
    { id: 2, cliente: "Maria Santos", servico: "Lavagem Deluxe", data: "2023-06-01", hora: "11:30" },
    { id: 3, cliente: "Carlos Oliveira", servico: "Detalhamento Premium", data: "2023-06-02", hora: "14:00" },
  ])

  const [novoAgendamento, setNovoAgendamento] = useState({ cliente: "", servico: "", data: "", hora: "" })

  const adicionarAgendamento = () => {
    setAgendamentos([...agendamentos, { id: agendamentos.length + 1, ...novoAgendamento }])
    setNovoAgendamento({ cliente: "", servico: "", data: "", hora: "" })
  }

  const excluirAgendamento = (id: number) => {
    setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNovoAgendamento((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <Layout>
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Agendamento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cliente" className="text-right">
                  Cliente
                </Label>
                <Input
                  id="cliente"
                  value={novoAgendamento.cliente}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="servico" className="text-right">
                  Serviço
                </Label>
                <Input
                  id="servico"
                  value={novoAgendamento.servico}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="data" className="text-right">
                  Data
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={novoAgendamento.data}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hora" className="text-right">
                  Hora
                </Label>
                <Input
                  id="hora"
                  type="time"
                  value={novoAgendamento.hora}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={adicionarAgendamento}>Adicionar Agendamento</Button>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendamentos.map((agendamento) => (
              <TableRow key={agendamento.id}>
                <TableCell>{agendamento.cliente}</TableCell>
                <TableCell>{agendamento.servico}</TableCell>
                <TableCell>{agendamento.data}</TableCell>
                <TableCell>{agendamento.hora}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Agendamento</DialogTitle>
                      </DialogHeader>
                      {/* Adicione campos de edição aqui */}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={() => excluirAgendamento(agendamento.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  )
}


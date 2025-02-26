"use client"

import { useState, type ChangeEvent } from "react"
import Layout from "../../components/layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Clientes() {
  const [clientes, setClientes] = useState([
    { id: 1, nome: "João Silva", email: "joao@exemplo.com", telefone: "123-456-7890" },
    { id: 2, nome: "Maria Santos", email: "maria@exemplo.com", telefone: "234-567-8901" },
    { id: 3, nome: "Carlos Oliveira", email: "carlos@exemplo.com", telefone: "345-678-9012" },
  ])

  const [novoCliente, setNovoCliente] = useState({ nome: "", email: "", telefone: "" })

  const adicionarCliente = () => {
    setClientes([...clientes, { id: clientes.length + 1, ...novoCliente }])
    setNovoCliente({ nome: "", email: "", telefone: "" })
  }

  const excluirCliente = (id: number) => {
    setClientes(clientes.filter((cliente) => cliente.id !== id))
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNovoCliente((prev) => ({ ...prev, [id]: value }))
  }

  return (
    <Layout>
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Adicionar Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome
                </Label>
                <Input id="nome" value={novoCliente.nome} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={novoCliente.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefone" className="text-right">
                  Telefone
                </Label>
                <Input id="telefone" value={novoCliente.telefone} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <Button onClick={adicionarCliente}>Adicionar Cliente</Button>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.telefone}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2">
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Cliente</DialogTitle>
                      </DialogHeader>
                      {/* Adicione campos de edição aqui */}
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={() => excluirCliente(cliente.id)}>
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


"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

interface Agendamento {
  id: number
  cliente: string
  email: string
  telefone: string
  servico: string
  data: string
  hora: string
  preco: string
}

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
}

interface AppContextType {
  agendamentos: Agendamento[]
  setAgendamentos: React.Dispatch<React.SetStateAction<Agendamento[]>>
  clientes: Cliente[]
  setClientes: React.Dispatch<React.SetStateAction<Cliente[]>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])

  return (
    <AppContext.Provider value={{ agendamentos, setAgendamentos, clientes, setClientes }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider")
  }
  return context
}


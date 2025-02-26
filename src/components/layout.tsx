import type React from "react"
import Link from "next/link"
import { Car, Calendar, Users } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Car className="mr-2 h-5 w-5" />
            Início
          </Link>
          <Link href="/agendamentos" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Calendar className="mr-2 h-5 w-5" />
            Agendamentos
          </Link>
          <Link href="/clientes" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200">
            <Users className="mr-2 h-5 w-5" />
            Clientes
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-5">Sistema de Gerenciamento de Lava-Jato</h1>
        {children}
      </main>
    </div>
  )
}


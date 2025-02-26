// src/components/Login.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usando react-router para navegação

export function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Para navegação após o login

  const handleLogin = () => {
    if (usuario === "admin" && senha === "admin123") {
      // Caso de login bem-sucedido
      navigate("/dashboard"); // Direciona para o dashboard ou outra página
    } else {
      // Caso de erro no login
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuário</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Digite seu usuário"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md"
            placeholder="Digite sua senha"
          />
        </div>
        {erro && <p className="text-red-500 text-sm text-center mb-4">{erro}</p>}
        <button
          onClick={handleLogin}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

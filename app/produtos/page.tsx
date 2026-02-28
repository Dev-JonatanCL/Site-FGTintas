"use client"

import { useState } from "react"
import Link from "next/link"
import { useOrcamento } from "@/context/OrcamentoContext"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type Produto = {
  id: number
  nome: string
  codigo: string
  imagem: string
  categoria: string
}

const produtosMock: Produto[] = [
  {
    id: 1,
    nome: "Trincha Média 1/2",
    codigo: "300/1",
    imagem: "/trincha1.png",
    categoria: "Trinchas"
  },
  {
    id: 2,
    nome: "Trincha Profissional 3/4",
    codigo: "AT303/1",
    imagem: "/trincha2.png",
    categoria: "Trinchas"
  },
  {
    id: 3,
    nome: "Rolo Anti-Gota 23cm",
    codigo: "RL23",
    imagem: "/rolo.png",
    categoria: "Rolos"
  }
]

export default function ProdutosPage() {
  const { adicionar, itens } = useOrcamento()

  const [busca, setBusca] = useState("")
  const [categoria, setCategoria] = useState("Todos")
  const [quantidade, setQuantidade] = useState(1)

  const produtosFiltrados = produtosMock.filter((produto) => {
    const matchBusca = produto.nome
      .toLowerCase()
      .includes(busca.toLowerCase())

    const matchCategoria =
      categoria === "Todos" || produto.categoria === categoria

    return matchBusca && matchCategoria
  })

  return (
    <div>
      <SiteHeader/>
      <div className="flex min-h-screen bg-gray-100">
        {/* SIDEBAR */}
        <aside className="w-64 bg-gray-900 text-white p-6">
          <h2 className="text-lg font-bold mb-4">
            Produtos
          </h2>

          <ul className="space-y-3">
            <li>
              <button onClick={() => setCategoria("Todos")}>
                Todos
              </button>
            </li>
            <li>
              <button onClick={() => setCategoria("Trinchas")}>
                Trinchas
              </button>
            </li>
            <li>
              <button onClick={() => setCategoria("Rolos")}>
                Rolos
              </button>
            </li>
          </ul>
        </aside>

        {/* CONTEÚDO */}
        <main className="flex-1 p-8">

          {/* TOPO */}
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="border rounded px-4 py-2 w-80"
            />

            <Link href="/finalizar">
              <button className="bg-blue-600 text-white px-6 py-2 rounded">
                Itens Selecionados ({itens.length})
              </button>
            </Link>
          </div>

          {/* GRID DE PRODUTOS */}
          <div className="grid md:grid-cols-3 gap-6">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="h-40 mx-auto object-contain"
                />

                <h3 className="mt-4 font-semibold">
                  {produto.nome}
                </h3>

                <p className="text-sm text-gray-500">
                  Ref: {produto.codigo}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="number"
                    min={1}
                    value={quantidade}
                    onChange={(e) =>
                      setQuantidade(Number(e.target.value))
                    }
                    className="w-20 border rounded px-2 py-1"
                  />

                  <button
                    onClick={() =>
                      adicionar({
                        nome: produto.nome,
                        tamanho: "Unidade",
                        quantidade
                      })
                    }
                    className="flex-1 bg-gray-800 text-white py-2 rounded hover:bg-gray-700"
                  >
                    ADICIONAR
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
      <SiteFooter/>
    </div>
  )
}
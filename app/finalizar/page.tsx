"use client"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { useOrcamento } from "@/context/OrcamentoContext"
import { useState } from "react"

export default function Finalizar() {
  const { itens, remover } = useOrcamento()
  const [observacoes, setObservacoes] = useState("")
  const [email, setEmail] = useState("")

  function enviarWhatsapp() {
    const texto = encodeURIComponent(
      itens.map(i =>
        `${i.nome} - ${i.tamanho} - Qtd: ${i.quantidade}`
      ).join("\n") +
      `\n\nObservações: ${observacoes}`
    )

    window.open(`https://wa.me/5511999999999?text=${texto}`)
  }

  async function enviarEmail() {
    await fetch("/api/orcamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens, observacoes, email })
    })

    alert("Orçamento enviado com sucesso!")
  }

  return (
    <div>
      <SiteHeader/>
      <div className="container mx-auto py-10">

        <h1 className="text-3xl font-bold mb-6">
          Finalização do Orçamento
        </h1>

        {/* TABELA */}
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-2">Produto</th>
                <th>Tamanho</th>
                <th>Qtd</th>
                <th>Excluir</th>
              </tr>
            </thead>

            <tbody>
              {itens.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.nome}</td>
                  <td>{item.tamanho}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    <button
                      onClick={() => remover(index)}
                      className="text-red-600"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OBSERVAÇÕES */}
        <div className="mt-6">
          <label className="block font-medium mb-2">
            Observações
          </label>

          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="w-full border rounded p-3"
            rows={4}
          />
        </div>

        {/* WHATSAPP */}
        <button
          onClick={enviarWhatsapp}
          className="bg-green-600 text-white px-6 py-2 rounded mt-6"
        >
          Enviar por WhatsApp
        </button>

        {/* EMAIL */}
        <div className="mt-6">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={enviarEmail}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
          >
            Enviar por Email
          </button>
        </div>
      </div>
      <SiteFooter/>
    </div>
  )
}
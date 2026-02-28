"use client"
import { createContext, useContext, useState } from "react"

type Item = {
  nome: string
  tamanho: string
  quantidade: number
}

type OrcamentoContextType = {
  itens: Item[]
  adicionar: (item: Item) => void
  remover: (index: number) => void
}

const OrcamentoContext = createContext({} as OrcamentoContextType)

export function OrcamentoProvider({ children }: any) {
  const [itens, setItens] = useState<Item[]>([])

  function adicionar(item: Item) {
    setItens(prev => [...prev, item])
  }

  function remover(index: number) {
    setItens(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <OrcamentoContext.Provider value={{ itens, adicionar, remover }}>
      {children}
    </OrcamentoContext.Provider>
  )
}

export const useOrcamento = () => useContext(OrcamentoContext)
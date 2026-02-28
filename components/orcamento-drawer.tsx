"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function OrcamentoDrawer({
  orcamento,
  setOrcamento,
}: any) {
  const [email, setEmail] = useState("");

  const remover = (index: number) => {
    setOrcamento(orcamento.filter((_: any, i: number) => i !== index));
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Orçamento FG Tintas", 10, 10);

    orcamento.forEach((item: any, index: number) => {
      doc.text(
        `${item.nome} - ${item.tamanho}`,
        10,
        20 + index * 10
      );
    });

    doc.save("orcamento.pdf");
  };

  const enviarEmail = async () => {
    if (!email) return alert("Digite seu email");

    await fetch("/api/enviar-orcamento", {
      method: "POST",
      body: JSON.stringify({ orcamento, email }),
    });

    alert("Email enviado!");
  };

  const enviarWhatsapp = () => {
    const texto = orcamento
      .map((p: any) => `${p.nome} - ${p.tamanho}`)
      .join("%0A");

    window.open(
      `https://wa.me/5599999999999?text=Olá,%20gostaria%20de%20um%20orçamento:%0A${texto}`
    );
  };

  if (orcamento.length === 0) return null;

  return (
    <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-2xl p-6 overflow-auto">
      <h2 className="text-xl font-bold mb-4">
        Seu Orçamento
      </h2>

      {orcamento.map((item: any, index: number) => (
        <div
          key={index}
          className="flex justify-between mb-2"
        >
          <span>
            {item.nome} - {item.tamanho}
          </span>
          <button onClick={() => remover(index)}>
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={gerarPDF}
        className="w-full bg-gray-800 text-white p-2 rounded mt-4"
      >
        Gerar PDF
      </button>

      <button
        onClick={enviarWhatsapp}
        className="w-full bg-green-600 text-white p-2 rounded mt-2"
      >
        WhatsApp
      </button>

      <input
        type="email"
        placeholder="Seu email"
        className="border p-2 w-full mt-2 rounded"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={enviarEmail}
        className="w-full bg-blue-600 text-white p-2 rounded mt-2"
      >
        Enviar por Email
      </button>
    </div>
  );
}
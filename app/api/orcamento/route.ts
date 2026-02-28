import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  try {
    const { itens, observacoes, email } = await req.json()

    if (!itens || itens.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no orçamento" },
        { status: 400 }
      )
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email do cliente é obrigatório" },
        { status: 400 }
      )
    }

    /* =========================
       CONFIGURAÇÃO LOCAWEB
    ========================= */

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    /* =========================
       MONTA LISTA DE PRODUTOS
    ========================= */

    const listaProdutos = itens
      .map(
        (item: any) =>
          `• ${item.nome} - ${item.tamanho} - Qtd: ${item.quantidade}`
      )
      .join("\n")

    const corpoEmail = `
NOVO ORÇAMENTO RECEBIDO

Cliente: ${email}

Produtos:
${listaProdutos}

Observações:
${observacoes || "Nenhuma observação"}

--------------------------
FG Tintas
`

    /* =========================
       ENVIA PARA LOJA
    ========================= */

    await transporter.sendMail({
      from: `"FG Tintas" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // email da loja
      subject: "Novo orçamento recebido",
      text: corpoEmail
    })

    /* =========================
       ENVIA CONFIRMAÇÃO CLIENTE
    ========================= */

    await transporter.sendMail({
      from: `"FG Tintas" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recebemos seu orçamento - FG Tintas",
      text: `
Olá!

Recebemos seu pedido de orçamento.

Em breve nossa equipe entrará em contato.

Resumo do pedido:
${listaProdutos}

Obrigado!
FG Tintas
`
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erro ao enviar orçamento" },
      { status: 500 }
    )
  }
}
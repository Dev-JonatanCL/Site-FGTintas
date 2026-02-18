import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { randomUUID } from "crypto";

interface ProfessionalRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  specialty: string;
  description: string;
  city: string;
  state: string;
  photo: string | null;
  referral_code: string;
  commission_balance: number;
  created_at: string;
  active: boolean;
}

interface CommissionRow {
  id: string;
  date: string;
  client_name: string;
  purchase_value: number;
  commission_rate: number;
  commission_value: number;
  added_by: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Only admins can add commissions
    const authResult = await requireAuth(request, "admin");
    if ("error" in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { clientName, purchaseValue } = body;

    if (!clientName || !purchaseValue) {
      return NextResponse.json(
        { error: "Nome do cliente e valor da compra sao obrigatorios" },
        { status: 400 }
      );
    }

    // Check professional exists
    const pro = await db.queryOne<{ id: string; commission_balance: number }>(
      "SELECT id, commission_balance FROM professionals WHERE id = ?",
      [id]
    );

    if (!pro) {
      return NextResponse.json(
        { error: "Profissional nao encontrado" },
        { status: 404 }
      );
    }

    const commissionValue = Number(purchaseValue) * 0.01;
    const entryId = randomUUID();
    const today = new Date().toISOString().split("T")[0];

    // Insert commission entry
    await db.execute(
      `INSERT INTO commission_entries (id, professional_id, date, client_name, purchase_value, commission_rate, commission_value, added_by)
       VALUES (?, ?, ?, ?, ?, 1.00, ?, ?)`,
      [entryId, id, today, clientName, purchaseValue, commissionValue, "Admin"]
    );

    // Update balance
    const newBalance = Number(pro.commission_balance) + commissionValue;
    await db.execute(
      "UPDATE professionals SET commission_balance = ? WHERE id = ?",
      [newBalance, id]
    );

    // Fetch full professional data for response
    const row = await db.queryOne<ProfessionalRow>(
      `SELECT id, name, email, phone, whatsapp, specialty, description, city, state, photo,
              referral_code, commission_balance, created_at, active
       FROM professionals WHERE id = ?`,
      [id]
    );

    const commissions = await db.query<CommissionRow>(
      `SELECT id, date, client_name, purchase_value, commission_rate, commission_value, added_by
       FROM commission_entries WHERE professional_id = ?
       ORDER BY date DESC`,
      [id]
    );

    const professional = {
      id: row!.id,
      name: row!.name,
      email: row!.email,
      phone: row!.phone,
      whatsapp: row!.whatsapp,
      specialty: row!.specialty,
      description: row!.description,
      city: row!.city,
      state: row!.state,
      photo: row!.photo || "",
      referralCode: row!.referral_code,
      commissionBalance: Number(row!.commission_balance),
      commissionHistory: commissions.map((c) => ({
        id: c.id,
        date: typeof c.date === "object" ? (c.date as Date).toISOString().split("T")[0] : c.date,
        clientName: c.client_name,
        purchaseValue: Number(c.purchase_value),
        commissionRate: Number(c.commission_rate),
        commissionValue: Number(c.commission_value),
      })),
      createdAt: row!.created_at,
      active: row!.active,
    };

    return NextResponse.json({ professional });
  } catch (error) {
    console.error("Add commission error:", error);
    return NextResponse.json(
      { error: "Erro ao adicionar comissao" },
      { status: 500 }
    );
  }
}

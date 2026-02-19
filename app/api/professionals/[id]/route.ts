import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const row = await db.queryOne<ProfessionalRow>(
      `SELECT id, name, email, phone, whatsapp, specialty, description, city, state, photo,
              referral_code, commission_balance, created_at, active
       FROM professionals WHERE id = ?`,
      [id]
    );

    if (!row) {
      return NextResponse.json(
        { error: "Profissional nao encontrado" },
        { status: 404 }
      );
    }

    const commissions = await db.query<CommissionRow>(
      `SELECT id, date, client_name, purchase_value, commission_rate, commission_value, added_by
       FROM commission_entries WHERE professional_id = ?
       ORDER BY date DESC`,
      [id]
    );

    const professional = {
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      whatsapp: row.whatsapp,
      specialty: row.specialty,
      description: row.description,
      city: row.city,
      state: row.state,
      photo: row.photo || "",
      referralCode: row.referral_code,
      commissionBalance: Number(row.commission_balance),
      commissionHistory: commissions.map((c) => ({
        id: c.id,
        date: typeof c.date === "object" ? (c.date as Date).toISOString().split("T")[0] : c.date,
        clientName: c.client_name,
        purchaseValue: Number(c.purchase_value),
        commissionRate: Number(c.commission_rate),
        commissionValue: Number(c.commission_value),
      })),
      createdAt: row.created_at,
      active: row.active,
    };

    return NextResponse.json({ professional });
  } catch (error) {
    console.error("Get professional error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar profissional" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Verify the user is the professional themselves or an admin
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
    }
    if (user.role !== "admin" && user.userId !== id) {
      return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
    }

    const body = await request.json();
    const { name, phone, whatsapp, specialty, description, city, state } = body;

    const existing = await db.queryOne<{ id: string }>(
      "SELECT id FROM professionals WHERE id = ?",
      [id]
    );

    if (!existing) {
      return NextResponse.json(
        { error: "Profissional nao encontrado" },
        { status: 404 }
      );
    }

    await db.execute(
      `UPDATE professionals SET name = ?, phone = ?, whatsapp = ?, specialty = ?, description = ?, city = ?, state = ?
       WHERE id = ?`,
      [name, phone, whatsapp, specialty, description, city, state, id]
    );

    // Fetch updated data with commission history
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
    console.error("Update professional error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar profissional" },
      { status: 500 }
    );
  }
}

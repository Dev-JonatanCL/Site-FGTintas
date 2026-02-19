import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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

export async function GET() {
  try {
    const rows = await db.query<ProfessionalRow>(
      `SELECT id, name, email, phone, whatsapp, specialty, description, city, state, photo,
              referral_code, commission_balance, created_at, active
       FROM professionals WHERE active = TRUE
       ORDER BY created_at DESC`
    );

    const professionals = rows.map((row) => ({
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
      commissionHistory: [],
      createdAt: row.created_at,
      active: row.active,
    }));

    return NextResponse.json({ professionals });
  } catch (error) {
    console.error("Get professionals error:", error);
    return NextResponse.json(
      { professionals: [], error: "Erro ao buscar profissionais" },
      { status: 200 }
    );
  }
}

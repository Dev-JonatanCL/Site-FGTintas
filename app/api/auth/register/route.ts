import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { signToken, setTokenCookie } from "@/lib/jwt";
import { randomUUID } from "crypto";

function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "FG-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, whatsapp, specialty, description, city, state } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Nome, email e senha sao obrigatorios" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await db.queryOne<{ id: string }>(
      "SELECT id FROM professionals WHERE email = ?",
      [email]
    );

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email ja cadastrado" },
        { status: 400 }
      );
    }

    const id = randomUUID();
    const passwordHash = await hashPassword(password);
    const referralCode = generateReferralCode();

    await db.execute(
      `INSERT INTO professionals (id, name, email, password_hash, phone, whatsapp, specialty, description, city, state, referral_code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, email, passwordHash, phone || "", whatsapp || "", specialty || "", description || "", city || "", state || "", referralCode]
    );

    const token = await signToken({
      userId: id,
      email,
      role: "professional",
      name,
    });

    const cookie = setTokenCookie(token);
    const response = NextResponse.json({
      success: true,
      user: {
        id,
        name,
        email,
        role: "professional",
      },
      referralCode,
    });

    response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao registrar" },
      { status: 500 }
    );
  }
}

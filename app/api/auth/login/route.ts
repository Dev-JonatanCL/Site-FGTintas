import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword } from "@/lib/auth";
import { signToken, setTokenCookie } from "@/lib/jwt";

interface AdminRow {
  id: number;
  email: string;
  password_hash: string;
  name: string;
}

interface ProfessionalRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, error: "Email, senha e tipo de acesso sao obrigatorios" },
        { status: 400 }
      );
    }

    if (role === "admin") {
      const admin = await db.queryOne<AdminRow>(
        "SELECT id, email, password_hash, name FROM admin_users WHERE email = ?",
        [email]
      );

      if (!admin || !(await comparePassword(password, admin.password_hash))) {
        return NextResponse.json(
          { success: false, error: "Credenciais invalidas" },
          { status: 401 }
        );
      }

      const token = await signToken({
        userId: String(admin.id),
        email: admin.email,
        role: "admin",
        name: admin.name,
      });

      const cookie = setTokenCookie(token);
      const response = NextResponse.json({
        success: true,
        user: {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          role: "admin",
        },
      });

      response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
      return response;
    }

    if (role === "professional") {
      const pro = await db.queryOne<ProfessionalRow>(
        "SELECT id, email, password_hash, name FROM professionals WHERE email = ? AND active = TRUE",
        [email]
      );

      if (!pro || !(await comparePassword(password, pro.password_hash))) {
        return NextResponse.json(
          { success: false, error: "Credenciais invalidas" },
          { status: 401 }
        );
      }

      const token = await signToken({
        userId: pro.id,
        email: pro.email,
        role: "professional",
        name: pro.name,
      });

      const cookie = setTokenCookie(token);
      const response = NextResponse.json({
        success: true,
        user: {
          id: pro.id,
          name: pro.name,
          email: pro.email,
          role: "professional",
        },
      });

      response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Tipo de acesso invalido" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

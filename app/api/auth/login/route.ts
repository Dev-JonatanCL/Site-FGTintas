import { NextResponse } from "next/server";
import { validateAdmin, validateProfessional } from "@/lib/data-store";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, role } = body;

  if (role === "admin") {
    const isValid = validateAdmin(email, password);
    if (isValid) {
      return NextResponse.json({
        success: true,
        user: {
          id: "admin-1",
          name: "Administrador",
          email,
          role: "admin",
        },
        // In production .NET: JWT token would be returned here
        token: "mock-jwt-admin-token",
      });
    }
  }

  if (role === "professional") {
    const pro = validateProfessional(email, password);
    if (pro) {
      return NextResponse.json({
        success: true,
        user: {
          id: pro.id,
          name: pro.name,
          email: pro.email,
          role: "professional",
        },
        token: "mock-jwt-pro-token",
      });
    }
  }

  return NextResponse.json(
    { success: false, error: "Credenciais invalidas" },
    { status: 401 }
  );
}

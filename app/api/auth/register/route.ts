import { NextResponse } from "next/server";
import { registerProfessional } from "@/lib/data-store";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const pro = registerProfessional(body);
    return NextResponse.json({
      success: true,
      user: {
        id: pro.id,
        name: pro.name,
        email: pro.email,
        role: "professional",
      },
      referralCode: pro.referralCode,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao registrar";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

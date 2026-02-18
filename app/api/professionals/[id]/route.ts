import { NextResponse } from "next/server";
import {
  getProfessionalById,
  updateProfessional,
} from "@/lib/data-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const pro = getProfessionalById(id);
  if (!pro) {
    return NextResponse.json(
      { error: "Profissional nao encontrado" },
      { status: 404 }
    );
  }
  const { password, ...safe } = pro;
  return NextResponse.json({ professional: safe });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const updated = updateProfessional(id, body);
  if (!updated) {
    return NextResponse.json(
      { error: "Profissional nao encontrado" },
      { status: 404 }
    );
  }
  const { password, ...safe } = updated;
  return NextResponse.json({ professional: safe });
}

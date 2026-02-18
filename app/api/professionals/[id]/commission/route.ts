import { NextResponse } from "next/server";
import { addCommission } from "@/lib/data-store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updated = addCommission(id, {
    clientName: body.clientName,
    purchaseValue: body.purchaseValue,
  });

  if (!updated) {
    return NextResponse.json(
      { error: "Profissional nao encontrado" },
      { status: 404 }
    );
  }

  const { password, ...safe } = updated;
  return NextResponse.json({ professional: safe });
}

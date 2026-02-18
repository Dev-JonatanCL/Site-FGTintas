import { NextResponse } from "next/server";
import { getAllProfessionals } from "@/lib/data-store";

export async function GET() {
  const professionals = getAllProfessionals();
  // Return without sensitive data
  const safe = professionals.map(({ password, ...rest }) => rest);
  return NextResponse.json({ professionals: safe });
}

import { categories } from "@/databases/categories";
import { NextResponse } from "next/server";

export async function GET() {
  const data = categories
  return NextResponse.json({ data })
}
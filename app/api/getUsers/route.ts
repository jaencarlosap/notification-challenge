import { Users } from "@/databases/users";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: Users })
}
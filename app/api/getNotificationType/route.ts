import { notificationType } from "@/databases/notificationType";
import { NextResponse } from "next/server";

export async function GET() {
  const data = notificationType
  return NextResponse.json({ data })
}
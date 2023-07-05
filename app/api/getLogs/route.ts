import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export async function GET() {
  let data = ""
  try {
    const route = path.resolve(__dirname, '../../../../../databases/logs.json')
    data = readFileSync(route,  { encoding: 'utf8', flag: 'r' });
  } catch (error) {
    console.error({ error })
  }

  return NextResponse.json({ data })
}
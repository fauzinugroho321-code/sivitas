import { NextResponse } from "next/server";
import { getAllSurat } from "../../../actions/ekspor";

export async function GET() {
  const data = await getAllSurat();
  return NextResponse.json(data);
}

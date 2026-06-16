import { NextResponse } from "next/server";
import { getAllWarga } from "../../../actions/ekspor";

export async function GET() {
  const data = await getAllWarga();
  return NextResponse.json(data);
}

import { NextResponse } from "next/server";
import { getAllAduan } from "../../../actions/ekspor";

export async function GET() {
  const data = await getAllAduan();
  return NextResponse.json(data);
}

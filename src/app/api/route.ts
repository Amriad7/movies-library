import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    message: "It's working as a charm!",
  });
}

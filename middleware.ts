import { NextRequest, NextResponse } from "next/server";
import { updateToken } from "./server/auth";

export async function middleware(request: NextRequest) {
  const response = await updateToken(request);

  if (!response) return NextResponse.error();
  return response;
}

import { NextRequest } from "next/server";
import { updateToken } from "./server/auth";

export async function middleware(request: NextRequest) {
  return await updateToken(request);
}

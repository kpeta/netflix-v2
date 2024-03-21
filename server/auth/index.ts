//barebones JWT auth implementation
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type TokenPayload = {
  username: string;
};

const TOKEN_EXPIRATION = 50; // 50 seconds

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRATION} sec from now`) // expiration is set to 10 seconds only for security reasons (jwt can't be reused 10s after its deletion if stolen)
    .sign(key);
}

async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createToken(user: TokenPayload) {
  const expires = new Date(Date.now() + 10 * 1000);
  const token = await encrypt({ user, expires });

  cookies().set("token", token, { expires, httpOnly: true });
}

export async function removeToken() {
  cookies().set("token", "", { expires: new Date(0) });
}

export async function getToken(): Promise<TokenPayload | null> {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  return await decrypt(token);
}

export async function updateToken(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  if (!token) return;

  // refresh the token so it doesn't expire (10 seconds), this function is called on every request in middleware to keep the token alive
  const parsed = await decrypt(token);
  parsed.expires = new Date(Date.now() + TOKEN_EXPIRATION * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "token",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });

  return res;
}

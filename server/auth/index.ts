//barebones JWT auth implementation
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type TokenPayload = {
  user: string;
  expires: Date;
  iat: number;
  exp: number;
};

const TOKEN_EXPIRATION = 7 * 24 * 60 * 60; // 1 week in seconds

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Pick<TokenPayload, "user" | "expires">) {
  try {
    const signedJWT = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${TOKEN_EXPIRATION} sec from now`)
      .sign(key);

    return signedJWT;
  } catch (error) {
    console.error("An error occurred while encrypting the token:", error);
    throw error;
  }
}

async function decrypt(input: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload as TokenPayload;
  } catch (error) {
    console.error(`JWT verification failed in decrypt():`, error);
    return null;
  }
}

export async function createToken(user: string) {
  try {
    const expires = new Date(Date.now() + TOKEN_EXPIRATION * 1000);
    const token = await encrypt({ user, expires });

    cookies().set("token", token, {
      httpOnly: true, // prevents JavaScript from accessing the cookie
      secure: process.env.NODE_ENV !== "development", // use 'secure' in production
      sameSite: "lax", // helps mitigate CSRF attacks
      path: "/", // cookie will be available across the site
    });
  } catch (error) {
    console.error("An error occurred while creating the token:", error);
    throw error;
  }
}

export async function removeToken() {
  cookies().set("token", "", { expires: new Date(0) });
}

export async function getToken(): Promise<TokenPayload | null> {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  return await decrypt(token);
}

import { getToken } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const token = await getToken();

  return (
    <main>
      <h1>Home Page</h1>
      <button style={{ marginRight: "34px" }}>
        <Link href="/data">Go to data page</Link>
      </button>
      <button style={{ marginRight: "34px" }}>
        <Link href="/form">Go to form page</Link>
      </button>
      <button>
        <Link href="/movies">Go to movies page</Link>
      </button>
      <pre>{JSON.stringify(token, null, 2)}</pre>
    </main>
  );
}

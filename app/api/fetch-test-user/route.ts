import supabase from "@/server/db";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("name", "test")
      .single();

    if (error) console.error("Error fetching user:", error);
    console;

    return NextResponse.json({ data });
  } catch (error) {
    const postgrestError = error as PostgrestError;
    return NextResponse.json(
      { error: postgrestError.message },
      { status: 500 }
    );
  }
}

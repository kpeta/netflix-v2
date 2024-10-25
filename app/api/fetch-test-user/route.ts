// API endpoint for testing fetching a user from the database
// CRON job calls this endpoint every day
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

    if (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ error: error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching user:", error);

    const postgrestError = error as PostgrestError;
    return NextResponse.json(
      { error: postgrestError.message },
      { status: 500 }
    );
  }
}

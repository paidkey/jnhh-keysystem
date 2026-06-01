import { NextResponse } from "next/server";
import { buildKeyString, getKeyExpiryDate, KEY_EXPIRY_HOURS } from "@/lib/key";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_INSERT_ATTEMPTS = 5;

export async function POST() {
  try {
    const supabase = createAdminClient();
    const expiresAt = getKeyExpiryDate();

    for (let attempt = 0; attempt < MAX_INSERT_ATTEMPTS; attempt++) {
      const key = buildKeyString();

      const { data, error } = await supabase
        .from("keys")
        .insert({
          key,
          status: "unused",
          key_type: "free",
          expires_at: expiresAt.toISOString(),
          banned: false,
        })
        .select("key, status, key_type, expires_at")
        .single();

      if (!error && data) {
        return NextResponse.json({
          key: data.key,
          status: data.status,
          key_type: data.key_type,
          expires_at: data.expires_at,
          expiry_hours: KEY_EXPIRY_HOURS,
        });
      }

      if (error?.code !== "23505") {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Failed to save key. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Could not generate a unique key. Please try again." },
      { status: 500 }
    );
  } catch (err) {
    console.error("Key generation error:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Failed to generate key. Check Supabase configuration.",
      },
      { status: 500 }
    );
  }
}

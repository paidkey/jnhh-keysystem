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

      const { data: row, error } = await supabase
        .from("keys")
        .insert({
          key,
          key_type: "free",
          expires_at: expiresAt.toISOString(),
        })
        .select("key, status, key_type, expires_at")
        .single();

      if (error) {
        if (error.code === "23505") continue; // key string collision, retry
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { error: "Failed to save key. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        key: row.key,
        status: row.status,
        key_type: row.key_type,
        expires_at: row.expires_at,
        expiry_hours: KEY_EXPIRY_HOURS,
      });
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

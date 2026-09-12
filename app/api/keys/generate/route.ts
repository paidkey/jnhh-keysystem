import { NextResponse } from "next/server";
import { buildKeyString, getKeyExpiryDate, KEY_EXPIRY_HOURS } from "@/lib/key";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_INSERT_ATTEMPTS = 5;

type RequestBody = {
  fingerprint?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as RequestBody;
    const fingerprint = body.fingerprint?.trim();

    if (!fingerprint) {
      return NextResponse.json(
        { error: "Missing device fingerprint. Please refresh and try again." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const expiresAt = getKeyExpiryDate();

    for (let attempt = 0; attempt < MAX_INSERT_ATTEMPTS; attempt++) {
      const key = buildKeyString();

      const { data, error } = await supabase.rpc("generate_daily_key", {
        p_fingerprint: fingerprint,
        p_key: key,
        p_expires_at: expiresAt.toISOString(),
        p_key_type: "free",
      });

      if (error) {
        if (error.code === "23505") continue; // key string collision, retry with a new one
        if (error.message?.toLowerCase().includes("banned")) {
          return NextResponse.json(
            { error: "This device is banned." },
            { status: 403 }
          );
        }
        console.error("Supabase RPC error:", error);
        return NextResponse.json(
          { error: "Failed to save key. Please try again." },
          { status: 500 }
        );
      }

      const row = Array.isArray(data) ? data[0] : data;
      if (!row) {
        return NextResponse.json(
          { error: "Unexpected response from key service." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        key: row.key,
        status: row.status,
        key_type: row.key_type,
        expires_at: row.expires_at,
        expiry_hours: KEY_EXPIRY_HOURS,
        already_issued: row.already_issued,
        retry_after: row.retry_after,
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

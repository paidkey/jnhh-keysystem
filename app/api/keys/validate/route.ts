import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type ValidateBody = {
  key?: string;
  hwid?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ValidateBody;
    const key = body.key?.trim();
    const hwid = body.hwid?.trim();

    if (!key || !hwid) {
      return NextResponse.json(
        { valid: false, error: "key and hwid are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data: row, error } = await supabase
      .from("keys")
      .select("id, key, status, key_type, expires_at, hwid, banned")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      console.error("Validate lookup error:", error);
      return NextResponse.json(
        { valid: false, error: "Validation failed" },
        { status: 500 }
      );
    }

    if (!row) {
      return NextResponse.json(
        { valid: false, error: "Key not found" },
        { status: 404 }
      );
    }

    if (row.banned) {
      return NextResponse.json(
        { valid: false, error: "Key is banned" },
        { status: 403 }
      );
    }

    if (new Date(row.expires_at) <= new Date()) {
      if (row.status !== "expired") {
        await supabase.from("keys").update({ status: "expired" }).eq("id", row.id);
      }
      return NextResponse.json(
        { valid: false, error: "Key expired" },
        { status: 403 }
      );
    }

    if (!row.hwid) {
      const { data: updated, error: bindError } = await supabase
        .from("keys")
        .update({ hwid, status: "used" })
        .eq("id", row.id)
        .is("hwid", null)
        .select("key_type, expires_at, status")
        .maybeSingle();

      if (bindError) {
        console.error("HWID bind error:", bindError);
        return NextResponse.json(
          { valid: false, error: "Failed to bind device" },
          { status: 500 }
        );
      }

      if (!updated) {
        const { data: refreshed } = await supabase
          .from("keys")
          .select("hwid, key_type, expires_at, status, banned")
          .eq("id", row.id)
          .single();

        if (refreshed?.banned) {
          return NextResponse.json(
            { valid: false, error: "Key is banned" },
            { status: 403 }
          );
        }

        if (refreshed?.hwid === hwid) {
          return NextResponse.json({
            valid: true,
            key_type: refreshed.key_type,
            expires_at: refreshed.expires_at,
            status: refreshed.status,
            message: "Key valid",
          });
        }

        return NextResponse.json(
          { valid: false, error: "Key is bound to another device" },
          { status: 403 }
        );
      }

      return NextResponse.json({
        valid: true,
        key_type: updated.key_type,
        expires_at: updated.expires_at,
        status: updated.status,
        message: "Key activated and bound to this device",
      });
    }

    if (row.hwid !== hwid) {
      return NextResponse.json(
        { valid: false, error: "Key is bound to another device" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      key_type: row.key_type,
      expires_at: row.expires_at,
      status: row.status,
      message: "Key valid",
    });
  } catch (err) {
    console.error("Validate error:", err);
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}

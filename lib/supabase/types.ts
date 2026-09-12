export type KeyStatus = "unused" | "used" | "expired";
export type KeyType = "free" | "paid";

export type KeyRow = {
  id: string;
  key: string;
  status: KeyStatus;
  key_type: KeyType;
  expires_at: string;
  hwid: string | null;
  banned: boolean;
  created_at: string;
};

export type KeyInsert = {
  key: string;
  status: KeyStatus;
  key_type: KeyType;
  expires_at: string;
  hwid?: string | null;
  banned?: boolean;
};

export type GenerateDailyKeyArgs = {
  p_fingerprint: string;
  p_key: string;
  p_expires_at: string;
  p_key_type?: string;
};

export type GenerateDailyKeyRow = {
  key: string;
  status: KeyStatus;
  key_type: KeyType;
  expires_at: string;
  already_issued: boolean;
  retry_after: string;
};

export type Database = {
  public: {
    Tables: {
      keys: {
        Row: KeyRow;
        Insert: KeyInsert;
        Update: Partial<KeyInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_daily_key: {
        Args: GenerateDailyKeyArgs;
        Returns: GenerateDailyKeyRow[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

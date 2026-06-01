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
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

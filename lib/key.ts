export const KEY_EXPIRY_HOURS = 16;
export const KEY_DISPLAY_HOURS = 24;

const SEGMENT_LENGTH = 8;
const SEGMENT_COUNT = 3;
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomSegment(): string {
  let segment = "";
  for (let i = 0; i < SEGMENT_LENGTH; i++) {
    segment += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return segment;
}

export function buildKeyString(): string {
  const segments = Array.from({ length: SEGMENT_COUNT }, randomSegment);
  return `JNHH-${segments.join("-")}`;
}

export function getKeyExpiryDate(from: Date = new Date()): Date {
  return new Date(from.getTime() + KEY_EXPIRY_HOURS * 60 * 60 * 1000);
}

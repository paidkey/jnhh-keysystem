import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <img
        src="https://i.ibb.co/qYpk6r9c/channels4-profile.jpg"
        width="32"
        height="32"
        alt="JN HH Gaming"
      />
    ),
    { ...size }
  );
}

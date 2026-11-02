import { ImageResponse } from "next/og";

export const alt = "דוד טובול — סטודיו לחוויות רשת";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #F9F8F6 0%, #F3F1ED 45%, #EFECE6 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#D4AF37",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          DAVID TUBUL
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              color: "#121212",
              fontSize: 64,
              lineHeight: 1.15,
              fontWeight: 600,
              maxWidth: 920,
            }}
          >
            נכסים דיגיטליים שאי אפשר להתעלם מהם
          </div>
          <div
            style={{
              display: "flex",
              color: "#5C5C5C",
              fontSize: 28,
              maxWidth: 760,
              lineHeight: 1.45,
            }}
          >
            חוויות דיגיטליות אקסקלוסיביות · עיצוב בוטיק · שיחת ייעוץ
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 3,
            width: 160,
            background:
              "linear-gradient(90deg, #D4AF37 0%, rgba(212,175,55,0.15) 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}

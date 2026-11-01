import Link from "next/link";

export default function DemoNotFound() {
  return (
    <div className="grid min-h-svh place-items-center bg-[#070708] px-5 text-center text-ivory">
      <div>
        <p className="text-xs tracking-[0.22em] text-gold">DEMO</p>
        <h1 className="display mt-3 text-3xl">הדימו לא נמצא</h1>
        <p className="mt-3 text-sm text-muted">ייתכן שהקישור שגוי או שהפרויקט הוסר.</p>
        <Link
          href="/work"
          className="mt-8 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-rich-black"
        >
          חזרה לתיק עבודות
        </Link>
      </div>
    </div>
  );
}

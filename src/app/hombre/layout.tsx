import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfumes y Cosméticos para Hombre | Sisay",
  description: "Descubre nuestra colección exclusiva de perfumes, fragancias y productos de cuidado personal para hombre en Sisay Arequipa.",
  alternates: { canonical: '/hombre' },
};

export default function HombreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="palette-male">
      {children}
    </div>
  );
}
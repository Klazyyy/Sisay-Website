import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfumes y Cosméticos para Mujer | Sisay",
  description: "Encuentra en Sisay Arequipa la mejor selección de perfumes, fragancias y cosméticos para mujer. Calidad y belleza a tu alcance.",
  alternates: { canonical: '/mujer' },
};

export default function MujerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="palette-female">
      {children}
    </div>
  );
}
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { FloatingSocial } from "@/components/layout/floating-social";
import { CookieConsent } from "@/components/common/cookie-consent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alina Shop | Tienda Virtual de Insumos de Repostería & Bases MDF",
  description: "Tienda virtual de insumos de repostería, bases para tortas personalizadas en MDF con grabado de logotipo, toppers, cajas y herramientas para pastelería en Ecuador.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-white text-slate-900 min-h-screen flex flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingSocial />
          <CookieConsent />
        </CartProvider>
      </body>
    </html>
  );
}

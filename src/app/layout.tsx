import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Siyo Farms - Pure Farm Fresh Dairy Delivered Daily",
  description:
    "Siyo Farms delivers fresh, pure, high-quality dairy products including A2 Cow Milk, Buffalo Milk, Ghee, Paneer and more. Daily delivery across Mumbai, Pune, Hyderabad, Jaipur and Delhi NCR.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}

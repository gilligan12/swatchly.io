import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swatchly.io - Import Products to Your Shopify Store",
  description: "Discover products from vendor websites and import them directly to your Shopify store. Edit, customize, and push products with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NyayaDesk — Legal ERP",
  description: "न्याय Desk — Lawfirm Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

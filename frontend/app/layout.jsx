import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Brice Ashburn",
  description: "Full-stack software engineer building modern web applications.",
  metadataBase: new URL("https://briceashburn.com"),
  openGraph: {
    title: "Brice Ashburn",
    description: "Full-stack software engineer building modern web applications.",
    url: "https://briceashburn.com",
    siteName: "Brice Ashburn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brice Ashburn",
    description: "Full-stack software engineer building modern web applications.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}

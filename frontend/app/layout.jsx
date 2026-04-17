import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
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
    <html lang="en" className={mono.variable}>
      <body className="min-h-screen bg-black text-green-400 antialiased font-mono">
        {children}
      </body>
    </html>
  );
}

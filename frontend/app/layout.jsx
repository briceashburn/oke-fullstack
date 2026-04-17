import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Brice Ashburn",
    template: "%s | Brice Ashburn",
  },
  description: "Full-stack software engineer building modern web applications with Next.js, Python, Kubernetes, and Oracle Cloud.",
  metadataBase: new URL("https://briceashburn.com"),
  keywords: ["Brice Ashburn", "full-stack engineer", "Next.js", "Python", "Kubernetes", "Oracle Cloud", "software engineer", "portfolio"],
  authors: [{ name: "Brice Ashburn", url: "https://briceashburn.com" }],
  creator: "Brice Ashburn",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://briceashburn.com",
  },
  openGraph: {
    title: "Brice Ashburn",
    description: "Full-stack software engineer building modern web applications with Next.js, Python, Kubernetes, and Oracle Cloud.",
    url: "https://briceashburn.com",
    siteName: "Brice Ashburn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brice Ashburn",
    description: "Full-stack software engineer building modern web applications with Next.js, Python, Kubernetes, and Oracle Cloud.",
    creator: "@briceashburn",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mono.variable} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-black text-green-400 antialiased font-mono">
        {children}
      </body>
    </html>
  );
}

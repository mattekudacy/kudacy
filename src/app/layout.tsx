import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const SITE_URL = "https://mattekudacy.is-a.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cyrus Mante | AI Engineer & Data Scientist",
    template: "%s | Cyrus Mante",
  },
  description: "Professional portfolio of Cyrus Mante, experienced AI Engineer specializing in machine learning, deep learning, and intelligent system architecture.",
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Cyrus Mante",
    title: "Cyrus Mante | AI Engineer & Data Scientist",
    description: "Professional portfolio of Cyrus Mante, experienced AI Engineer specializing in machine learning, deep learning, and intelligent system architecture.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyrus Mante | AI Engineer & Data Scientist",
    description: "Professional portfolio of Cyrus Mante, experienced AI Engineer specializing in machine learning, deep learning, and intelligent system architecture.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Cyrus Mante",
  url: SITE_URL,
  jobTitle: "AI Engineer & Data Scientist",
  sameAs: [
    "https://github.com/mattekudacy",
    "https://linkedin.com/in/cyrusmante",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-300 min-h-screen antialiased selection:bg-primary/30`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import CyrusAssistant from "@/components/CyrusAssistant";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Cyrus Mante | AI Engineer & Data Scientist",
  description: "Professional portfolio of Cyrus Mante, experienced AI Engineer specializing in machine learning, deep learning, and intelligent system architecture.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} min-h-screen`}
      >
        {children}
        {/* <CyrusAssistant /> */}
      </body>
    </html>
  );
}

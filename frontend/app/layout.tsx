import type { Metadata } from "next";
import { GlobalContextProvider } from "./Context/store";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with Doc",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="night">
      <body className={inter.className}>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter", // Typo fixed: "inder" → "inter"
  subsets: ["latin"],
});

export const metadata = {
  title: "DeepSeekk",
  description: "Full Stack Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <ClerkProvider>
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

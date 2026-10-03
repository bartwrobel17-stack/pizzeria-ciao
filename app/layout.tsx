import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizzeria CIAO! | Wrocław",
  description: "Włoska pizza z pieca opalanego drewnem. Pizzeria CIAO! przy ul. Karczemnej 1b we Wrocławiu.",
  keywords: ["pizzeria Wrocław", "pizza Wrocław", "Pizzeria CIAO", "Karczemna 1b", "pizza z pieca"],
  openGraph: {
    title: "Pizzeria CIAO! | Wrocław",
    description: "Pizza, która zaczyna się od ognia.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl"><body>{children}</body></html>;
}
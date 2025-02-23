import { Inter } from "next/font/google";
import clsx from "clsx";
import { Providers } from "@/app/providers";
import "@/styles/tailwind.css";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "PDF Transcript Extractor - Upload and Extract Text Easily",
  description:
    "Extract text from PDF transcripts effortlessly. Upload your PDF and get structured text output in seconds.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx("h-full antialiased", inter.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQloIbIPFfbfAPGn7iM3z3tzWzwQLboOs8hcw&s"
          type="image/png"
        />
      </head>

      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <AppProvider>
          <Providers>{children}</Providers>
        </AppProvider>
      </body>
    </html>
  );
}

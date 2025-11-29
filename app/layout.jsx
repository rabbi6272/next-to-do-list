import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "To Do List || Made with Next.js",
  description: "A simple To Do List made with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased h-screen bg-linear-90 from-gray-100 to-gray-200`}
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        {children}
        <footer>
          <p className="text-center text-sm pb-3 text-gray-500">
            Developed with ❤️ by{" "}
            <Link
              target="_blank"
              className="
            hover:underline"
              href="https://github.com/rabbi6272"
            >
              {" "}
              Rabbi
            </Link>
          </p>
        </footer>
      </body>
    </html>
  );
}

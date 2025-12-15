import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Removed Geist as we are strictly using Inter
import { AuthProvider } from '../src/context/AuthContext';
import Navbar from '../src/components/Navbar';
import Chatbot from '../src/components/Chatbot';
import Footer from '../src/components/Footer';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Define CSS variable for Tailwind
});

export const metadata: Metadata = {
  title: 'Vision Estate | AI-Powered Real Estate',
  description: 'Find your dream home with Vision Estate, powered by AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-neon-cyan selection:text-black`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-4">
            {children}
          </main>
          <Chatbot />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

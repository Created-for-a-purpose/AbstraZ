import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { NextAuthProvider } from "@/utils/NextAuthProvider";
import { TwitterContextProvider } from "@/context/TwitterContext";

export const metadata = {
  title: "AbstraZ",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <TwitterContextProvider>
            <AuthContextProvider>
              <Navbar />
              <div id="root">{children}</div>
            </AuthContextProvider>
          </TwitterContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

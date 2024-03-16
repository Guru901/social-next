import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";
import UserContextProvider from "./Context/UserContextProvider";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Ni Batu 🤐",
  description: "social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          {children}
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  );
}

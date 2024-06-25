import { Ubuntu } from "next/font/google";
import "./globals.css";
import UserContextProvider from "./Context/UserContextProvider";

const inter = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Ni Batu 🤐",
  description: "social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="p1l8Nhq2jG8pkqLggUFBoHIfYIRF5viAkZ_0qrsp-18" />
      </head>
      <body className={inter.className}>
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}

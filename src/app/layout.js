import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";
import UserContextProvider from "./Context/UserContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = JetBrains_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Ni Batu 😏",
  description: "social media app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {children}
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  );
}

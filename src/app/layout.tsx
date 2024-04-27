import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MobileCartButton from "@/components/mobileCartButton";

const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home Page",
  description: "HomePage Eteration Frontend Case",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monserrat.className}>
        <AntdRegistry>
          <Navbar />
          {children}
          <Footer />
          <span className="mobileCart mobile-view">
            <MobileCartButton />
          </span>
        </AntdRegistry>
      </body>
    </html>
  );
}

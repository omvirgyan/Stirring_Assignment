import "./globals.css";
import NavbarWrapper from "@/components/navbar/NavbarWrapper";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "StartupBenefits",
  description: "Exclusive SaaS benefits for startups",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}

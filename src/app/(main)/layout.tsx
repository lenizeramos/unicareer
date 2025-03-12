import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
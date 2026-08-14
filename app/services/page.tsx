import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="Professional Pest Control Services"
        description="We’re preparing a detailed overview of our professional pest control services for homes and businesses across Sydney."
      />

     
    </main>
  );
}
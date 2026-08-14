import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="Frequently Asked Questions"
        description="We’re preparing answers to the most common questions about pest control, treatments, service areas, preparation and what you can expect from GR Pest Control."
      />

    
    </main>
  );
}
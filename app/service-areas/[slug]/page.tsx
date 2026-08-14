import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function InnerWestSydneyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="Pest Control in Inner West Sydney"
        description="We’re preparing the full Inner West Sydney service area page with local pest control information, available services, nearby areas and answers to common customer questions."
      />

      
    </main>
  );
}
import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function ServiceAreasPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="Pest Control Across Sydney"
        description="We’re preparing our service areas page with detailed information about the locations where GR Pest Control provides professional pest management services."
      />

     
    </main>
  );
}
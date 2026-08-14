import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="Our Pest Control Gallery"
        description="We’re preparing our gallery with real pest control work, treatments and professional service environments from GR Pest Control."
      />

    
    </main>
  );
}
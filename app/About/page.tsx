import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="About GR Pest Control"
        description="We’re preparing our story, approach and commitment to providing safe, reliable and effective pest control solutions across Sydney."
      />

     
    </main>
  );
}
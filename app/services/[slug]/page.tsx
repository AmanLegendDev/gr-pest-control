import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function GeneralPestControlPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="General Pest Control"
        description="We’re preparing the full General Pest Control service page with detailed treatment information, common pest problems, our process, FAQs and what customers can expect from GR Pest Control."
      />

     
    </main>
  );
}
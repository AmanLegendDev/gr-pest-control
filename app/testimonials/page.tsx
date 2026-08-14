import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="What Our Customers Say"
        description="We’re preparing our testimonials page with genuine customer experiences and feedback from people who have trusted GR Pest Control."
      />

     
    </main>
  );
}
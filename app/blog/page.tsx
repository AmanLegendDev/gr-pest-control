import Navigation from "@/components/shared/navigation/Navigation";
import Footer from "@/components/shared/footer/Footer";
import UnderDevelopment from "@/components/shared/UnderDevelopment";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <UnderDevelopment
        title="Pest Control Insights & Advice"
        description="We’re preparing helpful articles, pest prevention tips and practical advice to help Sydney homes and businesses manage common pest problems."
      />

      
    </main>
  );
}
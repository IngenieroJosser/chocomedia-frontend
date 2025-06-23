import Header from "@/components/ui/home/header";
import SliderPresentation from "@/components/ui/home/slider-presentation";
import CategoriesGrid from "@/components/ui/home/categories-grid";
import TrendingSection from "@/components/ui/home/trending-section";
import ChocoLive from "@/components/ui/home/choco-live";
import Footer from "@/components/ui/home/footer"

export default function Home() {
  return (
    <>
      <Header />
      <SliderPresentation />
      <CategoriesGrid />
      <TrendingSection />
      <ChocoLive />
      <Footer />
    </>
  );
}

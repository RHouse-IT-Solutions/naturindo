import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSlider />
        <CategoryGrid />
        <FeaturedProducts />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const FeaturedProducts = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="bg-nature-50/50 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Produk Unggulan
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pilihan terbaik untuk kesehatan Anda
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Lihat Semua
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Categories = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-gradient-hero py-12">
          <div className="container">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Kategori Produk
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pilih kategori sesuai kebutuhan kesehatan Anda
            </p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/products?category=${category.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-border bg-gradient-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-elevated"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-nature-100 text-4xl transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {category.name}
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary">
                    <span className="font-medium">{category.productCount} Produk</span>
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;

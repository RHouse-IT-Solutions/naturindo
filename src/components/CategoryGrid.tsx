import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { motion } from 'framer-motion';

const CategoryGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Kategori Produk
          </h2>
          <p className="mt-3 text-muted-foreground">
            Temukan suplemen yang tepat untuk kebutuhan kesehatan Anda
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={`/products?category=${category.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-gradient-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-card"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-nature-100 text-3xl transition-transform group-hover:scale-110">
                  {category.icon}
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {category.name}
                </h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  {category.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {category.productCount} Produk
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;

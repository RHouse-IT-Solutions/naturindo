import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-card"
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
          -{discountPercentage}%
        </div>
      )}

      {/* Image */}
      <Link to={`/products/${product.slug}`} className="block overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-nature-50 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/products?category=${product.category.slug}`}>
          <span className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary">
            {product.category.name}
          </span>
        </Link>
        
        <Link to={`/products/${product.slug}`}>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} ulasan)
          </span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => addItem(product)}
          className="mt-4 w-full gap-2 bg-gradient-nature text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <ShoppingCart className="h-4 w-4" />
          Tambah ke Keranjang
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

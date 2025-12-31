import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Star, Minus, Plus, ShoppingCart, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.slug === slug);
  const relatedProducts = products.filter(
    (p) => p.category.id === product?.category.id && p.id !== product?.id
  ).slice(0, 4);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Produk tidak ditemukan</h1>
            <Link to="/products" className="mt-4 inline-block text-primary hover:underline">
              Kembali ke daftar produk
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Beranda</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/products" className="hover:text-primary">Produk</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to={`/products?category=${product.category.slug}`} className="hover:text-primary">
                {product.category.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="container py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square overflow-hidden rounded-3xl bg-nature-50 p-8"
            >
              {discountPercentage > 0 && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-destructive px-3 py-1 text-sm font-bold text-destructive-foreground">
                  -{discountPercentage}%
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <Link
                  to={`/products?category=${product.category.slug}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {product.category.name}
                </Link>
                <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-gold-400 text-gold-400'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground">{product.description}</p>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-nature-500" />
                <span className="text-nature-600">Stok tersedia: {product.stock} unit</span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex items-center rounded-lg border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 gap-2 bg-gradient-nature text-primary-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Tambah ke Keranjang
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto">
                <TabsTrigger value="description">Deskripsi</TabsTrigger>
                <TabsTrigger value="composition">Komposisi</TabsTrigger>
                <TabsTrigger value="usage">Aturan Pakai</TabsTrigger>
                <TabsTrigger value="reviews">Ulasan</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-xl font-semibold">Manfaat Produk</h3>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-nature-500" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="composition" className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-xl font-semibold">Komposisi</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.composition.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-nature-100 px-4 py-2 text-sm text-nature-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="mb-4 font-display text-xl font-semibold">Aturan Penggunaan</h3>
                  <p className="text-muted-foreground">{product.usage}</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {product.testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="rounded-2xl border border-border bg-card p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nature-100 font-semibold text-nature-700">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{testimonial.name}</p>
                            {testimonial.verified && (
                              <span className="text-xs text-nature-500">✓ Pembelian Terverifikasi</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? 'fill-gold-400 text-gold-400'
                                  : 'fill-muted text-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-muted-foreground">{testimonial.comment}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{testimonial.date}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="bg-nature-50/50 py-12">
            <div className="container">
              <h2 className="mb-8 font-display text-2xl font-bold text-foreground">
                Produk Terkait
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;

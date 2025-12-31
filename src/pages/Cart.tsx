import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-background">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              Keranjang Kosong
            </h1>
            <p className="mt-2 text-muted-foreground">
              Belum ada produk di keranjang Anda
            </p>
            <Link to="/products">
              <Button className="mt-6 gap-2 bg-gradient-nature text-primary-foreground">
                Mulai Belanja
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="container">
          <h1 className="mb-8 font-display text-3xl font-bold text-foreground">
            Keranjang Belanja
          </h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-4 flex gap-4 rounded-2xl border border-border bg-card p-4"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-nature-50"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          to={`/products/${item.product.slug}`}
                          className="font-display font-semibold text-foreground hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {item.product.category.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-display font-bold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="self-start text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                variant="outline"
                onClick={clearCart}
                className="mt-4 gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4" />
                Kosongkan Keranjang
              </Button>
            </div>

            {/* Order Summary */}
            <div>
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                  Ringkasan Pesanan
                </h2>

                <div className="space-y-3 border-b border-border pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} item)
                    </span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ongkos Kirim</span>
                    <span className="text-nature-500">Gratis</span>
                  </div>
                </div>

                <div className="flex justify-between py-4">
                  <span className="font-display font-semibold">Total</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {isAuthenticated ? (
                  <Link to="/checkout">
                    <Button className="w-full gap-2 bg-gradient-nature text-primary-foreground">
                      Lanjutkan ke Pembayaran
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <Link to="/auth">
                      <Button className="w-full gap-2 bg-gradient-nature text-primary-foreground">
                        Masuk untuk Checkout
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="text-center text-xs text-muted-foreground">
                      Silakan login atau daftar untuk melanjutkan pembelian
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

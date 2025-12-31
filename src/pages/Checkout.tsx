import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, QrCode, MapPin, Phone, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { PaymentMethod } from '@/types';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    notes: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const paymentMethods = [
    {
      id: 'bank_transfer' as PaymentMethod,
      name: 'Transfer Bank',
      description: 'BCA, BNI, BRI, Mandiri',
      icon: CreditCard,
    },
    {
      id: 'ewallet' as PaymentMethod,
      name: 'E-Wallet',
      description: 'GoPay, OVO, DANA, ShopeePay',
      icon: Wallet,
    },
    {
      id: 'qris' as PaymentMethod,
      name: 'QRIS',
      description: 'Scan QR untuk pembayaran',
      icon: QrCode,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Mohon lengkapi semua data pengiriman');
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Pesanan berhasil dibuat!');
    clearCart();
    navigate('/order-success');
    setIsProcessing(false);
  };

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-8">
        <div className="container">
          <h1 className="mb-8 font-display text-3xl font-bold text-foreground">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Shipping & Payment */}
              <div className="space-y-6 lg:col-span-2">
                {/* Shipping Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                    Informasi Pengiriman
                  </h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Nama Penerima</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Nama lengkap"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="08xxxxxxxxxx"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Alamat Lengkap</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan, kota, kode pos"
                          className="min-h-[100px] pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="notes">Catatan (Opsional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        placeholder="Catatan untuk kurir atau instruksi khusus"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                    Metode Pembayaran
                  </h2>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="space-y-3"
                  >
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={method.id} />
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nature-100 text-nature-700">
                          <method.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="sticky top-24 rounded-2xl border border-border bg-card p-6"
                >
                  <h2 className="mb-4 font-display text-xl font-semibold text-foreground">
                    Ringkasan Pesanan
                  </h2>

                  <div className="max-h-64 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-nature-50">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} x {formatPrice(item.product.price)}
                          </p>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ongkos Kirim</span>
                      <span className="text-nature-500">Gratis</span>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-border py-4">
                    <span className="font-display font-semibold">Total</span>
                    <span className="font-display text-xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full gap-2 bg-gradient-nature text-primary-foreground"
                  >
                    {isProcessing ? (
                      'Memproses...'
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Buat Pesanan
                      </>
                    )}
                  </Button>

                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
                  </p>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;

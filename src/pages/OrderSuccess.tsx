import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-background py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-nature-100"
          >
            <CheckCircle className="h-12 w-12 text-nature-600" />
          </motion.div>

          <h1 className="font-display text-3xl font-bold text-foreground">
            Pesanan Berhasil!
          </h1>
          <p className="mt-3 text-muted-foreground">
            Terima kasih atas pesanan Anda. Kami akan segera memproses pesanan Anda.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-center gap-3 text-nature-600">
              <Package className="h-5 w-5" />
              <span className="font-medium">Nomor Pesanan: #NTD-{Date.now().toString().slice(-6)}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Silakan cek email Anda untuk detail pembayaran dan tracking pesanan.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/products">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                Lanjut Belanja
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button className="w-full gap-2 bg-gradient-nature text-primary-foreground sm:w-auto">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;

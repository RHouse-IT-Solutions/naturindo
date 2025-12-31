import { Shield, Truck, Headphones, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: '100% Herbal Alami',
    description: 'Terbuat dari bahan-bahan herbal pilihan tanpa efek samping',
  },
  {
    icon: Award,
    title: 'Bersertifikat BPOM',
    description: 'Semua produk telah terdaftar dan teruji oleh BPOM',
  },
  {
    icon: Truck,
    title: 'Pengiriman Cepat',
    description: 'Gratis ongkir untuk pembelian di atas Rp 300.000',
  },
  {
    icon: Headphones,
    title: 'Konsultasi Gratis',
    description: 'Tim ahli siap membantu kebutuhan kesehatan Anda',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Mengapa Memilih Naturindo?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Komitmen kami untuk kesehatan Anda
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-nature text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

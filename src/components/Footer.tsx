import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-nature-900 text-nature-100">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-nature-600">
                <Leaf className="h-5 w-5 text-nature-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-nature-100">
                  NATUR<span className="text-gold-400">INDO</span>
                </span>
                <span className="text-[10px] tracking-wider text-nature-300">
                  The Power of Nature
                </span>
              </div>
            </Link>
            <p className="text-sm text-nature-300">
              Suplemen kesehatan herbal berkualitas tinggi untuk kehidupan yang lebih sehat dan bugar.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-nature-400 transition-colors hover:text-gold-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-nature-400 transition-colors hover:text-gold-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-nature-400 transition-colors hover:text-gold-400">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-nature-100">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {['Beranda', 'Produk', 'Kategori', 'Tentang Kami', 'Kontak'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Beranda' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-nature-300 transition-colors hover:text-gold-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-nature-100">
              Kategori
            </h4>
            <ul className="space-y-2">
              {['Daily Wellness', 'Digestive Balance', 'Herbal Therapy', 'Kids Healthy', "Men's Vitality", "Women's Care"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/products?category=${item.toLowerCase().replace(/['\s]/g, '-')}`}
                    className="text-sm text-nature-300 transition-colors hover:text-gold-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-lg font-semibold text-nature-100">
              Hubungi Kami
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="text-sm text-nature-300">
                  Jl. Herbal Nusantara No. 123, Semarang, Jawa Tengah
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="text-sm text-nature-300">(024) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-gold-400" />
                <span className="text-sm text-nature-300">info@naturindo.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-nature-700 pt-8 text-center">
          <p className="text-sm text-nature-400">
            © {new Date().getFullYear()} Naturindo. All rights reserved. | POM TR Certified
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Leaf, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/products', label: 'Produk' },
    { href: '/categories', label: 'Kategori' },
    { href: '/about', label: 'Tentang Kami' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-bold text-primary">
              NATUR<span className="text-accent">INDO</span>
            </span>
            <span className="text-[10px] tracking-wider text-muted-foreground">
              The Power of Nature
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-sm text-muted-foreground">
                Halo, {user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth" className="hidden md:block">
              <Button variant="default" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Masuk
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border md:hidden"
          >
            <div className="container space-y-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Halo, {user?.name}
                    </p>
                    <Button variant="outline" size="sm" onClick={logout} className="w-full">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full gap-2">
                      <User className="h-4 w-4" />
                      Masuk / Daftar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

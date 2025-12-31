import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { motion } from 'framer-motion';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [sortBy, setSortBy] = useState('featured');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug)
        ? prev.filter((c) => c !== slug)
        : [...prev, slug]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.slug)
      );
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 300000]);
    setSelectedCategories([]);
    setSortBy('featured');
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="mb-3 font-display font-semibold text-foreground">
          Kategori
        </h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.slug}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleCategory(category.slug)}
              />
              <Label
                htmlFor={category.slug}
                className="cursor-pointer text-sm text-muted-foreground"
              >
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3 font-display font-semibold text-foreground">
          Harga
        </h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={300000}
          step={10000}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full gap-2"
      >
        <X className="h-4 w-4" />
        Reset Filter
      </Button>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-gradient-hero py-12">
          <div className="container">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Semua Produk
            </h1>
            <p className="mt-2 text-muted-foreground">
              Temukan suplemen herbal terbaik untuk kesehatan Anda
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Search and Sort Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2 lg:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filter Produk</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Unggulan</SelectItem>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="price-low">Harga: Rendah ke Tinggi</SelectItem>
                  <SelectItem value="price-high">Harga: Tinggi ke Rendah</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filter */}
            <aside className="hidden w-64 flex-shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-6 font-display text-lg font-semibold text-foreground">
                  Filter
                </h3>
                <FilterContent />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Menampilkan {filteredProducts.length} produk
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="text-lg text-muted-foreground">
                    Tidak ada produk yang ditemukan
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="mt-4"
                  >
                    Reset Filter
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;

"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts, formatPrice, type Category, type Product } from "@/lib/shop";

type SortOption = "best" | "cheapest" | "expensive" | "alphabetical";

export function ShopPageView() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  // Filter & Sort State
  const [sortBy, setSortBy] = useState<SortOption>("best");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [maxPriceLimit, setMaxPriceLimit] = useState(10000);

  useEffect(() => {
    async function load() {
      try {
        const [cats, prods] = await Promise.all([getCategories(), getProducts()]);
        setCategories(cats);
        setProducts(prods);
        
        if (prods.length > 0) {
          const max = Math.max(...prods.map(p => p.price_cents / 100));
          setMaxPriceLimit(max);
          setPriceRange([0, max]);
        }
      } catch (err) {
        console.error("Shop load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory) {
      result = result.filter((p) => p.category_id === activeCategory);
    }

    // Stock filter
    if (onlyInStock) {
      result = result.filter((p) => p.stock_quantity > 0);
    }

    // Price filter
    result = result.filter((p) => {
      const price = p.price_cents / 100;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sorting
    switch (sortBy) {
      case "cheapest":
        result.sort((a, b) => a.price_cents - b.price_cents);
        break;
      case "expensive":
        result.sort((a, b) => b.price_cents - a.price_cents);
        break;
      case "alphabetical":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // "best" - keep current order (likely newest or default)
        break;
    }

    return result;
  }, [products, activeCategory, onlyInStock, priceRange, sortBy]);

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b border-black/5 pb-12 pt-24 sm:pb-16 sm:pt-28">
        <div className="site-container">
          <span className="inline-flex bg-neutral-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-black/60">
            E-shop
          </span>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-black">
            Katalóg produktov
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="site-container">
          <div className="flex flex-col gap-10 lg:flex-row">
            
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-0 border border-neutral-100 rounded-lg overflow-hidden">
                
                {/* Price Filter */}
                <div className="border-b border-neutral-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-black">Cena</h3>
                    <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max={maxPriceLimit} 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-black h-1 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs font-medium text-black/50">
                      <span>0 €</span>
                      <span>{Math.round(priceRange[1])} €</span>
                    </div>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="border-b border-neutral-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-black">Štítky</h3>
                    <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                  </div>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 border rounded flex items-center justify-center transition-colors ${onlyInStock ? 'bg-black border-black' : 'border-neutral-200 group-hover:border-black'}`}>
                        {onlyInStock && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={onlyInStock} 
                        onChange={() => setOnlyInStock(!onlyInStock)}
                      />
                      <span className="text-sm font-medium text-black/70 group-hover:text-black">Na sklade</span>
                    </div>
                    <span className="text-[10px] font-bold text-neutral-300 bg-neutral-50 px-1.5 py-0.5 rounded">
                      {products.filter(p => p.stock_quantity > 0).length}
                    </span>
                  </label>
                </div>

                {/* Categories (Simplified in sidebar if needed, but keeping top as well for now) */}
                <div className="p-6">
                  <button className="flex items-center justify-center w-full gap-2 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
                    Rozbaliť filter
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
                  </button>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              
              {/* Category & Sorting Tabs */}
              <div className="mb-8 space-y-6">
                {/* Categories */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategory(null)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                        activeCategory === null
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-black/50 hover:bg-neutral-200"
                      }`}
                    >
                      Všetky
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                          activeCategory === cat.id
                            ? "bg-black text-white"
                            : "bg-neutral-100 text-black/50 hover:bg-neutral-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Sorting Tabs */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-1">
                  <div className="flex">
                    {[
                      { id: "best", label: "Najpredávanejšie" },
                      { id: "cheapest", label: "Najlacnejšie" },
                      { id: "expensive", label: "Najdrahšie" },
                      { id: "alphabetical", label: "Abecedne" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSortBy(opt.id as SortOption)}
                        className={`px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] transition-colors relative ${
                          sortBy === opt.id ? "text-black" : "text-black/30 hover:text-black"
                        }`}
                      >
                        {opt.label}
                        {sortBy === opt.id && <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black" />}
                      </button>
                    ))}
                  </div>
                  <div className="hidden sm:block text-[11px] font-medium text-black/30 tracking-tight">
                    Zobrazených {sortedAndFilteredProducts.length} produktov
                  </div>
                </div>
              </div>

              {/* Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-40">
                  <div className="h-12 w-12 animate-spin rounded-full border-2 border-neutral-200 border-t-black" />
                </div>
              ) : sortedAndFilteredProducts.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-neutral-200 py-32 text-center bg-neutral-50/50">
                  <ArchiveBoxIcon className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
                  <p className="text-sm font-medium text-black/40">
                    Žiadne produkty nespĺňajú vybrané kritériá.
                  </p>
                </div>
              ) : (
                <div className="grid gap-x-0 gap-y-0 border-t border-l border-neutral-100 sm:grid-cols-2 xl:grid-cols-3">
                  {sortedAndFilteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative flex flex-col border-r border-b border-neutral-100 bg-white transition-colors hover:bg-neutral-50/10"
                    >
                      {/* Image Area (Stretched and less tall) */}
                      <div className="relative aspect-[3/2] overflow-hidden border-b border-neutral-50">
                        {product.image_url ? (
                          <Image
                            alt={product.name}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            fill
                            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                            src={product.image_url}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-neutral-100">
                            <ArchiveBoxIcon className="w-20 h-20" />
                          </div>
                        )}
                        
                        {/* Badges Overlay */}
                        {product.stock_quantity > 1000 && (
                          <div className="absolute left-4 top-4 bg-[#e0c060] px-2 py-0.5 text-[10px] font-black uppercase text-white rounded z-10">
                            TOP 1
                          </div>
                        )}
                        
                        {/* Pink Heart Icon inside photo */}
                        <button 
                          onClick={() => toggleFavorite(product.id)}
                          className={`absolute right-3 top-3 p-2 transition-all z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-125 ${
                            favorites.has(product.id) ? 'text-[#ff69b4]' : 'text-white hover:text-[#ff69b4]'
                          }`}
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001z" />
                          </svg>
                        </button>
                      </div>

                      {/* Content Area (More compact) */}
                      <div className="flex flex-col flex-1 p-5 space-y-2">
                        {/* Product Title below photo */}
                        <Link href={`/obchod/${product.slug}`}>
                          <h3 className="font-display text-[17px] font-bold leading-tight text-[#223344] group-hover:underline transition-all text-left">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="mt-auto space-y-3">
                          <div className="flex items-end justify-between pt-1">
                            <div>
                              <p className="font-display text-xl font-black tracking-tight text-black">
                                {formatPrice(product.price_cents, product.currency)}
                              </p>
                              <p className="text-[10px] font-medium text-black/40">
                                {formatPrice(Math.round(product.price_cents / 1.2), product.currency)} bez DPH
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#22aa44]">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"/></svg>
                              Skladom ({product.stock_quantity} ks)
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex gap-2">
                            <div className="flex border border-neutral-100 bg-[#f8f9fa] rounded overflow-hidden">
                              <button className="px-3 py-2 text-neutral-400 hover:text-black transition-colors font-bold text-sm">-</button>
                              <input type="text" defaultValue="1" className="w-10 bg-transparent text-center text-xs font-bold text-black border-none focus:ring-0" />
                              <button className="px-3 py-2 text-neutral-400 hover:text-black transition-colors font-bold text-sm">+</button>
                            </div>
                            <button className="flex-1 bg-[#1a2b3c] py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:bg-black rounded">
                              Do košíka
                            </button>
                          </div>

                          {/* SKU */}
                          <div className="text-center">
                            <p className="text-[9px] font-medium text-black/20 tracking-tighter">
                              Kód: {product.sku || product.id.slice(0, 8).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              )}

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArchiveBoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" />
    </svg>
  );
}


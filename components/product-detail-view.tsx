"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProductBySlug, formatPrice, type Product } from "@/lib/shop";

export function ProductDetailView() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [slug]);

  function addToCart() {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem("vavro-cart") || "[]") as Array<{
      id: string;
      qty: number;
    }>;
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: product.id, qty });
    }
    localStorage.setItem("vavro-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    alert("Produkt bol pridaný do košíka");
  }

  if (loading) {
    return (
      <main className="bg-white">
        <div className="flex min-h-[60vh] items-center justify-center pt-28">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="bg-white">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-28">
          <p className="text-xl text-black/50">Produkt nebol nájdený.</p>
          <Link
            className="inline-flex bg-[var(--color-accent)] px-8 py-3 text-sm font-bold uppercase tracking-wide text-black"
            href="/obchod"
          >
            Späť do obchodu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="pb-20 pt-32 sm:pt-36">
        <div className="site-container">
          <Link
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-black/50 transition-colors hover:text-black"
            href="/obchod"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Späť do obchodu
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100">
                {product.image_url ? (
                  <Image
                    alt={product.name}
                    className="object-cover"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    src={product.image_url}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-black/15">
                    <svg className="h-24 w-24" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                )}
              </div>
              {product.gallery_images && product.gallery_images.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.gallery_images.map((url, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
                      <Image alt={`${product.name} galéria ${idx + 1}`} className="object-cover" fill sizes="(min-width: 1024px) 12vw, 25vw" src={url} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="mt-3 font-display text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-[1] tracking-[-0.04em] text-black">
                {product.name}
              </h1>

              <p className="mt-6 font-display text-4xl font-bold tracking-tight text-black">
                {formatPrice(product.price_cents, product.currency)}
              </p>

              {product.description && (
                <div 
                  className="prose prose-neutral mt-8 max-w-none text-[1.05rem] leading-8 text-black/70 prose-img:my-6 prose-img:max-w-full prose-img:rounded-2xl prose-a:text-[var(--color-accent)]"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              )}

              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-xl font-bold text-black">Technické parametre</h2>
                  <div className="overflow-hidden rounded-xl border border-black/10">
                    <table className="w-full text-left text-sm">
                      <tbody className="divide-y divide-black/10">
                        {product.specifications.map((spec, idx) => (
                          <tr key={idx} className="bg-white even:bg-neutral-50/50">
                            <th className="px-5 py-4 font-semibold text-black">{spec.key}</th>
                            <td className="px-5 py-4 text-black/70">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {product.sku && (
                <p className="mt-4 text-sm text-black/40">SKU: {product.sku}</p>
              )}

              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center overflow-hidden rounded-lg border border-black/10">
                  <button
                    className="px-4 py-3 text-lg font-bold transition-colors hover:bg-black/5"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="min-w-[3rem] text-center font-semibold">{qty}</span>
                  <button
                    className="px-4 py-3 text-lg font-bold transition-colors hover:bg-black/5"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 bg-[var(--color-accent)] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition-transform hover:-translate-y-0.5"
                  onClick={addToCart}
                >
                  Pridať do košíka
                </button>
              </div>

              <p className="mt-4 text-sm text-black/40">
                {product.stock_quantity > 0
                  ? `Skladom: ${product.stock_quantity} ks`
                  : "Na objednávku"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

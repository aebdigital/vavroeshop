"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase, VAVROSTAV_OWNER_ID } from "@/lib/supabase";
import { formatPrice } from "@/lib/shop";

type CartItem = { id: string; qty: number };
type CartProduct = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  price_cents: number;
  currency: string;
  qty: number;
};

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("vavro-cart") || "[]");
}

function writeCart(items: CartItem[]) {
  localStorage.setItem("vavro-cart", JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function CartPageView() {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = useCallback(async () => {
    const cart = readCart();
    if (cart.length === 0) {
      setItems([]);
      setLoading(false);
      return;
    }
    const ids = cart.map((c) => c.id);
    const { data } = await supabase
      .from("ecommerce_products")
      .select("id, name, slug, image_url, price_cents, currency")
      .eq("owner_id", VAVROSTAV_OWNER_ID)
      .in("id", ids);

    const mapped = (data || []).map((p) => {
      const ci = cart.find((c) => c.id === p.id);
      return { ...p, qty: ci?.qty ?? 1 };
    });
    setItems(mapped);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  function updateQty(id: string, delta: number) {
    const cart = readCart();
    const ci = cart.find((c) => c.id === id);
    if (!ci) return;
    ci.qty = Math.max(1, ci.qty + delta);
    writeCart(cart);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: ci.qty } : i)));
  }

  function removeItem(id: string) {
    const cart = readCart().filter((c) => c.id !== id);
    writeCart(cart);
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const total = items.reduce((sum, i) => sum + i.price_cents * i.qty, 0);

  return (
    <main className="bg-white">
      <section className="border-b border-black/10 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="site-container">
          <span className="inline-flex bg-[var(--color-soft)] px-2 py-1 text-sm font-medium uppercase tracking-[0.08em] text-black/80">
            E-shop
          </span>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
            Košík
          </h1>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="site-container">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center gap-6 py-20 text-center">
              <svg className="h-20 w-20 text-black/15" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.5.5-.1 1.4.6 1.4H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-lg text-black/50">Váš košík je prázdny.</p>
              <Link
                className="inline-flex bg-[var(--color-accent)] px-8 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:-translate-y-0.5"
                href="/obchod"
              >
                Prejsť do obchodu
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 rounded-2xl border border-black/8 p-4"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      {item.image_url ? (
                        <Image alt={item.name} className="object-cover" fill sizes="80px" src={item.image_url} />
                      ) : (
                        <div className="flex h-full items-center justify-center text-black/15">
                          <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-black">{item.name}</h3>
                      <p className="text-sm text-black/50">
                        {formatPrice(item.price_cents, item.currency)} / ks
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center overflow-hidden rounded-lg border border-black/10">
                        <button className="px-3 py-2 text-sm font-bold hover:bg-black/5" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="min-w-[2rem] text-center text-sm font-semibold">{item.qty}</span>
                        <button className="px-3 py-2 text-sm font-bold hover:bg-black/5" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                      <p className="min-w-[6rem] text-right font-display text-lg font-bold text-black">
                        {formatPrice(item.price_cents * item.qty, item.currency)}
                      </p>
                      <button className="ml-2 text-black/30 transition-colors hover:text-red-500" onClick={() => removeItem(item.id)}>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-black/8 p-6">
                <h2 className="font-display text-xl font-semibold text-black">Súhrn</h2>
                <div className="mt-6 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-black/60">
                      <span>{item.name} × {item.qty}</span>
                      <span>{formatPrice(item.price_cents * item.qty, item.currency)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-black/10 pt-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-black">Celkom</span>
                    <span className="font-display text-2xl font-bold text-black">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  className="mt-6 flex w-full items-center justify-center bg-[var(--color-accent)] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition-transform hover:-translate-y-0.5"
                  href="/pokladna"
                >
                  Pokračovať k pokladni
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

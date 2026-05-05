"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { supabase, VAVROSTAV_OWNER_ID } from "@/lib/supabase";
import { formatPrice } from "@/lib/shop";

type CartItem = { id: string; qty: number };
type CartProduct = {
  id: string;
  name: string;
  price_cents: number;
  currency: string;
  qty: number;
};

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("vavro-cart") || "[]");
}

export function CheckoutPageView() {
  const [items, setItems] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

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
      .select("id, name, price_cents, currency")
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

  const total = items.reduce((sum, i) => sum + i.price_cents * i.qty, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("ecommerce_orders")
        .insert([
          {
            owner_id: VAVROSTAV_OWNER_ID,
            customer_name: form.name.trim(),
            customer_email: form.email.trim(),
            customer_phone: form.phone.trim() || null,
            customer_address: form.address.trim() || null,
            notes: form.notes.trim() || null,
            status: "new",
            payment_status: "unpaid",
            total_cents: total,
            currency: "EUR",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        unit_price_cents: item.price_cents,
        quantity: item.qty,
        line_total_cents: item.price_cents * item.qty,
      }));

      const { error: itemsError } = await supabase
        .from("ecommerce_order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // TODO: Stripe integration
      // When Stripe is ready, redirect to Stripe Checkout session here:
      // const response = await fetch("/api/checkout", {
      //   method: "POST",
      //   body: JSON.stringify({ orderId: order.id }),
      // });
      // const { url } = await response.json();
      // window.location.href = url;

      // Clear cart
      localStorage.removeItem("vavro-cart");
      window.dispatchEvent(new Event("cart-updated"));
      setSubmitted(true);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Objednávka sa nepodarila. Skúste to znova.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="bg-white">
        <section className="flex min-h-[70vh] items-center justify-center pt-28">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
              <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-semibold text-black">Ďakujeme za objednávku!</h1>
            <p className="mt-3 text-lg text-black/60">Objednávka bola prijatá. Ozveme sa vám čo najskôr.</p>
            <Link
              className="mt-8 inline-flex bg-[var(--color-accent)] px-8 py-3 text-sm font-bold uppercase tracking-wide text-black"
              href="/obchod"
            >
              Späť do obchodu
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <section className="border-b border-black/10 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="site-container">
          <span className="inline-flex bg-[var(--color-soft)] px-2 py-1 text-sm font-medium uppercase tracking-[0.08em] text-black/80">
            E-shop
          </span>
          <h1 className="mt-3 font-display text-[clamp(2.8rem,4vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-black">
            Pokladňa
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
            <div className="flex flex-col items-center gap-6 py-20">
              <p className="text-lg text-black/50">Košík je prázdny.</p>
              <Link className="inline-flex bg-[var(--color-accent)] px-8 py-3 text-sm font-bold uppercase text-black" href="/obchod">
                Do obchodu
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1fr_380px]">
              <div className="space-y-6">
                <h2 className="font-display text-xl font-semibold text-black">Kontaktné údaje</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-semibold text-black/70">Meno a priezvisko *</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-black outline-none transition-colors focus:border-[var(--color-accent)]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-black/70">Email *</span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-black outline-none transition-colors focus:border-[var(--color-accent)]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-semibold text-black/70">Telefón</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-black outline-none transition-colors focus:border-[var(--color-accent)]"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm font-semibold text-black/70">Adresa doručenia</span>
                  <input
                    value={form.address}
                    onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-black outline-none transition-colors focus:border-[var(--color-accent)]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-black/70">Poznámka</span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-black outline-none transition-colors focus:border-[var(--color-accent)]"
                  />
                </label>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  <strong>Platba:</strong> Objednávka bude zaznamenaná ako nezaplatená.
                  Online platba cez Stripe bude dostupná čoskoro.
                </div>
              </div>

              <div className="rounded-2xl border border-black/8 p-6">
                <h2 className="font-display text-xl font-semibold text-black">Súhrn objednávky</h2>
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
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center bg-[var(--color-accent)] px-8 py-4 text-sm font-extrabold uppercase tracking-[0.06em] text-black transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? "Odosielam..." : "Odoslať objednávku"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

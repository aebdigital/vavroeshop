import { supabase, VAVROSTAV_OWNER_ID } from "./supabase";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  image_url: string | null;
  price_cents: number;
  currency: string;
  stock_quantity: number;
  category_id: string | null;
  gallery_images?: string[];
  specifications?: { key: string; value: string }[];
};

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("ecommerce_categories")
    .select("id, name, slug, description, sort_order")
    .eq("owner_id", VAVROSTAV_OWNER_ID)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("ecommerce_products")
    .select(
      "id, name, slug, sku, description, image_url, price_cents, currency, stock_quantity, category_id, gallery_images, specifications"
    )
    .eq("owner_id", VAVROSTAV_OWNER_ID)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("ecommerce_products")
    .select(
      "id, name, slug, sku, description, image_url, price_cents, currency, stock_quantity, category_id, gallery_images, specifications"
    )
    .eq("owner_id", VAVROSTAV_OWNER_ID)
    .eq("is_active", true)
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export function formatPrice(cents: number, currency = "EUR"): string {
  return new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

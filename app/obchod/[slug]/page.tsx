import { PageShell } from "@/components/site-shell";
import { ProductDetailView } from "@/components/product-detail-view";

export const dynamic = "force-dynamic";

export default function ProductPage() {
  return (
    <PageShell>
      <ProductDetailView />
    </PageShell>
  );
}

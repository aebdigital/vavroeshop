import { NextResponse } from "next/server";

/**
 * POST /api/checkout
 *
 * Stripe Checkout Session creation endpoint.
 * When you're ready to integrate Stripe:
 *
 * 1. Install Stripe: npm install stripe
 * 2. Add STRIPE_SECRET_KEY to .env.local
 * 3. Uncomment the Stripe logic below
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // TODO: Uncomment when Stripe is configured
    //
    // import Stripe from "stripe";
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    //
    // // Fetch order items from Supabase to build line_items
    // const { data: order } = await supabase
    //   .from("ecommerce_orders")
    //   .select("*, ecommerce_order_items(*)")
    //   .eq("id", orderId)
    //   .single();
    //
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items: order.ecommerce_order_items.map((item) => ({
    //     price_data: {
    //       currency: "eur",
    //       product_data: { name: item.product_name },
    //       unit_amount: item.unit_price_cents,
    //     },
    //     quantity: item.quantity,
    //   })),
    //   metadata: { order_id: orderId },
    //   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/obchod?success=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/kosik`,
    // });
    //
    // return NextResponse.json({ url: session.url });

    return NextResponse.json({
      message:
        "Stripe is not yet configured. Order was saved with payment_status=unpaid.",
      orderId,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

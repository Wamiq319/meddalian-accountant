import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const { service, customerInfo, formData } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: service.title,
            description: service.description,
          },
          unit_amount: service.price * 100, // Convert to cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/form/${service.id}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/form/${service.id}`,
    customer_email: customerInfo.email,
    metadata: {
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      customerPhone: customerInfo.phone,
      serviceId: service.id,
      serviceTitle: service.title,
      servicePrice: service.price.toString(),
      formData: JSON.stringify(formData),
    },
  });

  return Response.json({ sessionId: session.id });
}

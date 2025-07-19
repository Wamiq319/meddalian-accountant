import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerInfo, service, serviceDetails, sessionId } = body;

    // Validate required fields
    if (!customerInfo || !service || !serviceDetails) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let paymentDetails = null;

    // If sessionId is provided, get payment details from Stripe
    if (sessionId) {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Get the first charge to access payment method details
        const charges = await stripe.charges.list({
          payment_intent: session.payment_intent as string,
          limit: 1,
        });

        paymentDetails = {
          amount: (session.amount_total! / 100).toFixed(2),
          paymentStatus: session.payment_status || "unknown",
          paymentMethod: charges.data[0]?.payment_method_details?.type || "N/A",
          stripeSessionId: sessionId,
          stripePaymentIntent:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id || "",
        };

        // If serviceDetails is empty, try to get it from Stripe metadata
        if (!serviceDetails || Object.keys(serviceDetails).length === 0) {
          const metadata = session.metadata;
          if (metadata?.formData) {
            try {
              const formDataFromStripe = JSON.parse(metadata.formData);
              // Extract service details from form data
              const extractedServiceDetails = { ...formDataFromStripe };
              delete extractedServiceDetails.name;
              delete extractedServiceDetails.company;
              delete extractedServiceDetails.email;
              delete extractedServiceDetails.phone;
              delete extractedServiceDetails.position;

              // Use the extracted data
              Object.assign(serviceDetails, extractedServiceDetails);
            } catch (parseError) {
              console.error(
                "Error parsing form data from Stripe metadata:",
                parseError
              );
            }
          }
        }
      } catch (error) {
        console.error("Error retrieving Stripe session:", error);
        // Continue without payment details if there's an error
      }
    }

    // Send email to admin with payment details if available
    const emailHtml = `
      <h2>New Service Order</h2>
      <h3>Customer Info</h3>
      <ul>
        ${Object.entries(customerInfo)
          .map(([k, v]) => `<li><b>${k}:</b> ${v}</li>`)
          .join("")}
      </ul>
      <h3>Service Info</h3>
      <ul>
        ${Object.entries(serviceDetails)
          .map(([k, v]) => `<li><b>${k}:</b> ${v}</li>`)
          .join("")}
      </ul>
      <h3>Service Summary</h3>
      <ul>
        <li><b>Service:</b> ${service.title}</li>
        <li><b>Price:</b> $${service.price}</li>
      </ul>
      ${
        paymentDetails
          ? `
      <h3>Payment Details</h3>
      <ul>
        <li><b>Amount Paid:</b> $${paymentDetails.amount}</li>
        <li><b>Currency:</b> USD</li>
        <li><b>Status:</b> ${paymentDetails.paymentStatus}</li>
        <li><b>Receipt:</b> <a href="https://dashboard.stripe.com/receipts/${paymentDetails.stripeSessionId}">View Receipt</a></li>
        <li><b>Stripe Session ID:</b> ${paymentDetails.stripeSessionId}</li>
      </ul>
      `
          : ""
      }
    `;

    await sendOrderEmail({
      customerInfo,
      service,
      serviceDetails,
      paymentDetails,
    });

    return NextResponse.json(
      { success: true, message: "Order notification sent to admin" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-order API:", error);
    return NextResponse.json(
      { error: "Failed to send order notification" },
      { status: 500 }
    );
  }
}

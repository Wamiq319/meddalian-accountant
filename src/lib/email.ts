import nodemailer from "nodemailer";
import { Service } from "@/types/service";

// Email transporter configuration for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface OrderData {
  customerInfo: {
    name: string;
    company: string;
    email: string;
    phone: string;
    position: string;
  };
  service: Service;
  serviceDetails: Record<string, string>;
  paymentDetails?: {
    amount: string;
    paymentStatus: string;
    paymentMethod: string;
    stripeSessionId: string;
    stripePaymentIntent: string;
  } | null;
}

export async function sendOrderEmail(orderData: OrderData) {
  const { customerInfo, service, serviceDetails, paymentDetails } = orderData;

  // Debug logging to help identify the issue
  console.log(
    "Email Debug - Customer Info:",
    JSON.stringify(customerInfo, null, 2)
  );
  console.log("Email Debug - Service:", JSON.stringify(service, null, 2));
  console.log(
    "Email Debug - Service Details:",
    JSON.stringify(serviceDetails, null, 2)
  );
  console.log(
    "Email Debug - Payment Details:",
    JSON.stringify(paymentDetails, null, 2)
  );

  // Validate customer info structure
  if (!customerInfo || typeof customerInfo !== "object") {
    console.error("Email Error - Invalid customerInfo:", customerInfo);
    throw new Error("Invalid customer information provided");
  }

  // Ensure all customer info fields exist
  const validatedCustomerInfo = {
    name: customerInfo.name || "Not provided",
    company: customerInfo.company || "Not provided",
    email: customerInfo.email || "Not provided",
    phone: customerInfo.phone || "Not provided",
    position: customerInfo.position || "Not provided",
  };

  console.log(
    "Email Debug - Validated Customer Info:",
    JSON.stringify(validatedCustomerInfo, null, 2)
  );

  // Create HTML email template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #e94e1b, #d13d0e); color: white; padding: 20px; border-radius: 10px; text-align: center; }
        .section { background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; color: #e94e1b; }
        .value { margin-left: 10px; }
        .service-details { background: #fff; padding: 15px; border-left: 4px solid #e94e1b; margin: 10px 0; }
        .price { font-size: 24px; font-weight: bold; color: #e94e1b; text-align: center; margin: 20px 0; }
        .payment-section { background: #e8f5e8; padding: 15px; border-left: 4px solid #28a745; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎯 New Service Order Received</h1>
          <p>MEDALLION Accountant</p>
        </div>
        
        <div class="section">
          <h2>Customer Information</h2>
          <div class="field">
            <span class="label">Name:</span>
            <span class="value">${customerInfo.name}</span>
          </div>
          <div class="field">
            <span class="label">Company:</span>
            <span class="value">${customerInfo.company}</span>
          </div>
          <div class="field">
            <span class="label">Email:</span>
            <span class="value">${customerInfo.email}</span>
          </div>
          <div class="field">
            <span class="label">Phone:</span>
            <span class="value">${customerInfo.phone}</span>
          </div>
          <div class="field">
            <span class="label">Position:</span>
            <span class="value">${customerInfo.position}</span>
          </div>
        </div>

        <div class="section">
          <h2>Service Details</h2>
          <div class="service-details">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="price">$${service.price}</div>
          </div>
          
          <h3>Service Requirements:</h3>
          ${Object.entries(serviceDetails)
            .map(
              ([key, value]) => `
            <div class="field">
              <span class="label">${key
                .replace(/([A-Z])/g, " $1")
                .trim()}:</span>
              <span class="value">${
                key.toLowerCase().includes("amount") ||
                key.toLowerCase().includes("revenue") ||
                key.toLowerCase().includes("income") ||
                key.toLowerCase().includes("turnover") ||
                key.toLowerCase().includes("asset")
                  ? `$${value}`
                  : value
              }</span>
            </div>
          `
            )
            .join("")}
        </div>

        ${
          paymentDetails
            ? `
        <div class="section">
          <h2>Payment Information</h2>
          <div class="payment-section">
            <div class="field">
              <span class="label">Amount Paid:</span>
              <span class="value">$${paymentDetails.amount}</span>
            </div>
            <div class="field">
              <span class="label">Payment Status:</span>
              <span class="value">${
                paymentDetails.paymentStatus === "paid"
                  ? "✅ Paid"
                  : paymentDetails.paymentStatus
              }</span>
            </div>
            <div class="field">
              <span class="label">Payment Method:</span>
              <span class="value">${
                paymentDetails.paymentMethod === "card"
                  ? "💳 Credit/Debit Card"
                  : paymentDetails.paymentMethod
              }</span>
            </div>
            <div class="field">
              <span class="label">Transaction ID:</span>
              <span class="value">${paymentDetails.stripeSessionId}</span>
            </div>
            <div class="field">
              <span class="label">Payment Date:</span>
              <span class="value">${new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        `
            : ""
        }

        <div class="section">
          <h2>Next Steps</h2>
          <ul>
            <li>Review the customer requirements</li>
            <li>Contact the customer within 24 hours</li>
            <li>Send confirmation email to customer</li>
            <li>Begin service preparation</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
          <p>This email was sent from MEDALLION Accountant service form</p>
          <p>Order received at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Email options
  const mailOptions = {
    from: process.env.ADMIN_EMAIL, // Use your Gmail as sender
    to: process.env.ADMIN_EMAIL, // Send to yourself
    subject: `New Order: ${service.title} - ${customerInfo.company}${
      paymentDetails ? " (PAID)" : ""
    }`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Order email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending order email:", error);
    throw new Error("Failed to send order email");
  }
}

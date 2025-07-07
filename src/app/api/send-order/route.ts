import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerInfo, service, serviceDetails } = body;

    // Validate required fields
    if (!customerInfo || !service || !serviceDetails) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email to admin only
    await sendOrderEmail({ customerInfo, service, serviceDetails });

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

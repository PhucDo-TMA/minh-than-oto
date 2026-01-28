import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const body: ContactFormData = await req.json();

    const { name, phone, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email to admin
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "dohuuphuc5678@gmail.com",
      subject: `Liên hệ mới: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Thông tin liên hệ từ khách hàng</h2>
          
          <div style="background: #f5f7fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Tên:</strong> ${name}</p>
            <p><strong>Số điện thoại:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Chủ đề:</strong> ${subject}</p>
          </div>

          <div style="background: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <h3>Nội dung:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">Email được gửi tự động từ trang liên hệ Minh Thân Ô Tô</p>
        </div>
      `,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

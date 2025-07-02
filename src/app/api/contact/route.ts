import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
        pass: process.env.NEXT_PUBLIC_SUPPORT_EMAIL_PASS,
      },
    });

    // email content
    const mailOptions = {
      from: `"SaveRush Support" <${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>`,
      to: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
      replyTo: email,
      subject: `New Contact Message: ${subject}`,
      text: `You have received a new message from SaveRush contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email." },
      { status: 500 }
    );
  }
}

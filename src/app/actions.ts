"use server";

import { z } from 'zod';
import { contactFormSchema } from '@/lib/schemas';
import nodemailer from 'nodemailer';

export type FormState = {
  message: string;
  status: 'success' | 'error' | 'idle';
  fields?: Record<string, string>;
  issues?: string[];
};

export async function submitContactForm(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data.",
      status: 'error',
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { name, email, phone, message } = parsed.data;

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`, // sender address
    to: 'brolyticstechnologies@gmail.com',
    subject: `New Contact Form Submission from ${name}`, // Subject line
    text: `You have received a new message from your website contact form.

Here are the details:
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message:
${message}
`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <hr>
      <h3>Message:</h3>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      message: "Thank you for your inquiry! We will get back to you soon.",
      status: 'success',
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      message: "Something went wrong. Please try again later.",
      status: 'error',
    };
  }
}

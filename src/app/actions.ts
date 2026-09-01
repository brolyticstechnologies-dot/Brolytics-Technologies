"use server";

import { z } from 'zod';
import { contactFormSchema } from '@/lib/schemas';
import nodemailer from 'nodemailer';
import { insertContactSubmission } from '@/lib/supabase';

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

  const { name, email, phone, message } = parsed.data;

  // 1. Save submission into Supabase Database
  await insertContactSubmission({
    name,
    email,
    phone,
    message,
  });

  // 2. If SMTP is configured, attempt sending email notification
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: 'brolyticstechnologies@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage:\n${message}`,
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

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.warn("Email sending failed, but lead was saved in Supabase:", emailErr);
    }
  }

  return {
    message: "Thank you for reaching out to Brolytics Technologies! We will get back to you shortly.",
    status: 'success',
  };
}

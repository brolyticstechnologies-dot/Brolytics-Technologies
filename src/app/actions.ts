"use server";

import { z } from 'zod';
import { contactFormSchema } from '@/lib/schemas';
import nodemailer from 'nodemailer';
import { insertContactSubmission, insertSlotBooking } from '@/lib/supabase';

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

  // 1. Save submission into Supabase Database (Guaranteed lead persistence)
  await insertContactSubmission({
    name,
    email,
    phone,
    message,
  });

  // 2. If SMTP is configured, send instant email notification to Brolytics
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass.replace(/\s+/g, ''),
        },
      });

      const targetEmail = process.env.NOTIFICATION_EMAIL || 'brolyticstechnologies@gmail.com';

      const mailOptions = {
        from: `"Brolytics Web Lead" <${smtpUser}>`,
        replyTo: email,
        to: targetEmail,
        subject: `🚀 [New Lead] Inquiry from ${name} - ${phone || email}`,
        text: `New website inquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
            <div style="background: #8F2647; color: #ffffff; padding: 16px; border-radius: 8px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">🚀 New Client Inquiry — Brolytics Website</h2>
            </div>
            <div style="padding: 20px 0;">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>📞 Phone / WhatsApp:</strong> <a href="tel:${phone || ''}">${phone || 'Not provided'}</a></p>
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;">
              <h4 style="color: #8F2647; margin-bottom: 8px;">📝 Client Message:</h4>
              <p style="background: #f8fafc; padding: 14px; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #1e293b;">${message}</p>
            </div>
            <div style="text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <a href="mailto:${email}" style="background: #8F2647; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">Reply to Email</a>
              ${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Chat on WhatsApp</a>` : ''}
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.warn("Email dispatch failed (lead is safely recorded in Supabase):", emailErr);
    }
  }

  return {
    message: "Thank you for reaching out to Brolytics Technologies! We will get back to you shortly.",
    status: 'success',
  };
}

export interface SlotBookingInput {
  name: string;
  email: string;
  phone: string;
  service: string;
  booking_date: string;
  booking_time: string;
  meeting_mode: string;
  notes?: string;
}

export async function submitSlotBooking(data: SlotBookingInput): Promise<{
  success: boolean;
  message: string;
}> {
  if (!data.name || !data.email || !data.phone || !data.booking_date || !data.booking_time) {
    return {
      success: false,
      message: 'Please fill all required fields (Name, Email, Phone, Date, Time Slot).',
    };
  }

  // 1. Save to Supabase Database
  await insertSlotBooking(data);

  // 2. Send instant email notification to Brolytics
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_PASS;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass.replace(/\s+/g, ''),
        },
      });

      const targetEmail = process.env.NOTIFICATION_EMAIL || 'brolyticstechnologies@gmail.com';

      const mailOptions = {
        from: `"Brolytics Slot Booking" <${smtpUser}>`,
        replyTo: data.email,
        to: targetEmail,
        subject: `📅 [Meeting Booked] ${data.name} booked ${data.service} on ${data.booking_date} at ${data.booking_time}`,
        text: `New meeting slot booking:\n\nClient: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nDate: ${data.booking_date}\nTime: ${data.booking_time}\nMode: ${data.meeting_mode}\nNotes: ${data.notes || 'None'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <div style="background: #8F2647; color: #ffffff; padding: 18px; border-radius: 8px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px;">📅 New Strategy Meeting Booked!</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">A client has scheduled a consultation call on Brolytics</p>
            </div>
            
            <div style="padding: 20px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 40%;">🗓️ Preferred Date:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.booking_date}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">⏰ Time Slot:</td>
                  <td style="padding: 10px 0; color: #8F2647; font-weight: bold;">${data.booking_time} (IST)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">💻 Service Requirement:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.service}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">🎥 Meeting Mode:</td>
                  <td style="padding: 10px 0; color: #0f172a;">${data.meeting_mode}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">👤 Client Name:</td>
                  <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">📧 Email:</td>
                  <td style="padding: 10px 0;"><a href="mailto:${data.email}" style="color: #8F2647;">${data.email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b; font-weight: bold;">📞 Phone / WhatsApp:</td>
                  <td style="padding: 10px 0;"><a href="tel:${data.phone}" style="color: #8F2647; font-weight: bold;">${data.phone}</a></td>
                </tr>
              </table>

              ${data.notes ? `
                <div style="margin-top: 16px;">
                  <p style="color: #64748b; font-weight: bold; margin-bottom: 6px;">📝 Project Brief / Notes:</p>
                  <p style="background: #f8fafc; padding: 12px; border-radius: 6px; font-size: 13px; color: #334155; margin: 0;">${data.notes}</p>
                </div>
              ` : ''}
            </div>

            <div style="text-align: center; margin-top: 10px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
              <a href="tel:${data.phone}" style="background: #8F2647; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 8px; font-size: 13px;">Call Client</a>
              <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20booking%20a%20strategy%20call%20with%20Brolytics%20Technologies." style="background: #25D366; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 13px;">Open WhatsApp Chat</a>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.warn("Slot booking email error (booking saved in Supabase):", emailErr);
    }
  }

  return {
    success: true,
    message: `Meeting successfully booked for ${data.booking_date} at ${data.booking_time}! Our team will send a Google Meet link and confirm on your WhatsApp/Phone shortly.`,
  };
}


import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;
const adminEmail = process.env.ADMIN_EMAIL;

if (!apiKey) {
  throw new Error(
    "RESEND_API_KEY is not configured.",
  );
}

if (!emailFrom) {
  throw new Error(
    "EMAIL_FROM is not configured.",
  );
}

if (!adminEmail) {
  throw new Error(
    "ADMIN_EMAIL is not configured.",
  );
}

export const resend = new Resend(apiKey);

export const EMAIL_FROM: string = emailFrom;

export const ADMIN_EMAIL: string = adminEmail;
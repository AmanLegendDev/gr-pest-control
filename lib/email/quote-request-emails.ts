import {
  resend,
  EMAIL_FROM,
  ADMIN_EMAIL,
} from "./resend";

export interface QuoteEmailData {
  id: string;
  referenceNumber: string;

  customer: {
    name: string;
    phone: string;
    email: string;
  };

  service: {
    title: string;
  };

  propertyType: string;

  location: {
    suburb: string;
    address: string;
  };

  pestProblem: string;

  preferredDate: string;
  preferredTime: string;

  createdAt?: Date | string;
}

/* =========================================================
   HELPERS
========================================================= */

function escapeHtml(
  value: string,
): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(
  value?: Date | string,
): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-AU",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(date);
}

/* =========================================================
   SHARED EMAIL STYLE
========================================================= */

function emailShell(
  content: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>GR Pest Control</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#f8fafc;
  font-family:Arial,Helvetica,sans-serif;
  color:#0f172a;
">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr>
<td align="center" style="padding:40px 16px;">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    max-width:620px;
    background:#ffffff;
    border-radius:16px;
    overflow:hidden;
    border:1px solid #e2e8f0;
  "
>

<tr>
<td style="
  padding:28px 32px;
  background:#062B63;
  color:#ffffff;
">

<div style="
  font-size:20px;
  font-weight:700;
">
GR Pest Control
</div>

<div style="
  margin-top:5px;
  font-size:13px;
  color:#bfdbfe;
">
Professional Pest Control Services
</div>

</td>
</tr>

<tr>
<td style="padding:32px;">

${content}

</td>
</tr>

<tr>
<td style="
  padding:22px 32px;
  background:#f8fafc;
  border-top:1px solid #e2e8f0;
  font-size:12px;
  line-height:20px;
  color:#64748b;
">

GR Pest Control<br />
Professional pest control services

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

/* =========================================================
   ADMIN — NEW REQUEST
========================================================= */

export async function sendNewQuoteRequestEmails(
  quote: QuoteEmailData,
) {
  const adminHtml =
    emailShell(`
      <h1 style="
        margin:0 0 8px;
        font-size:24px;
        color:#062B63;
      ">
        New Quote Request
      </h1>

      <p style="
        margin:0 0 24px;
        color:#64748b;
        line-height:24px;
      ">
        A new quote request has been submitted
        through the GR Pest Control website.
      </p>

      <div style="
        padding:16px;
        background:#eff6ff;
        border-radius:12px;
        margin-bottom:24px;
      ">
        <div style="
          font-size:12px;
          color:#64748b;
        ">
          Request Reference
        </div>

        <div style="
          margin-top:4px;
          font-size:22px;
          font-weight:700;
          color:#0878E8;
        ">
          ${escapeHtml(quote.referenceNumber)}
        </div>
      </div>

      ${detailRow(
        "Customer",
        quote.customer.name,
      )}

      ${detailRow(
        "Phone",
        quote.customer.phone,
      )}

      ${detailRow(
        "Email",
        quote.customer.email ||
          "Not provided",
      )}

      ${detailRow(
        "Service",
        quote.service.title,
      )}

      ${detailRow(
        "Property Type",
        quote.propertyType,
      )}

      ${detailRow(
        "Suburb",
        quote.location.suburb,
      )}

      ${detailRow(
        "Address",
        quote.location.address,
      )}

      ${detailRow(
        "Preferred Date",
        quote.preferredDate,
      )}

      ${detailRow(
        "Preferred Time",
        quote.preferredTime,
      )}

      <div style="
        margin-top:20px;
        padding:16px;
        background:#f8fafc;
        border-radius:12px;
      ">

        <div style="
          font-size:12px;
          color:#64748b;
        ">
          Pest Problem
        </div>

        <div style="
          margin-top:7px;
          font-size:14px;
          line-height:22px;
          color:#334155;
        ">
          ${escapeHtml(quote.pestProblem)}
        </div>

      </div>

      <p style="
        margin:24px 0 0;
        font-size:12px;
        color:#94a3b8;
      ">
        Received: ${formatDate(quote.createdAt)}
      </p>
    `);

  const customerHtml =
    emailShell(`
      <h1 style="
        margin:0 0 8px;
        font-size:24px;
        color:#062B63;
      ">
        Request Received
      </h1>

      <p style="
        margin:0 0 22px;
        font-size:15px;
        line-height:25px;
        color:#475569;
      ">
        Hi ${escapeHtml(quote.customer.name)},
      </p>

      <p style="
        margin:0 0 24px;
        font-size:15px;
        line-height:25px;
        color:#475569;
      ">
        Thanks for contacting GR Pest Control.
        We have successfully received your quote
        request. Our team will review your details
        and contact you regarding the next step.
      </p>

      <div style="
        padding:18px;
        background:#eff6ff;
        border-radius:12px;
        text-align:center;
        margin-bottom:24px;
      ">

        <div style="
          font-size:12px;
          color:#64748b;
        ">
          Your Request Reference
        </div>

        <div style="
          margin-top:6px;
          font-size:25px;
          font-weight:700;
          color:#0878E8;
        ">
          ${escapeHtml(quote.referenceNumber)}
        </div>

      </div>

      ${detailRow(
        "Service",
        quote.service.title,
      )}

      ${detailRow(
        "Preferred Date",
        quote.preferredDate,
      )}

      ${detailRow(
        "Preferred Time",
        quote.preferredTime,
      )}

      <p style="
        margin:24px 0 0;
        font-size:14px;
        line-height:22px;
        color:#64748b;
      ">
        Please keep your reference number
        <strong>
          ${escapeHtml(quote.referenceNumber)}
        </strong>
        for future communication.
      </p>
    `);

  const results = await Promise.allSettled([
    resend.emails.send(
      {
        from: EMAIL_FROM,
        to: [ADMIN_EMAIL],
        subject:
          `New Quote Request — ${quote.referenceNumber}`,
        html: adminHtml,
        replyTo:
          quote.customer.email || undefined,
        tags: [
          {
            name: "event",
            value: "quote-request-created",
          },
          {
            name: "reference",
            value: quote.referenceNumber,
          },
        ],
      },
      {
        idempotencyKey:
          `quote-request-admin/${quote.id}`,
      },
    ),

    quote.customer.email
      ? resend.emails.send(
          {
            from: EMAIL_FROM,
            to: [quote.customer.email],
            subject:
              `Your Quote Request — ${quote.referenceNumber}`,
            html: customerHtml,
            tags: [
              {
                name: "event",
                value: "quote-request-created",
              },
              {
                name: "reference",
                value: quote.referenceNumber,
              },
            ],
          },
          {
            idempotencyKey:
              `quote-request-customer/${quote.id}`,
          },
        )
      : Promise.resolve(null),
  ]);

  return results;
}

/* =========================================================
   CUSTOMER — CANCELLED
========================================================= */

export async function sendQuoteCancelledEmail(
  quote: QuoteEmailData,
) {
  if (!quote.customer.email) {
    return null;
  }

  const html =
    emailShell(`
      <h1 style="
        margin:0 0 8px;
        font-size:24px;
        color:#062B63;
      ">
        Quote Request Update
      </h1>

      <p style="
        font-size:15px;
        line-height:25px;
        color:#475569;
      ">
        Hi ${escapeHtml(quote.customer.name)},
      </p>

      <p style="
        font-size:15px;
        line-height:25px;
        color:#475569;
      ">
        We’re writing to let you know that your
        quote request has been cancelled.
      </p>

      <div style="
        padding:18px;
        background:#fff7ed;
        border:1px solid #fed7aa;
        border-radius:12px;
        margin:24px 0;
      ">

        <div style="
          font-size:12px;
          color:#9a3412;
        ">
          Request Reference
        </div>

        <div style="
          margin-top:6px;
          font-size:22px;
          font-weight:700;
          color:#c2410c;
        ">
          ${escapeHtml(quote.referenceNumber)}
        </div>

      </div>

      <p style="
        font-size:14px;
        line-height:23px;
        color:#64748b;
      ">
        If you believe this was cancelled in error,
        please contact our team and mention your
        reference number.
      </p>
    `);

  return resend.emails.send(
    {
      from: EMAIL_FROM,
      to: [quote.customer.email],
      subject:
        `Quote Request Cancelled — ${quote.referenceNumber}`,
      html,
      tags: [
        {
          name: "event",
          value: "quote-request-cancelled",
        },
        {
          name: "reference",
          value: quote.referenceNumber,
        },
      ],
    },
    {
      idempotencyKey:
        `quote-request-cancelled/${quote.id}`,
    },
  );
}

/* =========================================================
   CUSTOMER — COMPLETED
========================================================= */

export async function sendQuoteCompletedEmail(
  quote: QuoteEmailData,
) {
  if (!quote.customer.email) {
    return null;
  }

  const html =
    emailShell(`
      <h1 style="
        margin:0 0 8px;
        font-size:24px;
        color:#062B63;
      ">
        Quote Request Completed
      </h1>

      <p style="
        font-size:15px;
        line-height:25px;
        color:#475569;
      ">
        Hi ${escapeHtml(quote.customer.name)},
      </p>

      <p style="
        font-size:15px;
        line-height:25px;
        color:#475569;
      ">
        Your quote request has now been marked
        as completed by our team.
      </p>

      <div style="
        padding:18px;
        background:#f0fdf4;
        border:1px solid #bbf7d0;
        border-radius:12px;
        margin:24px 0;
      ">

        <div style="
          font-size:12px;
          color:#166534;
        ">
          Request Reference
        </div>

        <div style="
          margin-top:6px;
          font-size:22px;
          font-weight:700;
          color:#15803d;
        ">
          ${escapeHtml(quote.referenceNumber)}
        </div>

      </div>

      <p style="
        font-size:14px;
        line-height:23px;
        color:#64748b;
      ">
        Thank you for choosing GR Pest Control.
        If you need anything else, please contact
        our team.
      </p>
    `);

  return resend.emails.send(
    {
      from: EMAIL_FROM,
      to: [quote.customer.email],
      subject:
        `Quote Request Completed — ${quote.referenceNumber}`,
      html,
      tags: [
        {
          name: "event",
          value: "quote-request-completed",
        },
        {
          name: "reference",
          value: quote.referenceNumber,
        },
      ],
    },
    {
      idempotencyKey:
        `quote-request-completed/${quote.id}`,
    },
  );
}

/* =========================================================
   DETAIL ROW
========================================================= */

function detailRow(
  label: string,
  value: string,
) {
  return `
    <div style="
      padding:12px 0;
      border-bottom:1px solid #f1f5f9;
    ">

      <div style="
        font-size:11px;
        text-transform:uppercase;
        letter-spacing:.04em;
        color:#94a3b8;
      ">
        ${escapeHtml(label)}
      </div>

      <div style="
        margin-top:4px;
        font-size:14px;
        line-height:21px;
        color:#334155;
      ">
        ${escapeHtml(value)}
      </div>

    </div>
  `;
}
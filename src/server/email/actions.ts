"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactFormSchema = z.object({
  user_name: z.string().min(1, "Name is required"),
  user_email: z.string().email("Invalid email address"),
  user_company_name: z.string().min(1, "Company name is required"),
  user_message: z.string().min(1, "Message is required"),
  user_agent: z.string().optional(),
  browser_name: z.string().optional(),
  device_family: z.string().optional(),
  browser_family: z.string().optional(),
});

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export async function submitContactForm(formData: ContactFormInputs) {
  const senderSubjectPreview = [
    formData.user_name || null,
    formData.user_company_name || null,
  ]
    .filter(Boolean)
    .join(": ");

  const headersList = await headers();
  console.log(headersList);

  const { data, error } = await resend.emails.send({
    from: "Form Submission <form-submission@prostacklabs.com>",
    to: ["nidhi@prostacklabs.com", "pranav@prostacklabs.com"],
    subject: `New Form Submission: ${senderSubjectPreview}`,
    react: ContactUsRequestTemplate({
      ...formData,
      metadata: {
        ip: headersList.get("x-forwarded-for") ?? undefined,
        user_agent: headersList.get("user-agent") ?? undefined,
        referer: headersList.get("referer") ?? undefined,
        host: headersList.get("host") ?? undefined,
        accept: headersList.get("accept") ?? undefined,
      },
    }),
  });

  if (error) {
    console.error(`Failed to send email:`, JSON.stringify(error));
    return { success: false, error: "Failed to send email" };
  }

  console.log(`Email sent successfully:`, JSON.stringify(data));

  return { success: true };
}

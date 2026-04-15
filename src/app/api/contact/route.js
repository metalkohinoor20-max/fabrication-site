import { sendCapiLead } from "@/lib/capi";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Handle both contact form submissions and button clicks

    await sendCapiLead({
      phone: body.phone, // May be empty for button clicks
      event: "Lead",
      source: body.source || "contact_form", // Button name or "contact_form"
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false });
  }
}
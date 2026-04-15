import crypto from "crypto";

export async function sendCapiLead(data) {
  try {
    const hashedEmail = data.email
      ? crypto.createHash("sha256").update(data.email.trim().toLowerCase()).digest("hex")
      : undefined;

    const hashedPhone = data.phone
      ? crypto.createHash("sha256").update(data.phone.trim()).digest("hex")
      : undefined;

    // ⚠️ Facebook requires at least one customer data field (email or phone)
    // Skip CAPI for events without customer data (e.g., button clicks)
    if (!hashedEmail && !hashedPhone) {
      console.log("📊 Button Click Tracked (no CAPI):", { source: data.source });
      return;
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              event_name: data.event || "Lead", // Lead / Contact
              event_time: Math.floor(Date.now() / 1000),
              action_source: "website",
              event_source_url: "https://metalkohinoor.com",

              user_data: {
                em: hashedEmail ? [hashedEmail] : undefined,
                ph: hashedPhone ? [hashedPhone] : undefined,
              },

              custom_data: {
                source: data.source || "website",
              },
            },
          ],
          access_token: process.env.META_CAPI_TOKEN,
        }),
      }
    );

    const result = await response.json();
    console.log("✅ CAPI Lead Sent:", result);
  } catch (err) {
    console.error("❌ CAPI Error:", err);
  }
}
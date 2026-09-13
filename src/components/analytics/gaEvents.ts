export type LeadEventName =
  | "contact_form_submit"
  | "contact_email_click"
  | "contact_phone_click"
  | "contact_whatsapp_click"
  | "contact_telegram_click";

type LeadEventParams = {
  contact_method?: string;
  link_url?: string;
  form_location?: string;
  selected_services?: string;
  selected_budget?: string;
  source_page?: string;
  lead_id?: string;
};

export const trackLeadEvent = (
  eventName: LeadEventName,
  params: LeadEventParams = {},
) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    event_category: "lead",
    ...params,
  });
};

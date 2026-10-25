// Shared Supabase row/insert types.
//
// Column shapes mirror supabase/migrations/001_tables.sql (the live schema,
// verified 2026-10-25). Every table id is a UUID (string). Money is whole INR
// integers. Keep this file in sync with 001_tables.sql when columns change.

export type BillingType = 'one_time' | 'monthly';

export type EnquiryStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export type WorkType = 'client' | 'portfolio';

export type AdminRole = 'owner' | 'editor';

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Single TEXT line; the delimiter inside it is content-owned, not structural. */
  includes: string;
  excludes: string;
  delivery_time: string;
  billing_type: BillingType;
  base_price: number;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceOption {
  id: string;
  service_id: string;
  option_name: string;
  description: string;
  extra_price: number;
}

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  fixed_price: number;
  guarantee_text: string;
  is_active: boolean;
}

export interface Work {
  id: string;
  title: string;
  work_type: WorkType;
  client_name: string;
  description: string;
  image_url: string;
  link: string;
  is_shown: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  business_name: string;
  text: string;
  rating: number | null;
  is_shown: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  is_shown: boolean;
  sort_order: number;
}

export interface SiteContent {
  id: string;
  section: string;
  title: string;
  body: string;
  is_shown: boolean;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
}

export interface Enquiry {
  id: string;
  name: string;
  business_name: string;
  phone: string;
  email: string;
  service_interest: string;
  message: string;
  source: string;
  quote_id: string | null;
  status: EnquiryStatus;
  notes: string;
  follow_up_date: string | null;
  created_at: string;
}

export interface Quote {
  id: string;
  enquiry_id: string | null;
  total_one_time: number;
  total_monthly: number;
  ad_spend_estimate: number;
  items_summary: string;
  whatsapp_sent: boolean;
  created_at: string;
}

export interface QuoteItem {
  id: string;
  quote_id: string;
  service_id: string | null;
  option_id: string | null;
  price: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

// Settings keys the app reads from the settings table.
export const SETTING_KEYS = [
  'whatsapp_number',
  'email',
  'advance_percent',
  'guarantee_text',
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];

export interface AppSettings {
  whatsapp_number: string;
  email: string;
  advance_percent: number;
  guarantee_text: string;
}

// Insert payloads (columns the public site is allowed to write).
export type NewEnquiry = Pick<
  Enquiry,
  'name' | 'business_name' | 'phone' | 'email' | 'service_interest' | 'message' | 'source'
>;

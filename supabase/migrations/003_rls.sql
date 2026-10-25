-- ReddyStack migration 003: RLS policies
-- RLS is ON for all tables (Supabase default) with zero policies, which blocks
-- even public reads. This file opens exactly what build 1 needs:
--   * public (anon) reads of catalogue/content tables,
--   * public inserts for enquiries/quotes/quote_items,
--   * full CRUD for the logged-in owner only.
--
-- Owner gate: an authenticated user only gets write access when their email
-- exists in admin_users with role 'owner'. The owner must create his own Auth
-- user (Supabase dashboard -> Authentication) and insert his admin_users row
-- via the dashboard SQL editor BEFORE this policy grants him access, e.g.:
--   insert into admin_users (name, email, role)
--   values ('Rahul Reddy Adelli', 'thereddystack@gmail.com', 'owner');
--
-- Apply via Supabase dashboard -> SQL editor (paste whole file, Run), or
-- `supabase db push`. Safe to re-run (DROP ... IF EXISTS guards).

-- Helper: is the current authenticated user the owner? SECURITY DEFINER lets it
-- read admin_users regardless of RLS, so there is no recursion.
create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from admin_users
    where lower(email) = lower(auth.jwt() ->> 'email')
      and role = 'owner'
  );
$$;

-- 0. Table-level grants. Supabase usually applies these via default privileges,
--    but the tables were created by raw SQL, so grant explicitly so the roles
--    can reach them before RLS policies decide the rows.
grant select on public.services, public.service_options, public.bundles, public.works, public.faqs, public.site_content, public.settings to anon, authenticated;
grant insert on public.enquiries, public.quotes, public.quote_items to anon, authenticated;
grant select, insert, update, delete on public.services, public.service_options, public.bundles, public.enquiries, public.quotes, public.quote_items, public.clients, public.orders, public.client_reports, public.works, public.testimonials, public.faqs, public.site_content, public.pages_seo, public.keywords, public.stats_daily, public.settings, public.admin_users to authenticated;

-- 1. Public reads (anon + authenticated). is_active/is_shown keep hidden rows
--    private; the owner still sees everything through the owner_all policy.
drop policy if exists "public_read_services" on "public"."services";
create policy "public_read_services" on "public"."services" for select to anon, authenticated using (is_active = true);

drop policy if exists "public_read_service_options" on "public"."service_options";
create policy "public_read_service_options" on "public"."service_options" for select to anon, authenticated using (true);

drop policy if exists "public_read_bundles" on "public"."bundles";
create policy "public_read_bundles" on "public"."bundles" for select to anon, authenticated using (is_active = true);

drop policy if exists "public_read_works" on "public"."works";
create policy "public_read_works" on "public"."works" for select to anon, authenticated using (is_shown = true);

drop policy if exists "public_read_faqs" on "public"."faqs";
create policy "public_read_faqs" on "public"."faqs" for select to anon, authenticated using (is_shown = true);

drop policy if exists "public_read_site_content" on "public"."site_content";
create policy "public_read_site_content" on "public"."site_content" for select to anon, authenticated using (is_shown = true);

drop policy if exists "public_read_settings" on "public"."settings";
create policy "public_read_settings" on "public"."settings" for select to anon, authenticated using (true);

-- 2. Public inserts: enquiry + quote submission from the site/calculator.
drop policy if exists "public_insert_enquiries" on "public"."enquiries";
create policy "public_insert_enquiries" on "public"."enquiries" for insert to anon, authenticated with check (true);

drop policy if exists "public_insert_quotes" on "public"."quotes";
create policy "public_insert_quotes" on "public"."quotes" for insert to anon, authenticated with check (true);

drop policy if exists "public_insert_quote_items" on "public"."quote_items";
create policy "public_insert_quote_items" on "public"."quote_items" for insert to anon, authenticated with check (true);

-- 3. Owner full access on every app table (gated by is_owner()).
do $$
declare t text;
begin
  foreach t in array array['services','service_options','bundles','enquiries','quotes','quote_items','clients','orders','client_reports','works','testimonials','faqs','site_content','pages_seo','keywords','stats_daily','settings','admin_users'] loop
    execute format('drop policy if exists owner_all on %I', t);
    execute format('create policy owner_all on %I for all to authenticated using (public.is_owner()) with check (public.is_owner())', t);
  end loop;
end $$;

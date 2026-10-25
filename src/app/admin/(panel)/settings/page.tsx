import SettingsEditor from '@/components/admin/SettingsEditor';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { DEFAULT_SETTINGS, getSettings } from '@/lib/settings';

export const dynamic = 'force-dynamic';

const SettingsAdminPage = async () => {
  const client = await createSupabaseServerClient();
  const settings = await getSettings(client);

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Settings</h1>
        <p className="mt-1 text-muted-foreground">Contact details, advance percentage and guarantee text.</p>
      </div>
      <SettingsEditor settings={settings ?? DEFAULT_SETTINGS} />
    </div>
  );
};

export default SettingsAdminPage;

import "@/styles/legacy.scss";
import ThemeProvider from "@/components/provider/ThemeProvider";
import { VideoProvider } from "@/provider/VideoProvider";

// TEMPORARY during the redesign: template pages not yet rebuilt on the new system.
// Only this group loads the template CSS, so it cannot collide with Tailwind elsewhere.
export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <VideoProvider>{children}</VideoProvider>
    </ThemeProvider>
  );
}

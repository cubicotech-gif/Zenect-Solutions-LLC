import TopBar from "@/components/layout/TopBar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

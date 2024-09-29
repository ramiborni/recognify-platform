import { SiteFooter } from "@/components/layout/site-footer";

interface InviteLayoutProps {
  children: React.ReactNode;
}

export default function InviteLayout({ children }: InviteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <main className="flex w-full flex-1 items-center justify-center">{children}</main>
    </div>
  );
}
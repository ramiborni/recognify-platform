import { Icons } from "@/components/shared/icons";

export default function DashboardLoading() {
  return (
    <>
      <div className="flex min-h-screen -mt-12 items-center justify-center">
        <Icons.spinner className="mr-2 size-10 animate-spin text-primary" />
      </div>
    </>
  );
}

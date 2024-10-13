import { Icons } from "@/components/shared/icons";

export default function DashboardLoading() {
  return (
    <>
      <div className="-mt-12 flex min-h-screen items-center justify-center">
        <Icons.spinner className="mr-2 size-10 animate-spin text-primary" />
      </div>
    </>
  );
}

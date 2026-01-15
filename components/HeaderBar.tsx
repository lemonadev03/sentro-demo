"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type HeaderBarProps = {
  title: string;
  backHref?: string;
  className?: string;
  action?: React.ReactNode;
  center?: React.ReactNode;
};

export default function HeaderBar({
  title,
  backHref,
  className,
  action,
  center,
}: HeaderBarProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "relative flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:bg-muted"
          >
            Back
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-border px-3 py-1 text-sm font-semibold hover:bg-muted"
          >
            Back
          </button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      {center ? (
        <div className="absolute left-1/2 max-w-[60%] -translate-x-1/2">
          {center}
        </div>
      ) : null}
      {action ? <div className="flex items-center">{action}</div> : null}
    </header>
  );
}

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-200 dark:bg-accent animate-pulse rounded-md", className)}
      {...props} />
  );
}

export { Skeleton }

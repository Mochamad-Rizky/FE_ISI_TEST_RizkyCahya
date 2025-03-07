import { cn } from '@/lib/utils';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-base bg-bw border-border animate-pulse border-2',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

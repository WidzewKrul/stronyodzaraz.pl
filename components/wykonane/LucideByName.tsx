import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function LucideByName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden />;
}

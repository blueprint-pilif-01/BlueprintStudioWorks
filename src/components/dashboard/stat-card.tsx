import { motion } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "secondary" | "accent" | "green";
  className?: string;
};

const iconColors: Record<string, string> = {
  default: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
  primary: "bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400",
  secondary: "bg-secondary-500/10 dark:bg-secondary-500/20 text-secondary-600 dark:text-secondary-400",
  accent: "bg-accent-500/10 dark:bg-accent-500/20 text-accent-600 dark:text-accent-400",
  green: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
};

export function StatCard({ title, value, subtitle, icon: Icon, variant = "default", className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl bg-white border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-gray-100 tabular-nums">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={cn("rounded-xl p-2.5 flex-shrink-0", iconColors[variant])}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

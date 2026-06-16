import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Globe,
  FileSignature,
  Package,
  MessageSquare,
  Users,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Target,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { BlueprintBrand } from "@/components/ui/blueprint-brand";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const clientNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Site", href: "/dashboard/my-site", icon: Globe },
  { label: "Progress", href: "/dashboard/progress", icon: Target },
  { label: "Contracts", href: "/dashboard/contracts", icon: FileSignature },
  { label: "Packages", href: "/dashboard/packages", icon: Package },
  { label: "Support", href: "/dashboard/support", icon: MessageSquare },
];

const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Contracts", href: "/admin/contracts", icon: FileSignature },
  { label: "Templates", href: "/admin/contracts/templates", icon: FolderOpen },
  { label: "Sites", href: "/admin/sites", icon: Globe },
  { label: "Feedback", href: "/admin/feedback", icon: Inbox },
  { label: "Activity", href: "/admin/activity", icon: Activity },
];

type SidebarProps = {
  role: "admin" | "client";
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const nav = role === "admin" ? adminNav : clientNav;
  const { user } = useAuth();

  const isExactActive = (href: string) => {
    if (href === "/admin" || href === "/dashboard") return location.pathname === href;
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className={cn("flex items-center h-16 border-b border-gray-100 dark:border-gray-700", collapsed ? "justify-center px-2" : "justify-between px-5")}>
        {!collapsed && (
          <Link to={role === "admin" ? "/admin" : "/dashboard"} className="text-gray-900 dark:text-gray-100">
            <BlueprintBrand logoClassName="h-6" textClassName="text-[15px]" />
          </Link>
        )}
        <button
          onClick={onToggle}
          className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
            {role === "admin" ? "Administration" : "Dashboard"}
          </p>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const active = isExactActive(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all relative",
                    active
                      ? "bg-primary-500/10 text-primary-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary-500" />
                  )}
                  <Icon className={cn("h-[18px] w-[18px] flex-shrink-0", active ? "text-primary-500 dark:text-primary-400" : "text-gray-400 dark:text-gray-500")} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && user && (
        <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400">
              {(user.name || user.email)?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">{user.name || user.email}</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 capitalize">{role}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

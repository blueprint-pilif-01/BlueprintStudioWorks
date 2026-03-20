import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

type RequireAuthProps = {
  children: React.ReactNode;
  role?: "admin" | "client";
};

export function RequireAuth({ children, role }: RequireAuthProps) {
  const { isAuthenticated, isLoading, isAdmin, isClient } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foreground/5">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const loginPath = role === "admin" ? "/admin/login" : "/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (role === "admin" && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === "client" && !isClient) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

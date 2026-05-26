import { Link, useNavigate } from "@tanstack/react-router";
import GoogleSignInButton from "#/components/GoogleSignInButton";
import { useAuth, useLogout } from "#/hooks/useAuth";

export default function AuthHeaderUser() {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        {/* <div className="hidden w-[168px] sm:block">
          <GoogleSignInButton
            redirectTo="/dashboard"
            className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
          />
        </div> */}
        <Link
          to="/login"
          className="inline-flex h-9 items-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/dashboard"
        className="hidden h-9 items-center rounded-xl border border-neutral-300 bg-white/60 px-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 sm:inline-flex dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
      >
        Dashboard
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-9 items-center rounded-xl border border-neutral-300 bg-white px-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
      >
        Sign out
      </button>
    </div>
  );
}

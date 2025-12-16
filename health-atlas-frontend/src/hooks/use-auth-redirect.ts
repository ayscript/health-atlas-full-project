"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/store/auth";

type UseAuthRedirectResult = {
  loading: boolean;
  user: any | null;
  checked: boolean; // whether the auth check finished
};

const useAuthRedirect = (): UseAuthRedirectResult => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { user, loading, checkUser } = useAuth();
  const [checked, setChecked] = useState(false);

  // Run the canonical check once on mount
  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        await checkUser();
      } finally {
        if (mounted) setChecked(true);
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [checkUser]);

  // Helper: determine if current route is an auth route
  const isAuthRoute = /^\/(login|signup)(\/|$)/i.test(pathname);

  // After we've finished the check:
  // - if no user and we're NOT on an auth route, send to /login
  // - if user exists and we're on an auth route, send to /chat
  useEffect(() => {
    if (!checked) return;

    if (!loading && !user && !isAuthRoute) {
      // Not authenticated and on a protected page -> go to login
      router.push("/login");
      return;
    }

    if (!loading && user && isAuthRoute) {
      // Authenticated user should not access login/signup -> go to chat
      router.push("/chat");
      return;
    }
  }, [checked, loading, user, isAuthRoute, router]);

  return { loading, user, checked };
};

export default useAuthRedirect;
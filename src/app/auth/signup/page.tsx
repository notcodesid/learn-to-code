"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// We no longer support email/password sign up.
// This page exists only for old links / bookmarks.
export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the only supported sign in method
    const t = setTimeout(() => {
      router.replace("/auth/signin");
    }, 1200);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Sign up has moved</h1>
        <p className="text-muted">We now only support Google sign in.</p>
        <p className="text-xs text-muted mt-2">Redirecting you...</p>
      </div>
    </div>
  );
}

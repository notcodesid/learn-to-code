"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign in after 3 seconds
    const timer = setTimeout(() => {
      router.push("/auth/signin");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
        <p className="text-muted mb-4">
          There was an error during authentication. This might be because:
        </p>
        
        <ul className="text-left text-sm text-muted mb-6 space-y-2">
          <li>• Google OAuth is not configured yet</li>
          <li>• Invalid credentials</li>
          <li>• Network connection issue</li>
        </ul>

        <p className="text-sm text-muted">
          Redirecting to sign in page...
        </p>
        
        <button
          onClick={() => router.push("/auth/signin")}
          className="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Go to Sign In
        </button>
      </div>
    </div>
  );
}
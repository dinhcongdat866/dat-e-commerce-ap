"use client";

import { Button } from "@mui/material";
import { useSession, signIn, SessionProvider } from "next-auth/react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Checking login status...</p>;
  }

  if (!session) {
    return (
      <div>
        <p>You are not signed in.</p>
        <Button onClick={() => signIn("google")}>Sign in</Button>
      </div>
    );
  }

  return <>{children}</>;
}

export default function SessionProviderWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider><AuthLayout>{children}</AuthLayout></SessionProvider>;
}

// src/components/ClientOnly.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";

export default function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  // While server-rendering, return null (so server HTML is minimal and won't mismatch).
  if (!mounted) return null;
  return <>{children}</>;
}
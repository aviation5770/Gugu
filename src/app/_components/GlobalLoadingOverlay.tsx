"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import AuthBackground from "@/app/(auth)/_components/AuthBackground";

export default function GlobalLoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    function clearTimer() {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    function onAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest anchor
      const anchor = target.closest && (target.closest("a") as HTMLAnchorElement | null);
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // ignore external or hash links
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) return;
      if (href.startsWith("#")) return;

      setIsLoading(true);
      clearTimer();
      // safety hide after 3s if navigation doesn't complete
      timeoutRef.current = window.setTimeout(() => setIsLoading(false), 3000);
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") {
        setIsLoading(false);
        clearTimer();
      }
    }

    function onPopState() {
      setIsLoading(true);
      clearTimer();
      timeoutRef.current = window.setTimeout(() => setIsLoading(false), 2000);
    }

    window.addEventListener("click", onAnchorClick);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("click", onAnchorClick);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("popstate", onPopState);
      clearTimer();
    };
  }, []);

  if (!isLoading) return null;

  return (
    <main
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(6px)",
      }}
    >
      <AuthBackground />

      <div
        style={{
          zIndex: 10000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <svg viewBox="0 0 100 100" style={{ width: 60, height: 60 }}>
          <style>{`
            @keyframes guguSpinner {
              0% { opacity: 1; }
              100% { opacity: 0.15; }
            }
            .spinner-bar {
              animation: guguSpinner 1.2s linear infinite;
              fill: #EF466E;
            }
            .bar-1 { animation-delay: 0s; }
            .bar-2 { animation-delay: -0.15s; }
            .bar-3 { animation-delay: -0.3s; }
            .bar-4 { animation-delay: -0.45s; }
            .bar-5 { animation-delay: -0.6s; }
            .bar-6 { animation-delay: -0.75s; }
            .bar-7 { animation-delay: -0.9s; }
            .bar-8 { animation-delay: -1.05s; }
          `}</style>
          <rect className="spinner-bar bar-1" x="46" y="10" width="8" height="20" rx="4" transform="rotate(0 50 50)" />
          <rect className="spinner-bar bar-8" x="46" y="10" width="8" height="20" rx="4" transform="rotate(45 50 50)" />
          <rect className="spinner-bar bar-7" x="46" y="10" width="8" height="20" rx="4" transform="rotate(90 50 50)" />
          <rect className="spinner-bar bar-6" x="46" y="10" width="8" height="20" rx="4" transform="rotate(135 50 50)" />
          <rect className="spinner-bar bar-5" x="46" y="10" width="8" height="20" rx="4" transform="rotate(180 50 50)" />
          <rect className="spinner-bar bar-4" x="46" y="10" width="8" height="20" rx="4" transform="rotate(225 50 50)" />
          <rect className="spinner-bar bar-3" x="46" y="10" width="8" height="20" rx="4" transform="rotate(270 50 50)" />
          <rect className="spinner-bar bar-2" x="46" y="10" width="8" height="20" rx="4" transform="rotate(315 50 50)" />
        </svg>

        <span style={{ color: "#083b4d", fontWeight: 800, fontSize: 16 }}>
          불러오는 중입니다...
        </span>
      </div>
    </main>
  );
}

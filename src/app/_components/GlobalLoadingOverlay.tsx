"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GlobalLoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

useEffect(() => {
    try {
      const navEntries = performance.getEntriesByType
        ? (performance.getEntriesByType("navigation") as PerformanceNavigationTiming[])
        : undefined;
      const navType = navEntries && navEntries[0] ? navEntries[0].type : undefined;
      const isReload = navType === "reload";

      if (isReload || document.readyState !== "complete") {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration
        setIsLoading(true);
      }
    } catch {
      // ignore
    }

    function clearTimer() {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    function onLoad() {
      setIsLoading(false);
      clearTimer();
    }

    function onAnchorClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest && (target.closest("a") as HTMLAnchorElement | null);
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) return;
      if (href.startsWith("#")) return;

      setIsLoading(true);
      clearTimer();
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

    window.addEventListener("load", onLoad);
    window.addEventListener("click", onAnchorClick);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("click", onAnchorClick);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("popstate", onPopState);
      clearTimer();
    };
  }, []);

  if (!isLoading) return null;

  return <LoadingSpinner />;
}
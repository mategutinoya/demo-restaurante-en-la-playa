"use client";

import { useEffect } from "react";

/**
 * Always open the page at the top (the hero), on phones too:
 * - turns off the browser's scroll restoration on reload / tab reopen;
 * - in-page links (#about, #reservations…) scroll smoothly without leaving the
 *   hash in the address bar, so a later reload doesn't jump down the page;
 * - when arriving with a hash from another page (e.g. /menu → /#reservations),
 *   scroll to that section once, then clean the URL.
 */
export default function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const cleanUrl = () => history.replaceState(history.state, "", window.location.pathname + window.location.search);

    const hash = window.location.hash;
    const target = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView());
      cleanUrl();
    } else {
      if (hash) cleanUrl();
      window.scrollTo(0, 0);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.hash.length < 2) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      if (el.id === "main") el.focus({ preventScroll: true });
    };
    // iOS/Android can restore a page from the back-forward cache mid-scroll
    const onPageShow = (e: PageTransitionEvent) => e.persisted && window.scrollTo(0, 0);

    document.addEventListener("click", onClick, true);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  return null;
}

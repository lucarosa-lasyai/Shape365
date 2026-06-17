"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            registration.addEventListener("updatefound", () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (
                    newWorker.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    newWorker.postMessage({ type: "SKIP_WAITING" });
                  }
                });
              }
            });
          })
          .catch(() => {});
      });
    }
  }, []);

  return null;
}

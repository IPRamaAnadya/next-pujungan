"use client";

import AOS from "aos";
import { useEffect } from "react";

export function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
      offset: 60,
    });
  }, []);

  return null;
}

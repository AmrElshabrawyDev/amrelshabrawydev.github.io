"use client";

import { useEffect } from "react";

export function EasterEgg() {
  useEffect(() => {
    console.log(
      `\n%c👋 Hey there, fellow developer!\n\n%cNice to see you checking the code.\nBuilt with React, Next.js, and ❤️\n\nWant to collaborate? Let's connect!\n→ amrelshabrawy.dev@gmail.com\n\n`,
      "font-size: 20px; font-weight: bold; color: #3B82F6",
      "font-size: 14px; color: #94A3B8",
    );
  }, []);

  return null;
}

"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    const crispId = process.env.NEXT_PUBLIC_CRISP_CHAT_ID; // Fetch ID from env
    if (!crispId) {
      console.error("Crisp chat ID not found in environment variables.");
      return;
    }
    Crisp.configure(crispId);
  }, []);

  return null;
};

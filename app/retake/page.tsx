"use client";

import { useEffect } from "react";

export default function Retake() {
  useEffect(() => {
    window?.document
      ?.getElementsByClassName("main")[0]
      ?.classList?.add("flex-grow");
  }, []);
  return (
    <iframe
      src="https://retake-section-finder.pages.dev/"
      className="h-full w-full"
    />
  );
}

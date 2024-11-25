"use client";

export default function Retake() {
  window.document.getElementsByClassName("main")[0]?.classList.add("flex-grow");
  return (
    <iframe
      src="https://retake-section-finder.pages.dev/"
      className="h-full w-full"
    />
  );
}

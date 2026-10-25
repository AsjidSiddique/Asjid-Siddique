"use client";

import { useEffect, useState } from "react";

// Types out each phrase, pauses, deletes it, moves to the next — looping.
// Disabled under prefers-reduced-motion: just shows the first phrase
// statically instead of animating indefinitely (an infinite loop is
// exactly the kind of motion that preference asks us to avoid).
export function Typewriter({
  phrases,
  className = "",
  typeSpeed = 45,
  deleteSpeed = 28,
  pauseAfterType = 1600,
  pauseAfterDelete = 300,
}: {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
}) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setText(phrases[0] ?? "");
      return;
    }

    const current = phrases[phraseIndex % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typeSpeed
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseAfterType);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deleteSpeed
      );
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, pauseAfterDelete);
    }

    return () => clearTimeout(timeout);
  }, [
    text,
    deleting,
    phraseIndex,
    phrases,
    reduceMotion,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return (
    <span className={className}>
      {text}
      {!reduceMotion && (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse-dot bg-current align-middle" style={{ height: "0.9em" }} />
      )}
    </span>
  );
}

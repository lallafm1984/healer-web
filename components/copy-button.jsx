"use client";
import { useEffect, useRef, useState } from "react";

export default function CopyButton({
  value,
  children = "이메일 주소 복사",
  className = "copy-button",
}) {
  const [message, setMessage] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setMessage("복사했습니다.");
    } catch {
      setMessage(
        "자동 복사가 어렵습니다. 표시된 내용을 직접 선택해 복사하십시오.",
      );
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 4000);
  }
  return (
    <>
      <button className={className} type="button" onClick={copy}>
        {children}
      </button>
      <span
        className={`toast${message ? " visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </span>
    </>
  );
}

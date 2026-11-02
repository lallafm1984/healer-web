"use client";
import { useEffect, useState } from "react";

export function useLandingMotion(heroRef, paused) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const hero = heroRef.current;
    const header = document.querySelector(".site-header");
    const progress = header.querySelector(".reading-progress");
    const chapters = [
      ...document.querySelectorAll("[data-section], .chapter-nav a"),
    ];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
    const controller = new AbortController();
    const options = { signal: controller.signal, passive: true };
    let heroVisible = true;
    let pointerFrame = 0;
    let scrollFrame = 0;
    const motionAllowed = () => !paused && !reduced.matches && !document.hidden;
    function syncMotion() {
      setReducedMotion(reduced.matches);
      document.documentElement.classList.toggle(
        "motion-off",
        paused || reduced.matches,
      );
      document.body.classList.toggle("page-hidden", document.hidden);
      if (!motionAllowed()) {
        hero.style.setProperty("--pointer-x", "0px");
        hero.style.setProperty("--pointer-y", "0px");
        hero.style.setProperty("--hero-shift", "0px");
      }
    }
    reduced.addEventListener("change", syncMotion, {
      signal: controller.signal,
    });
    document.addEventListener("visibilitychange", syncMotion, options);
    syncMotion();
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (
          !motionAllowed() ||
          !finePointer.matches ||
          !heroVisible ||
          pointerFrame
        )
          return;
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        pointerFrame = requestAnimationFrame(() => {
          hero.style.setProperty("--pointer-x", `${x * 12}px`);
          hero.style.setProperty("--pointer-y", `${y * 8}px`);
          pointerFrame = 0;
        });
      },
      options,
    );
    hero.addEventListener(
      "pointerleave",
      () => {
        cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        hero.style.setProperty("--pointer-x", "0px");
        hero.style.setProperty("--pointer-y", "0px");
      },
      options,
    );
    function updateScroll() {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${height > 0 ? Math.min(1, top / height) : 0})`;
      header.classList.toggle("has-scrolled", top > 20);
      if (heroVisible && motionAllowed())
        hero.style.setProperty(
          "--hero-shift",
          `${Math.min(48, Math.max(0, -hero.getBoundingClientRect().top) * (finePointer.matches ? 0.1 : 0.035))}px`,
        );
      let active = "";
      for (const item of chapters) {
        const section = document.querySelector(item.getAttribute("href"));
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.42
        )
          active = section.id;
      }
      chapters.forEach((link) => {
        const selected = link.getAttribute("href") === `#${active}`;
        link.classList.toggle("active", selected);
        if (selected) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      scrollFrame = 0;
    }
    function scheduleScroll() {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    }
    window.addEventListener("scroll", scheduleScroll, options);
    window.addEventListener("resize", scheduleScroll, options);
    updateScroll();
    // Capture before Next's Link handler so both navigation rows are included in the offset.
    document.addEventListener(
      "click",
      (event) => {
        const link = event.target.closest("a[href]");
        if (
          !link ||
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button > 0
        )
          return;
        const url = new URL(link.href, location.href);
        const id = url.hash.slice(1);
        if (
          url.origin !== location.origin ||
          url.pathname !== location.pathname ||
          !["story", "classes", "gameplay", "release"].includes(id)
        )
          return;
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        const offset =
          header.offsetHeight +
          document.querySelector(".chapter-nav").offsetHeight +
          14;
        if (location.hash !== url.hash) history.pushState(null, "", url.hash);
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - offset,
          behavior: motionAllowed() ? "smooth" : "instant",
        });
        if (event.detail === 0) {
          const heading = target.querySelector("h2");
          heading?.setAttribute("tabindex", "-1");
          heading?.focus({ preventScroll: true });
        }
      },
      { signal: controller.signal, capture: true },
    );
    const observers = [];
    if ("IntersectionObserver" in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        hero.classList.toggle("outside-viewport", !heroVisible);
      });
      heroObserver.observe(hero);
      observers.push(heroObserver);
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
      );
      document
        .querySelectorAll(
          ".reveal, .class-tabs, .class-stage, .showcase-tabs, .showcase-stage",
        )
        .forEach((el) => {
          el.classList.add("reveal-ready");
          revealObserver.observe(el);
        });
      observers.push(revealObserver);
    }
    return () => {
      controller.abort();
      observers.forEach((observer) => observer.disconnect());
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(pointerFrame);
      document.documentElement.classList.remove("motion-off");
      document.body.classList.remove("page-hidden");
      header.classList.remove("has-scrolled");
    };
  }, [heroRef, paused]);
  return reducedMotion;
}

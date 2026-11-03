"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { email } from "../lib/content";
import GooglePlayBadge from "./google-play-badge";
import { Arrow } from "./icons";
import { useLocale } from "./locale-provider";
import LanguageSwitcher from "./language-switcher";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);
  const landing = pathname === "/";
  const { t, href } = useLocale();
  function goHome(event) {
    setMenuOpen(false);
    if (!landing || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    event.preventDefault();
    if (location.hash) history.pushState(null, "", href("/"));
    window.scrollTo({
      top: 0,
      behavior: document.documentElement.classList.contains("motion-off") ? "instant" : "smooth",
    });
  }
  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    }
    function onClick(event) {
      if (!header.current?.contains(event.target)) setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);
  return (
    <div className={landing ? "landing" : undefined}>
      <a className="skip" href="#main">
        {t("본문 바로가기")}
      </a>
      <header className="site-header" ref={header}>
        <div className="nav-wrap">
          <Link
            href={href("/")}
            className="brand"
            aria-label={t("나혼자 힐러 홈")}
            onClick={goHome}
          >
            <img src="/assets/app-icon.png" width="40" height="40" alt="" />
            <span>
              {t("나혼자 힐러")}<small>SOLO HEALER</small>
            </span>
          </Link>
          <nav aria-label={t("주 메뉴")}>
            <Link href={href("/#story")}>{t("게임 소개")}</Link>
            <Link href={href("/#classes")}>{t("7가지 직업")}</Link>
            <Link href={href("/#gameplay")}>{t("플레이")}</Link>
            <Link
              href={href("/support/")}
              aria-current={
                pathname.replace(/\/$/, "") === "/support" ? "page" : undefined
              }
            >
              {t("고객지원")}
            </Link>
          </nav>
          <GooglePlayBadge className="site-header-download" />
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t(menuOpen ? "메뉴 닫기" : "메뉴 열기")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label={t("모바일 메뉴")}
          hidden={!menuOpen}
          onClick={(event) => {
            if (event.target.closest("a")) setMenuOpen(false);
          }}
        >
          <Link href={href("/#story")}>{t("게임 소개")}</Link>
          <Link href={href("/#classes")}>{t("7가지 직업")}</Link>
          <Link href={href("/#gameplay")}>{t("플레이")}</Link>
          <Link href={href("/support/")}>{t("고객지원")}</Link>
          <GooglePlayBadge />
          <Link href={href("/privacy/")}>{t("개인정보처리방침")}</Link>
          <LanguageSwitcher />
        </nav>
        {landing && <div className="reading-progress" aria-hidden="true" />}
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-main">
          <Link className="brand" href={href("/")} onClick={goHome}>
            <img src="/assets/app-icon.png" width="40" height="40" alt="" />
            <span>
              {t("나혼자 힐러")}<small>A GAME BY 4LTREE</small>
            </span>
          </Link>
          <div className="footer-links">
            <GooglePlayBadge />
            <Link href={href("/privacy/")}>{t("개인정보처리방침")}</Link>
            <Link href={href("/terms/")}>{t("이용약관")}</Link>
            <Link href={href("/support/")}>{t("고객지원")}</Link>
          </div>
        </div>
        <div className="container"><LanguageSwitcher /></div>
        <div className="container footer-bottom">
          <span>{t("© 2026 포엘트리(4LTree). All rights reserved.")}</span>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="https://www.4ltree.com/">
            4ltree.com <Arrow />
          </a>
        </div>
      </footer>
    </div>
  );
}

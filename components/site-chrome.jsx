"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { email } from "../lib/content";
import { Arrow } from "./icons";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef(null);
  const toggle = useRef(null);
  const landing = pathname === "/";
  function goHome(event) {
    setMenuOpen(false);
    if (!landing || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0) return;
    event.preventDefault();
    if (location.hash) history.pushState(null, "", "/");
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
        본문 바로가기
      </a>
      <header className="site-header" ref={header}>
        <div className="nav-wrap">
          <Link
            href="/"
            className="brand"
            aria-label="나혼자 힐러 홈"
            onClick={goHome}
          >
            <img src="/assets/app-icon.png" width="40" height="40" alt="" />
            <span>
              나혼자 힐러<small>SOLO HEALER</small>
            </span>
          </Link>
          <nav aria-label="주 메뉴">
            <Link href="/#story">게임 소개</Link>
            <Link href="/#classes">7가지 직업</Link>
            <Link href="/#gameplay">플레이</Link>
            <Link
              href="/support/"
              aria-current={
                pathname.replace(/\/$/, "") === "/support" ? "page" : undefined
              }
            >
              고객지원
            </Link>
          </nav>
          <Link className="nav-cta" href="/#release">
            출시 안내 <Arrow />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="모바일 메뉴"
          hidden={!menuOpen}
          onClick={(event) => {
            if (event.target.closest("a")) setMenuOpen(false);
          }}
        >
          <Link href="/#story">게임 소개</Link>
          <Link href="/#classes">7가지 직업</Link>
          <Link href="/#gameplay">플레이</Link>
          <Link href="/support/">고객지원</Link>
          <Link href="/privacy/">개인정보처리방침</Link>
          <Link href="/delete-account/">계정 및 데이터 삭제</Link>
        </nav>
        {landing && <div className="reading-progress" aria-hidden="true" />}
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container footer-main">
          <Link className="brand" href="/" onClick={goHome}>
            <img src="/assets/app-icon.png" width="40" height="40" alt="" />
            <span>
              나혼자 힐러<small>A GAME BY 4LTREE</small>
            </span>
          </Link>
          <div className="footer-links">
            <Link href="/privacy/">개인정보처리방침</Link>
            <Link href="/terms/">이용약관</Link>
            <Link href="/delete-account/">계정 및 데이터 삭제</Link>
            <Link href="/support/">고객지원</Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 포엘트리(4LTree). All rights reserved.</span>
          <a href={`mailto:${email}`}>{email}</a>
          <a href="https://www.4ltree.com/">
            4ltree.com <Arrow />
          </a>
        </div>
      </footer>
    </div>
  );
}

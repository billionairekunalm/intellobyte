"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content";

export default function Nav({ dark = true }) {
  const [scrolled, setScrolled] = useState(!dark);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!dark) return;
    const f = () => setScrolled(window.scrollY > 60);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [dark]);
  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-in">
          <Link href="/" className="logo" aria-label="Intellobyte home">
            <Image src="/img/logo.png" alt="" width={30} height={30} priority />Intellobyte
          </Link>
          <nav aria-label="Main"><ul>{NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul></nav>
          <Link href="/#contact" className="btn btn-p">Start a Project</Link>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span style={open ? { transform: "translateY(7px) rotate(45deg)" } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
            <span style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : {}} />
          </button>
        </div>
      </header>
      {open && (
        <div className="mobile" onClick={() => setOpen(false)}>
          {NAV.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          <Link href="/#contact" className="btn btn-p" style={{ marginTop: 6 }}>Start a Project</Link>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import "./Navbar.css";

const navItems = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "PROJECTS", href: "#projects" },
  { name: "WORKFLOW", href: "#workflow" },
  { name: "AI LAB", href: "#ai-lab" },
  { name: "STACK", href: "#stack" },
  { name: "JOURNEY", href: "#journey" },
  { name: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="glass navbar">
        <a href="#home" className="brand" onClick={closeMenu}>
          <span className="brand-mark">AG</span>

          <span className="brand-copy">
            <strong>AJEET</strong>
            <small>AI SYSTEMS LAB</small>
          </span>
        </a>

        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link"
              onClick={closeMenu}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <span className="system-status">
            <i />
            AVAILABLE
          </span>

          <a
            href="/resume/Ajeet_Gupta_Resume.pdf"
            className="resume-button"
            target="_blank"
            rel="noreferrer"
          >
            RESUME
            <span>↗</span>
          </a>

          <button
            className="menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}

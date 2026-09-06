import { useState } from "react";

const navItems = [
  { label: "01", name: "HOME", href: "#home" },
  { label: "02", name: "ABOUT", href: "#about" },
  { label: "03", name: "PROJECTS", href: "#projects" },
  { label: "04", name: "AI LAB", href: "#ai-lab" },
  { label: "05", name: "STACK", href: "#stack" },
  { label: "06", name: "JOURNEY", href: "#journey" },
  { label: "07", name: "CONTACT", href: "#contact" },
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
              <span>{item.label}</span>
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

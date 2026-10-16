import { useState } from "react";
import "./Navbar.css";

const navItems = [
  { name: "about", href: "#about" },
  { name: "projects", href: "#projects" },
  { name: "log", href: "#log" },
  { name: "stack", href: "#stack" },
  { name: "contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main">
        <a href="#home" className="brand" onClick={close}>
          <b>ajeet</b>.ipynb
        </a>

        <div id="nav-links" className={`nav-links ${open ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.name} href={item.href} onClick={close}>
              {item.name}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <a
            href="/resume/Ajeet_Gupta_Resume.pdf"
            className="resume-link"
            target="_blank"
            rel="noreferrer"
          >
            resume.pdf
          </a>

          <button
            className="menu-button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="nav-links"
          >
            {open ? "close" : "menu"}
          </button>
        </div>
      </nav>
    </header>
  );
}

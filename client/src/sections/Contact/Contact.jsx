import "./Contact.css";

const contactLinks = [
  {
    label: "GITHUB",
    value: "gajit9147-dev",
    href: "https://github.com/gajit9147-dev",
  },
  {
    label: "LINKEDIN",
    value: "Connect professionally",
    href: "https://www.linkedin.com/",
  },
  {
    label: "EMAIL",
    value: "Start a conversation",
    href: "mailto:your-email@example.com",
  },
];

function ContactTerminal() {
  return (
    <div className="contact-terminal glass">
      <div className="contact-terminal-header">
        <span>CONTACT // TERMINAL</span>

        <span className="contact-terminal-status">
          <i />
          READY
        </span>
      </div>

      <div className="contact-terminal-body">
        <div>
          <span className="terminal-prompt">$</span> connection.init()
        </div>

        <p>
          establishing secure communication channel...
        </p>

        <p className="contact-success">
          [OK] channel ready
        </p>

        <div className="contact-command">
          <span className="terminal-prompt">$</span> send --message
        </div>

        <p>
          Have an idea, opportunity or project?
        </p>

        <p>
          Let's build something useful.
        </p>

        <span className="contact-cursor">▊</span>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-shell">
        <div className="contact-main glass">
          <div className="contact-copy">
            <span className="section-index">08 / CONTACT</span>

            <h2>
              Let's Build
              <br />
              Something
              <br />
              Intelligent.
            </h2>

            <p>
              I'm always interested in interesting problems, ambitious ideas,
              collaborations and opportunities to learn by building.
            </p>

            <a
              href="mailto:your-email@example.com"
              className="contact-primary"
            >
              START A CONVERSATION
              <span>↗</span>
            </a>
          </div>

          <div className="contact-orb">
            <div className="contact-orb-ring ring-one" />
            <div className="contact-orb-ring ring-two" />
            <div className="contact-orb-core">
              <span>AG</span>
            </div>

            <div className="contact-orb-label label-one">
              OPEN_CHANNEL
            </div>

            <div className="contact-orb-label label-two">
              SYS.08
            </div>
          </div>
        </div>

        <div className="contact-grid">
          <ContactTerminal />

          <div className="contact-links glass">
            <span className="section-index">DIRECT CHANNELS</span>

            <div className="contact-link-list">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    link.href.startsWith("mailto:")
                      ? undefined
                      : "noreferrer"
                  }
                  className="contact-link"
                >
                  <div>
                    <span>{link.label}</span>
                    <strong>{link.value}</strong>
                  </div>

                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <footer className="site-footer glass">
          <div>
            <strong>AJEET // AI SYSTEMS LAB</strong>
            <span>CSE · AI/ML · FULL-STACK</span>
          </div>

          <span>© {new Date().getFullYear()} AJEET GUPTA</span>

          <span>BUILDING · LEARNING · EVOLVING</span>
        </footer>
      </div>
    </section>
  );
}

export default Contact;

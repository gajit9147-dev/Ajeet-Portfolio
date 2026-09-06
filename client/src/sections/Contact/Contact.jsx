const contactLinks = [
  {
    label: "GITHUB",
    value: "gajit9147-dev",
    href: "https://github.com/gajit9147-dev",
  },
  {
    label: "LINKEDIN",
    value: "Connect professionally",
    href: "#",
  },
  {
    label: "EMAIL",
    value: "Start a conversation",
    href: "mailto:your-email@example.com",
  },
];

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-shell">
        <div className="section-heading">
          <span className="section-index">08 / CONTACT</span>

          <div>
            <p className="section-kicker">CONNECTION // COLLABORATION</p>
            <h2>Let's build something.</h2>
          </div>
        </div>

        <div className="contact-main glass">
          <div className="contact-copy">
            <div className="contact-status">
              <i />
              OPEN TO OPPORTUNITIES
            </div>

            <h3>
              Have an idea,
              <br />
              <span>project or challenge?</span>
            </h3>

            <p>
              I'm always interested in learning, building and collaborating
              on meaningful technology projects.
            </p>

            <a
              href="mailto:your-email@example.com"
              className="contact-primary-button"
            >
              START A CONVERSATION
              <span>↗</span>
            </a>
          </div>

          <div className="contact-orb-area">
            <div className="contact-orb">
              <div className="contact-orb-inner">
                <span>AG</span>
              </div>

              <div className="contact-orbit orbit-one" />
              <div className="contact-orbit orbit-two" />
            </div>

            <span className="contact-orb-label">
              AJEET // AI SYSTEMS LAB
            </span>
          </div>
        </div>

        <div className="contact-links">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="glass contact-link"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="contact-link-label">{link.label}</span>

              <strong>{link.value}</strong>

              <span className="contact-link-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="contact-bottom">
          <span>© 2026 AJEET GUPTA</span>
          <span>CSE · AI/ML · FULL-STACK</span>
          <span>BUILT WITH CURIOSITY</span>
        </div>
      </div>
    </section>
  );
}

export default Contact;

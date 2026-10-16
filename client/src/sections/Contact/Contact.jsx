import "./Contact.css";

const links = [
  ["email", "ajeetgupta80045@gmail.com", "mailto:ajeetgupta80045@gmail.com"],
  ["github", "gajit9147-dev", "https://github.com/gajit9147-dev"],
  ["linkedin", "ajeet-gupta", "https://www.linkedin.com/in/ajeet-gupta-970478273/"],
];

export default function Contact() {
  return (
    <>
      <section id="contact" className="cell">
        <div className="cell-in">In [5]:</div>
        <div className="cell-body">
          <pre>
            <span className="com"># contact.py</span>
          </pre>
          <div className="out">
            {links.map(([label, text, href]) => (
              <p key={label} className="mono">
                <span className="str">{label}</span> ={" "}
                <a href={href} target={label === "email" ? undefined : "_blank"} rel="noreferrer">
                  {text}
                </a>
              </p>
            ))}
          </div>
        </div>
      </section>

      <footer className="foot">
        Last saved 16 Oct 2026. Written by me, mistakes included.
      </footer>
    </>
  );
}

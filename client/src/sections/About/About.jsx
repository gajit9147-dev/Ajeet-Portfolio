import "./About.css";

export default function About() {
  return (
    <section id="about" className="cell">
      <div className="cell-in">In [1]:</div>
      <div className="cell-body">
        <pre>
          <span className="com"># about.md</span>
        </pre>
        <div className="out about-copy">
          <p>
            I like turning an idea into something that runs, then finding out
            where it breaks. Most of what I know so far came from small
            projects and hackathons, not from slides.
          </p>
          <p>
            Right now I am learning machine learning properly (data, baselines,
            honest evaluation) and building full-stack apps with React and
            Node. I would like an internship where I can keep doing both.
          </p>
        </div>
      </div>
    </section>
  );
}

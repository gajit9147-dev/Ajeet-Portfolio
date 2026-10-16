import "./Log.css";

const entries = [
  ["16 Oct", "Joined the AWS Strands Decider hackathon. Not sure yet what I'll build."],
  ["12 Oct", "Started the ISRO/IIRS online GIS course (till 6 Nov)."],
  ["11 Oct", "AWS Cloud Quest: Cloud Practitioner done."],
  ["10 Oct", "Three Google Cloud skill badges: Network, Prometheus, Speech API."],
];

export default function Log() {
  return (
    <section id="log" className="cell">
      <div className="cell-in">In [3]:</div>
      <div className="cell-body">
        <pre>
          <span className="com"># learning_log.md</span>
        </pre>
        <div className="out">
          <ul className="log-list">
            {entries.map(([date, text]) => (
              <li key={date}>
                <b>{date}</b>&nbsp;&nbsp;{text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

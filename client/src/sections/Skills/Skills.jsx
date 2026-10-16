const skills = {
  "ai_ml": ["Python", "Generative AI", "Gemini API", "DeepSeek"],
  "frontend": ["React", "Vite", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  "backend": ["Node.js", "Express", "REST APIs", "JWT"],
  "database": ["MongoDB", "MySQL"],
  "tools": ["Git", "GitHub", "Docker", "AWS", "Vercel", "Postman", "Figma"],
};

export default function Skills() {
  return (
    <section id="stack" className="cell">
      <div className="cell-in">In [4]:</div>
      <div className="cell-body">
        <pre>
          <span className="com"># stack.py  (what I have used, not what I am expert in)</span>
        </pre>
        <div className="out">
          {Object.entries(skills).map(([group, items]) => (
            <p key={group} className="mono">
              <span className="str">{group}</span> = {items.join(", ")}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Workflow from "./sections/Workflow/Workflow";
import AILab from "./sections/AILab/AILab";

function App() {
  return (
    <div className="app">
      <div className="background-system">
        <div className="ambient-orb orb-one" />
        <div className="ambient-orb orb-two" />
        <div className="ambient-orb orb-three" />
      </div>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Workflow />
        <AILab />
      </main>
    </div>
  );
}

export default App;

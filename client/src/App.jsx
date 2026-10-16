import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Log from "./sections/Log/Log";
import Skills from "./sections/Skills/Skills";
import Contact from "./sections/Contact/Contact";
import AIAssistant from "./components/ai/AIAssistant";

function App() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="wrap">
        <Hero />
        <About />
        <Projects />
        <Log />
        <Skills />
        <Contact />
      </main>

      <AIAssistant />
    </div>
  );
}

export default App;

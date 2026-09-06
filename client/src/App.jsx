import Navbar from "./components/layout/Navbar";
import Hero from "./sections/Hero/Hero";

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
      </main>
    </div>
  );
}

export default App;

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import ProjectileMotion from "./pages/projectile";
import HomePage from "./pages/home";
import SimpleHarmonicMotion from "./pages/simpleHarmonicMotion";
import WaveEquation from "./pages/waveEquation";
import ThermalExpansion from "./pages/thermalExpansion";
import FreeFall from "./pages/freeFall";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projectilemotion" element={<ProjectileMotion />} />
        <Route path="/simpleharmonicmotion" element={<SimpleHarmonicMotion />} />
        <Route path="/waveequation" element={<WaveEquation />} />
        <Route path="/thermalexpansion" element={<ThermalExpansion />} />
        <Route path="/freeFall" element={<FreeFall />} />
      </Routes>
    </Router>
  )
}

export default App;
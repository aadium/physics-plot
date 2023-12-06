import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import ProjectileMotion from "./pages/projectile";
import HomePage from "./pages/home";
import SimpleHarmonicMotion from "./pages/simpleHarmonicMotion";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projectilemotion" element={<ProjectileMotion />} />
        <Route path="/simpleharmonicmotion" element={<SimpleHarmonicMotion />} />
      </Routes>
    </Router>
  )
}

export default App;
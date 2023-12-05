import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import ProjectileMotion from "./pages/projectile";
import HomePage from "./pages/home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projectilemotion" element={<ProjectileMotion />} />
      </Routes>
    </Router>
  )
}

export default App;
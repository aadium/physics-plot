import React from "react";
import Navbar from "../widgets/navbar";
import { Container, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import "../theme/CSS/homepage.css";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Container className="hero">
        <h1>Physics Plot</h1>
        <p className="subtitle">
          Visualize and understand physics concepts through interactive graphs
          of equations.
        </p>
      </Container>
      <Container className="features">
        <h3>Key Features</h3>
        <ul>
          <li>Graphing of various physics equations.</li>
          <li>Customizable parameters for accurate representations.</li>
          <li>Real-time visualization of changes in equations.</li>
        </ul>
      </Container>
      <Container className="how-to-use">
        <h3>How to Use</h3>
        <ul>
          <li>Select the physics equation you want to graph.</li>
          <li>Adjust parameters such as frequency, velocity, mass, etc.</li>
          <li>Observe the real-time graph visualization.</li>
        </ul>
      </Container>
      <Container className="equations">
        <h3>Start Plotting</h3>
        <List>
          <ListItem>
            <Link to="/projectilemotion" className="app-link">
              Projectile Motion
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/simpleharmonicmotion" className="app-link">
              Simple Harmonic Motion
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/waveequation" className="app-link">
              Wave Equation
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/thermalexpansion" className="app-link">
              Thermal Expansion
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/freeFall" className="app-link">
              Free Fall
            </Link>
          </ListItem>
        </List>
      </Container>
    </div>
  );
}

export default HomePage;

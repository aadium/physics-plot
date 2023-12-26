import React from "react";
import Navbar from "../widgets/navbar";
import { Container, Typography, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import "../theme/CSS/homepage.css";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Container className="hero">
        <Typography variant="h1">Physics Plot</Typography>
        <Typography variant="body1">
          Visualize and understand physics concepts through interactive graphs
          of equations.
        </Typography>
      </Container>
      <Container className="features">
        <Typography variant="h2">Key Features</Typography>
        <List>
          <ListItem>Graphing of various physics equations.</ListItem>
          <ListItem>Customizable parameters for accurate representations.</ListItem>
          <ListItem>Real-time visualization of changes in equations.</ListItem>
        </List>
      </Container>
      <Container className="how-to-use">
        <Typography variant="h2">How to Use</Typography>
        <Typography variant="body1">
          Explore the world of physics graphing with our easy-to-use interface.
          Follow these simple steps:
        </Typography>
        <List>
          <ListItem>Select the physics equation you want to graph.</ListItem>
          <ListItem>Adjust parameters such as frequency, velocity, mass, etc.</ListItem>
          <ListItem>Observe the real-time graph visualization.</ListItem>
        </List>
      </Container>
      <Container className="equations">
        <Typography variant="h2">Start Plotting</Typography>
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

import React, { useRef, useState } from "react";
import colors from "../theme/colors";
import Chart from "chart.js/auto";
import { Typography } from "@mui/material";
import "../App.css";
import "../theme/CSS/pages.css";
import Navbar from "../widgets/navbar";

function ThermalExpansion() {
  const chartRef = useRef(null);

  const [error, setError] = useState("");
  const [linearExpansionCoefficientText, setLinearExpansionCoefficientText] = useState("");
  const [initialLengthText, setInitialLengthText] = useState("");
  const [changeInTemperatureText, setChangeInTemperatureText] = useState("");

  const handleChange = () => {
    const newLinearExpansionCoefficient = parseFloat(linearExpansionCoefficientText);
    const newInitialLength = parseFloat(initialLengthText);
    const newChangeInTemperature = parseFloat(changeInTemperatureText);

    if (
      !isNaN(newLinearExpansionCoefficient) &&
      !isNaN(newInitialLength) &&
      !isNaN(newChangeInTemperature)
    ) {
      const finalLength = newInitialLength * (1 + newLinearExpansionCoefficient * newChangeInTemperature);

      updateChart(newInitialLength, finalLength);

      setError("");
    } else {
      setError("Please enter valid numerical values");
    }
  };

  const updateChart = (initialLength, finalLength) => {
    const canvas = chartRef.current;
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    const ctx = canvas.getContext("2d");
    canvas.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [''],
        datasets: [
          {
            label: "Initial Length",
            backgroundColor: [colors.graphLineColor1],
            data: [initialLength],
          },
          {
            label: "Final Length",
            backgroundColor: [colors.graphLineColor2],
            data: [finalLength],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Length (m)",
            },
            gridLines: {
              display: true,
            },
            grid: {
              color: function (context) {
                if (context.tick.value === 0) {
                  return colors.axisColor;
                } else {
                  return colors.gridlineColor;
                }
              },
            },
          },
        },
      },
    });
  };

  return (
    <center>
      <Navbar />
      <div className="input-pane">
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter linear expansion coefficient"
            onChange={(e) => setLinearExpansionCoefficientText(e.target.value)}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter initial length in meters"
            onChange={(e) => setInitialLengthText(e.target.value)}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter temperature change in °C"
            onChange={(e) => setChangeInTemperatureText(e.target.value)}
          />
        </div>
        <button className="calculate-answer-btn" onClick={handleChange}>
          Update Values
        </button>
        {error && <Typography color="error">{error}</Typography>}
      </div>
      <div style={{ maxWidth: '625px', maxHeight: '725px' }}>
        <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </center>
  );
}

export default ThermalExpansion;
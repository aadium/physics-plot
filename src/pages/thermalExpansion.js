import React, { useRef, useState } from "react";
import colors from "../theme/colors";
import Chart from "chart.js/auto";
import { Typography } from "@mui/material";
import { Analytics } from '@vercel/analytics/react';
import "../App.css";
import "../theme/CSS/pages.css";
import Navbar from "../widgets/navbar";

function ThermalExpansion() {
  const chartRef = useRef(null);

  const [error, setError] = useState("");
  const [linearExpansionCoefficientText, setLinearExpansionCoefficientText] = useState("");
  const [initialLengthText, setInitialLengthText] = useState("");
  const [changeInTemperatureText, setChangeInTemperatureText] = useState("");
  const [finalLength, setFinalLength] = useState(0);

  const handleChange = () => {
    const newLinearExpansionCoefficient = parseFloat(linearExpansionCoefficientText);
    const newInitialLength = parseFloat(initialLengthText);
    const newChangeInTemperature = parseFloat(changeInTemperatureText);

    if (
      !isNaN(newLinearExpansionCoefficient) &&
      !isNaN(newInitialLength) &&
      !isNaN(newChangeInTemperature)
    ) {
      const newFinalLength = newInitialLength * (1 + newLinearExpansionCoefficient * newChangeInTemperature);
      setFinalLength(newFinalLength);
      updateChart(newInitialLength, newFinalLength);

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
        labels: ['Initial Length', 'Final Length'],
        datasets: [{
          label: 'Length',
          backgroundColor: [colors.graphLineColor1, colors.graphLineColor2],
          data: [parseFloat(initialLengthText), finalLength],
        }],
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
      <table className="stats-pane" cellPadding={10}>
        <tr>
          <td align="right">Change in length:</td>
          <td>{(finalLength - parseFloat(initialLengthText)).toFixed(3)}</td>
          <td>m</td>
        </tr>
      </table>
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
            placeholder="Enter temp change in Kelvin"
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
      <Analytics />
    </center>
  );
}

export default ThermalExpansion;
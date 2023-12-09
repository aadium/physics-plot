import React, { useRef, useState } from "react";
import colors from "../theme/colors";
import Chart from "chart.js/auto";
import { Typography } from '@mui/material';
import "../App.css";
import "../theme/CSS/pages.css";
import Navbar from "../widgets/navbar";

function ThermalExpansion() {
  const chartRef = useRef(null);

  const [error, setError] = useState('');
  const [linearExpansionCoefficient, setLinearExpansionCoefficient] = useState(0);
  const [initialLength, setInitialLength] = useState(0);
  const [finalLength, setFinalLength] = useState(0);
  const [changeInTemperature, setChangeInTemperature] = useState(0);
  const [linearExpansionCoefficientText, setLinearExpansionCoefficientText] = useState('');
  const [initialLengthText, setInitialLengthText] = useState('');
  const [changeInTemperatureText, setChangeInTemperatureText] = useState('');

  const handleChange = () => {
    const newLinearExpansionCoefficient = parseFloat(linearExpansionCoefficientText);
    const newInitialLength = parseFloat(initialLengthText);
    const newChangeInTemperature = parseFloat(changeInTemperatureText);

    if (
      !isNaN(newLinearExpansionCoefficient) &&
      !isNaN(newInitialLength) &&
      !isNaN(newChangeInTemperature)
    ) {
      setChangeInTemperature(newChangeInTemperature);
      setInitialLength(newInitialLength);
      setLinearExpansionCoefficient(newLinearExpansionCoefficient);

      const finalLength = newInitialLength * (1 + newLinearExpansionCoefficient * newChangeInTemperature);

      setFinalLength(finalLength);

      updateChart(newInitialLength, finalLength);

      setError('');
    } else {
      setError('Please enter valid numerical values');
    }
  };

  const updateChart = () => {
    const canvas = chartRef.current;
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    const ctx = canvas.getContext("2d");
    canvas.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Initial Length', 'Final Length'],
        datasets: [{
          label: 'Length',
          backgroundColor: [colors.graphLineColor1, colors.graphLineColor3],
          data: [initialLength, finalLength],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Length (m)'
            },
          },
        },
      },
    });
  };

  return (
    <center>
      <Navbar/>
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
            placeholder="Enter initial length"
            onChange={(e) => setInitialLengthText(e.target.value)}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter change in temperature"
            onChange={(e) => setChangeInTemperatureText(e.target.value)}
          />
        </div>
        <button className="calculate-answer-btn" onClick={handleChange}>
          Update Values
        </button>
        {error && <Typography color="error">{error}</Typography>}
      </div>
      <div style={{ maxWidth: '650px', maxHeight: '750px' }}>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </center>
  );
}

export default ThermalExpansion;
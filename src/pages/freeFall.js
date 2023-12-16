import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import colors from "../theme/colors";
import Navbar from "../widgets/navbar";
import { Typography } from '@mui/material';
import "../App.css";
import "../theme/CSS/pages.css";
import constants from "../constants/constants";

const g = constants.g;

function FreeFall() {
  const chartRef = useRef(null);

  const [error, setError] = useState('');
  const [height, setHeight] = useState(0);
  const [heightText, setHeightText] = useState('');

  const handleChange = () => {
    const newHeight = parseFloat(heightText);

    if (!isNaN(newHeight)) {
      setHeight(newHeight);
    } else {
      setError('Please enter valid numerical values');
    }
  };

  useEffect(() => {

    const canvas = chartRef.current;
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    const ctx = canvas.getContext("2d");

    const calculateTime = (height) => {
      return Math.sqrt((2 * height) / g);
    };

    const calculatePosition = (time) => {
      return height - 0.5 * g * time ** 2;
    };

    const timeValues = Array.from({ length: 1000 }, (_, index) => index * calculateTime(height) / 1000);

    const data = {
      datasets: [
        {
          label: 'Particle',
          backgroundColor: colors.graphLineColor1,
          borderColor: colors.graphLineColor1,
          data: timeValues.map((time) => ({
            x: time,
            y: calculatePosition(time),
          })),
          pointRadius: 0,
          showLine: true,
        },
      ],
    };

    canvas.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (s)'
            },
            type: 'linear',
            position: 'bottom',
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
          y: {
            title: {
              display: true,
              text: 'Height (m)'
            },
            type: 'linear',
            position: 'left',
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

    return () => {
      if (canvas.chart) {
        canvas.chart.destroy();
      }
    };
  }, [height]);

  return (
    <center>
      <Navbar />
      <div className="input-pane">
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter height in metres"
            onChange={(e) => setHeightText(e.target.value)}
          />
        </div>
        <button className="calculate-answer-btn" onClick={handleChange}>Update Values</button>
        {error && <Typography color="error">{error}</Typography>}
      </div>
      <div style={{ maxWidth: '650px', maxHeight: '750px' }}>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </center>
  );
}

export default FreeFall;

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import colors from "../theme/colors";
import Navbar from "../widgets/navbar";
import { Typography } from '@mui/material';
import "../App.css";
import "../theme/CSS/pages.css";

function ProjectileMotion() {
  const chartRef = useRef(null);
  var tOfFlight = 0;
  var hMax = 0;
  var hRange = 0;
  var maxHRange = 0;

  const [error, setError] = useState('');
  const [velocity, setVelocity] = useState(0);
  const [angle, setAngle] = useState(0);
  const [vInputValue, setVInputValue] = useState('');
  const [aInputValue, setAInputValue] = useState('');

  const handleChange = () => {
    const newVel = parseFloat(vInputValue);
    const newAng = parseFloat(aInputValue);
    if (!isNaN(newVel) && !isNaN(newAng)) {
      if (newVel < 10 || newAng < 10) {
        setError('Please enter a value not less than 10')
      } else {
        setError('')
        setVelocity(newVel);
        setAngle(newAng);
      }
    } else {
      setError('Please enter a value')
    }
  };

  const generateDataPoints = () => {
    const dataPoints = [];
    tOfFlight = (2 * velocity * Math.sin(angle * (Math.PI / 180))) / g;
    hMax = Math.pow(velocity * Math.sin(angle * (Math.PI / 180)), 2) / (2 * g);
    hRange = (Math.pow(velocity, 2) * Math.sin(2 * angle * (Math.PI / 180))) / g;
    maxHRange = Math.pow(velocity, 2) / g;
  
    const numPoints = Math.max(Math.ceil(tOfFlight / 0.01), 2);
  
    if (tOfFlight > 0) {
      console.log("Total Time:", tOfFlight);
  
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * tOfFlight;
        const x = velocity * Math.cos(angle * (Math.PI / 180)) * t;
        const y = velocity * Math.sin(angle * (Math.PI / 180)) * t - (0.5 * g * t ** 2);
  
        dataPoints.push({ x: +x.toFixed(2), y: +y.toFixed(2) });
      }
  
      const xValues = dataPoints.map(point => point.x);
  
      const yValues = xValues.map(x => {
        const t = x / (velocity * Math.cos(angle * (Math.PI / 180)));
        return velocity * Math.sin(angle * (Math.PI / 180)) * t - (0.5 * g * t ** 2);
      });
  
      const finalDataPoints = xValues.map((x, index) => ({ x, y: yValues[index] }));
  
      return finalDataPoints;
    } else {
      console.error("Invalid input parameters. Please provide valid values.");
      return dataPoints;
    }
  };

  const dataPoints = generateDataPoints();

  const data = {
    datasets: [
      {
        label: 'Trajectory',
        backgroundColor: colors.graphLineColor1,
        borderColor: colors.graphLineColor1,
        data: dataPoints,
        pointRadius: 0,
      },
    ],
  };

  useEffect(() => {
    const canvas = chartRef.current;
    if (canvas.chart) {
      canvas.chart.destroy();
    }
    const ctx = canvas.getContext("2d");
    canvas.chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distance (m)'
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
            min: 0,
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
  }, [angle, velocity]);

  return (
    <center>
      <Navbar/>
        <table className="stats-pane" cellPadding={10}>
          <tr>
            <td align="right">Time of flight:</td>
            <td>{tOfFlight.toFixed(3)}</td>
            <td>s</td>
          </tr>
          <tr>
            <td align="right">Maximum height:</td>
            <td>{hMax.toFixed(3)}</td>
            <td>m</td>
          </tr>
          <tr>
            <td align="right">Horizontal range:</td>
            <td>{hRange.toFixed(3)}</td>
            <td>m</td>
          </tr>
          <tr>
            <td align="right">Maximum horizontal range:</td>
            <td>{maxHRange.toFixed(3)}</td>
            <td>m</td>
          </tr>
        </table>
      <div className="input-pane">
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter velocity in m/s"
            onChange={(e) => setVInputValue(e.target.value)}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter angle in degrees"
            onChange={(e) => setAInputValue(e.target.value)}
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

export default ProjectileMotion;

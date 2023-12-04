import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import colors from "./theme/colors";

const g = 9.81;

function App() {
  const chartRef = useRef(null);
  var tOfFlight = 0;

  const [velocity, setVelocity] = useState(0);
  const [angle, setAngle] = useState(0);
  const [vInputValue, setVInputValue] = useState("");
  const [aInputValue, setAInputValue] = useState("");

  const handleVelocityChange = () => {
    const newVel = parseFloat(vInputValue);
    if (!isNaN(newVel)) {
      setVelocity(newVel);
    }
  };

  const handleAngleChange = () => {
    const newAng = parseFloat(aInputValue);
    if (!isNaN(newAng)) {
      setAngle(newAng);
    }
  };

  const generateDataPoints = () => {
    const dataPoints = [];
    tOfFlight = (2 * velocity * Math.sin(angle * (Math.PI / 180))) / g;
  
    if (tOfFlight > 0) {
      console.log("Total Time:", tOfFlight);
  
      for (let t = 0; t <= tOfFlight + 0.00001; t += 0.005) {
        const x = velocity * Math.cos(angle * (Math.PI / 180)) * t;
        const y = velocity * Math.sin(angle * (Math.PI / 180)) * t - (0.5 * g * t ** 2);
        dataPoints.push({ x: +x.toFixed(2), y: +y.toFixed(2) });
      }
    } else {
      console.error("Invalid input parameters. Please provide valid values.");
    }
  
    return dataPoints;
  };

  const dataPoints = generateDataPoints();

  const data = {
    datasets: [
      {
        label: 'Graph',
        backgroundColor: colors.graphLineColor1,
        borderColor: colors.graphLineColor1,
        data: dataPoints,
        pointRadius: 0,
        pointHitRadius: 0, 
      },
    ],
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors.backgroundColor;
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
  }, [angle, velocity]);

  return (
    <center>
      <div style={{ maxWidth: '600px', maxHeight: '700px' }}>
        <div>
          <input
            type="text"
            placeholder="Enter velocity in m/s"
            value={vInputValue}
            onChange={(e) => setVInputValue(e.target.value)}
          />
          <button onClick={handleVelocityChange}>Update Velocity</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter angle in degrees"
            value={aInputValue}
            onChange={(e) => setAInputValue(e.target.value)}
          />
          <button onClick={handleAngleChange}>Update Angle</button>
        </div>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
        <input value={tOfFlight}/>
      </div>
    </center>
  );
}

export default App;

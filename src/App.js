import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import colors from "./theme/colors";

const App = () => {
  const chartRef = useRef(null);

  let [velocity, setVelocity] = useState (0);

  const handleVelocityChange = (newVel) => {
    setVelocity(newVel);
  };

  const generateDataPoints = (equation) => {
    const dataPoints = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const y = equation(x);
      dataPoints.push({ x, y });
    }
    return dataPoints;
  };
  
  const quadraticEquation = (x) => velocity*(x*x);
  const dataPoints = generateDataPoints(quadraticEquation);
  
  const data = {
    datasets: [
      {
        label: 'Graph',
        backgroundColor: colors.graphLineColor1,
        borderColor: colors.graphLineColor1,
        data: dataPoints,
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
            grid : {
              color: function(context) {
                if (context.tick.value == 0) {
                  return colors.axisColor;
                } else {
                  return colors.gridlineColor;
                }
              },
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            gridLines: {
              display: true, // Set to true to display grid lines for the x-axis
            },
            grid : {
              color: function(context) {
                if (context.tick.value == 0) {
                  return colors.axisColor;
                } else {
                  return colors.gridlineColor;
                }
              },
            }
          },
        },
      },
    });
    return () => {
      if (canvas.chart) {
        canvas.chart.destroy();
      }
    };
  }, [data]);

  return (
    <center>
      <div style={{ maxWidth: '600px', maxHeight: '700px' }}>
        <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </center>
  );
};

export default App;

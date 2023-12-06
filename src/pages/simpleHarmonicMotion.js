import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import colors from "../theme/colors";
import Navbar from "../widgets/navbar";
import { Typography } from '@mui/material';
import "../App.css";
import "../theme/CSS/pages.css";

function SimpleHarmonicMotion() {
  const chartRef = useRef(null);
  var frequency = 0;
  var maxDisp = 0;
  var maxVel = 0;
  var energy = 0;

  const [error, setError] = useState('');
  const [amplitude, setAmplitude] = useState(0);
  const [angularFrequency, setAngularFrequency] = useState(0);
  const [startTimeText, setStartTimeText] = useState('');
  const [endTimeText, setEndTimeText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [phaseConstant, setPhaseConstant] = useState(0);
  const [phaseConstantText, setPhaseConstantText] = useState('');
  const [amplitudeText, setAmplitudeText] = useState('');
  const [angularFrequencyText, setAngularFrequencyText] = useState('');
  const [numPoints, setNumPoints] = useState(100);
  const [mass, setMass] = useState(0);
  const [massText, setMassText] = useState('');

  const handleChange = () => {
    const newAmp = parseFloat(amplitudeText);
    const newAngV = parseFloat(angularFrequencyText);
    const newPhaseConst = parseFloat(phaseConstantText);
    const startTime = parseFloat(startTimeText);
    const endTime = parseFloat(endTimeText);
    const newMass = parseFloat(massText)

    if (!isNaN(newAmp) && !isNaN(newAngV) && !isNaN(newPhaseConst) && !isNaN(startTime) && !isNaN(endTime)) {
      if (endTime <= startTime) {
        setError('End time must be greater than start time');
        return;
      }

      const timePeriod = endTime - startTime;
      setNumPoints(Math.ceil(timePeriod / 0.01));

      setAmplitude(newAmp);
      setAngularFrequency(newAngV);
      setPhaseConstant(newPhaseConst);
      setMass(newMass);
      setStartTime(startTime);
      setEndTime(endTime);
      setError('');
    } else {
      setError('Please enter valid numerical values');
    }
  };

  frequency = 1 / (endTime - startTime);
  maxDisp = amplitude;
  maxVel = amplitude * angularFrequency;
  energy = 0.5 * mass * Math.pow(angularFrequency * amplitude, 2);

  const timeValues = Array.from({ length: numPoints + 1 }, (_, index) => {
    const time = parseFloat(startTimeText) + (index / numPoints) * (parseFloat(endTimeText) - parseFloat(startTimeText));
    return time;
  });

  const data = {
    datasets: [
      {
        label: 'Simple Harmonic Motion',
        backgroundColor: colors.graphLineColor1,
        borderColor: colors.graphLineColor1,
        data: timeValues.map((time) => ({
          x: time,
          y: amplitude * Math.sin(angularFrequency * time + phaseConstant),
        })),
        pointRadius: 0,
        showLine: true,
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
              text: 'Amplitude (m)'
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
  }, [amplitude, angularFrequency, numPoints, phaseConstant]);

  return (
    <center>
      <Navbar/>
      <table className="stats-pane" cellPadding={10}>
          <tr>
            <td align="right">Frequency:</td>
            <td>{frequency.toFixed(3)}</td>
            <td>Hz</td>
          </tr>
          <tr>
            <td align="right">Maximum displacement:</td>
            <td>{maxDisp.toFixed(3)}</td>
            <td>m</td>
          </tr>
          <tr>
            <td align="right">Maximum velocity:</td>
            <td>{maxVel}</td>
            <td>m/s</td>
          </tr>
          <tr>
            <td align="right">Energy:</td>
            <td>{energy.toFixed(3)}</td>
            <td>J</td>
          </tr>
        </table>
      <div className="input-pane">
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter amplitude in metres"
            onChange={(e) => setAmplitudeText((e.target.value))}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter angular frequency in rad/s"
            onChange={(e) => setAngularFrequencyText((e.target.value))}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter phase constant"
            onChange={(e) => setPhaseConstantText((e.target.value))}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter mass in kg"
            onChange={(e) => setMassText((e.target.value))}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter start time in sec"
            onChange={(e) => setStartTimeText((e.target.value))}
          /><br/>
          <span> to </span><br/>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter end time in sec"
            onChange={(e) => setEndTimeText((e.target.value))}
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

export default SimpleHarmonicMotion;
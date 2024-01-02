import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import colors from "../theme/colors";
import Navbar from "../widgets/navbar";
import { Typography } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import "../App.css";
import "../theme/CSS/pages.css";

function WaveGraph() {
  const chartRef = useRef(null);

  const [error, setError] = useState('');
  const [amplitude, setAmplitude] = useState(0);
  const [amplitudeText, setAmplitudeText] = useState('');
  const [waveNumber, setWaveNumber] = useState(0);
  const [waveNumberText, setWaveNumberText] = useState('');
  const [angularFrequency, setAngularFrequency] = useState(0);
  const [angularFrequencyText, setAngularFrequencyText] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [startTimeText, setStartTimeText] = useState('');
  const [endTime, setEndTime] = useState(1);
  const [endTimeText, setEndTimeText] = useState('');
  const [numPoints, setNumPoints] = useState(100);
  const [phaseConstant, setPhaseConstant] = useState(0);
  const [phaseConstantText, setPhaseConstantText] = useState('');

  const handleChange = () => {
    const newAmp = parseFloat(amplitudeText);
    const newWaveNumber = parseFloat(waveNumberText);
    const newAngV = parseFloat(angularFrequencyText);
    const newStartTime = parseFloat(startTimeText);
    const newEndTime = parseFloat(endTimeText);
    const newPhaseConst = parseFloat(phaseConstantText);

    if (
      !isNaN(newAmp) &&
      !isNaN(newWaveNumber) &&
      !isNaN(newAngV) &&
      !isNaN(newStartTime) &&
      !isNaN(newEndTime)
    ) {
      if (newEndTime <= newStartTime) {
        setError('End time must be greater than start time');
        return;
      }

      const timePeriod = newEndTime - newStartTime;
      setNumPoints(Math.ceil(timePeriod / 0.01));

      setAmplitude(newAmp);
      setWaveNumber(newWaveNumber);
      setPhaseConstant(newPhaseConst);
      setAngularFrequency(newAngV);
      setStartTime(newStartTime);
      setEndTime(newEndTime);
      setError('');
    } else {
      setError('Please enter valid numerical values');
    }
  };

  var frequency = angularFrequency / (2 * Math.PI);
  var timePeriod = 1 / frequency;
  var maxDisp = amplitude;
  var maxVel = amplitude * angularFrequency;

  const waveValues = Array.from({ length: numPoints + 1 }, (_, index) => {
    const xValue = startTime + (index / numPoints) * (endTime - startTime);
    const time = xValue;
    const yValue = amplitude * Math.sin(waveNumber * xValue + angularFrequency * time + phaseConstant);
    return { x: xValue, y: yValue };
  });

  const data = {
    datasets: [
      {
        label: 'Wave',
        backgroundColor: colors.graphLineColor1,
        borderColor: colors.graphLineColor1,
        data: waveValues,
        pointRadius: 0,
        showLine: true,
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
              text: 'Time (s)'
            },
            type: 'linear',
            position: 'bottom',
            gridLines: {
              display: true,
            },
            grid: {
              color: function (context) {
                if (context.tick.value === startTime || context.tick.value === endTime) {
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
  }, [amplitude, waveNumber, angularFrequency, startTime, endTime, numPoints, data]);

  return (
    <center>
      <Navbar />
      <table className="stats-pane" cellPadding={10}>
        <tr>
          <td align="right">Frequency:</td>
          <td>{frequency.toFixed(3)}</td>
          <td>Hz</td>
        </tr>
        <tr>
          <td align="right">Time Period:</td>
          <td>{timePeriod.toFixed(3)}</td>
          <td>s</td>
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
      </table>
      <div className="input-pane">
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter amplitude"
            onChange={(e) => setAmplitudeText(e.target.value)}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter wave number"
            onChange={(e) => setWaveNumberText(e.target.value)}
          />
        </div>
        <div>
          <input
            className="func-coeff"
            type="text"
            placeholder="Enter angular frequency"
            onChange={(e) => setAngularFrequencyText(e.target.value)}
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
          <br/>
          <span> Time Range: </span><br />
            <input
              className="func-coeff"
              type="text"
              placeholder="Enter start time in sec"
              onChange={(e) => setStartTimeText((e.target.value))}
            /><br />
            <span> to </span><br />
            <input
              className="func-coeff"
              type="text"
              placeholder="Enter end time in sec"
              onChange={(e) => setEndTimeText((e.target.value))}
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
      <Analytics />
    </center>
  );
}

export default WaveGraph;

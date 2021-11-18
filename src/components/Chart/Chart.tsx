import React, { useEffect, useRef } from 'react';

import styles from './Chart.module.scss';
import data from './fakeData';
// @ts-ignore
// eslint-disable-next-line import/extensions
import TChart from './graph.js';

const LIGHT_COLORS = {
  circleFill: '#ffffff',
  line: '#f2f4f5',
  zeroLine: '#ecf0f3',
  selectLine: '#dfe6eb',
  text: '#96a2aa',
  preview: '#eef2f5',
  previewAlpha: 0.8,
  previewBorder: '#b6cfe1',
  previewBorderAlpha: 0.5,
};

const Chart: React.VFC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = new TChart(containerRef.current);
    chartRef.current = chart;
    chart.setColors(LIGHT_COLORS);
    chart.setData(data);
  }, []);

  return <div ref={containerRef} className={styles.tchart} />;
};

export default Chart;

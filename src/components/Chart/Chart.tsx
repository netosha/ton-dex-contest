import React, { useEffect, useRef, useState } from 'react';

import styles from './Chart.module.scss';
// @ts-ignore
// eslint-disable-next-line import/extensions
import Graph from './graph';
import { GraphProps } from './Graph.types';

const colors = {
  circleFill: '#ffffff',
  line: '#f0f0f0',
  zeroLine: '#ecf0f3',
  selectLine: '#dfe6eb',
  text: '#96a2aa',
};

const Chart: React.VFC<GraphProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = new Graph(containerRef.current);
    chartRef.current = chart;
    chart.setColors(colors);
  }, []);

  useEffect(() => {
    if (data) {
      chartRef.current.setData(data);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;

  return <div ref={containerRef} className={styles.wrapper} />;
};

export default Chart;

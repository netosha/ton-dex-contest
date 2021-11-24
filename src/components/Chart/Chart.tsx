import React, { useEffect, useRef, useState } from 'react';

import cn from 'clsx';

import styles from './Chart.module.scss';
// @ts-ignore
// eslint-disable-next-line import/extensions
import Graph from './graph';
import { GraphProps } from './Graph.types';

const colors = {
  circleFill: '#ffffff',
  line: '#dddddd',
  zeroLine: '#bbbbbb',
  selectLine: '#bbbbbb',
  text: 'rgba(48, 55, 87, 0.5)',
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

  return (
    <div
      ref={containerRef}
      className={cn(styles.wrapper, 'relative w-full h-full')}
    />
  );
};

export default Chart;

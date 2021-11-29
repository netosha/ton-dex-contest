import React, { useEffect, useRef } from 'react';

import styles from './Chart.module.scss';
// TS is disabled because the external module is written in vanilla js
// @ts-ignore
import Graph from './graph';
import { GraphProps } from './Graph.types';

const colors = {
  circleFill: '#ffffff',
  line: '#dddddd',
  zeroLine: '#bbbbbb',
  selectLine: '#bbbbbb',
  text: 'rgba(48, 55, 87, 0.5)',
};

// TODO: Replace with something else
const Chart: React.VFC<GraphProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new Graph(containerRef.current);
    if (data) {
      graph.setColors(colors);
      graph.setData(data);
    } else {
      graph.destroy();
    }
  }, [data]);

  return <div ref={containerRef} className={styles.wrapper} />;
};

export default Chart;

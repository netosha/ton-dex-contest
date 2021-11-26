import React, { useEffect, useRef, useState } from 'react';

import cn from 'clsx';

import Loader from '@components/Loader';

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

const Chart: React.VFC<GraphProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new Graph(containerRef.current);
    if (data) {
      graph.setColors(colors);
      graph.setData(data);
      setIsLoading(false);
    } else {
      graph.destroy();
      setIsLoading(true);
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      className={cn(
        styles.wrapper,
        'relative w-full h-full flex justify-center'
      )}
    >
      {isLoading && <Loader className="my-auto" />}
    </div>
  );
};

export default Chart;

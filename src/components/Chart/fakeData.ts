import { GraphData } from '@components/Chart/Graph.types';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const dates = [];
while (yesterday < today) {
  yesterday.setMinutes(yesterday.getMinutes() + 5);
  dates.push(new Date(yesterday));
}
dates.unshift('x');
const arrayY0 = Array.from({ length: 288 }, () => 10 + Math.random() * 2);
// @ts-ignore:next-line
arrayY0.unshift('y0');

const fakeData: GraphData = {
  columns: [dates, arrayY0],
  types: {
    y0: 'line',
    x: 'x',
  },
  names: {
    y0: 'TONCOIN',
  },
  colors: {
    y0: '#0088cc',
  },
};

export default fakeData;

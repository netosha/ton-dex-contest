import { GraphData } from '@components/Chart/Graph.types';

const today = new Date();
today.setMinutes(0);
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const dates = [];
while (yesterday < today) {
  yesterday.setMinutes(yesterday.getMinutes() + 5);
  dates.push(new Date(yesterday));
}
dates.unshift('x');

let y = 0;
const arrayY0 = [];
for (let i = 0; i <= 288; i += 1) {
  y += Math.random() * 100 - 50;
  arrayY0.push(Math.abs(y));
}
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

import { csvParse, select } from 'd3';
import { radarChart } from './radarChart';

// I want square radar chart
let height = window.innerHeight - 10;
let width = window.innerWidth - 10;
if (height > width) {
  height = width;
} else {
  width = height;
}

export const viz = async (container, { state, setState }) => {
  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An array of objects
  let { data } = state;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  if (data && data !== 'LOADING') {
    radarChart(svg, { data, width, height });
  }

  const tempUrl = 'Radar Chart - peer institutions 2024.csv';

  if (data === undefined) {
    setState((state) => ({
      ...state,
      data: 'LOADING',
    }));

    const tempData = await csvParse(tempUrl);

    const options = [];
    for (const d of tempData) {
      d.S = +d.S;
      d.D = +d.D;
      d.C = +d.C;
      d.A = +d.A;
      d.Selectivity = +d.Selectivity;
      options.push(d);
    }

    data = options;

    setState((state) => ({
      ...state,
      data,
    }));
  }
};

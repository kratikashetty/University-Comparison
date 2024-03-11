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

export const viz = (container, { state, setState }) => {
  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An array of objects
  const { data } = state;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  if (data && data !== 'LOADING') {
    const bars = radarChart(svg, { data, width, height });
  }

  if (data === undefined) {
    setState((state) => ({
      ...state,
      data: 'LOADING',
    }));
    fetch(
      'https://gist.githubusercontent.com/kratikashetty/75f63b52c8edebdc235d50cda8752837/raw/9e03d3330a05c18d58d426606f4cace81e83b7ed/Radar%2520Chart%2520-%2520peer%2520institutions%25202024',
    )
      .then((response) => response.text())
      .then((csvString) => {
        let data = csvParse(csvString);

        const options = [];
        for (const d of data) {
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
      });
  }
};

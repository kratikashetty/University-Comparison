import {
  select,
  scaleLinear,
  scaleOrdinal,
  schemeDark2,
  line,
  axisLeft,
  axisBottom,
} from 'd3';
import { createRadarChartAxesAndLabels } from './radarAxes';
import { mediaColors } from './mediaColors';
import { createLegend } from './radarLegend';
import { createHovers } from './radarHover';
export const radarChart = (
  selection,
  {
    data,
    width,
    height,
    margin = {
      top: 30,
      bottom: 30,
      left: 30,
      right: 30,
    },
  },
) => {
  /*
     Total Enrollment
     |
  Annual R&D Exepdniture - - Undergratuate Selectivity
     |
     Endowment/Student


     C
     |
  D -  - A
     |
     S
  */
  let attributes = ['C', 'S', 'D', 'A'];
  let scales = {
    C: scaleLinear()
      .domain([0, 30000])
      .range([height / 2, margin.top]),
    S: scaleLinear()
      .domain([0, 1012000])
      .range([height / 2, height - margin.bottom]),
    D: scaleLinear()
      .domain([0, 520000000])
      .range([width / 2, margin.left]),
    A: scaleLinear()
      .domain([-1, 0])
      .range([width / 2, width - margin.right]),
  };
  data.sort(
    (a, b) =>
      Object.keys(mediaColors).indexOf(a.media) -
      Object.keys(mediaColors).indexOf(b.media),
  );

  selection.call(createRadarChartAxesAndLabels, {
    scales,
  });
  let shapes = selection
    .selectAll('.shapes')
    .data([null])
    .join('g')
    .classed('shapes', true);

  let groups = shapes
    .selectAll('.radar-shape')
    .data(data)
    .join('path')
    .classed('radar-shape', true)
    .attr('d', (d) =>
      getPathString(d, { width, height, scales }),
    )
    .attr('stroke', (d, i) => mediaColors[d.media])
    .attr('stroke-width', (d) =>
      d.media === 'Worcester Polytechnic Institute' ? 6 : 2,
    )

    .attr('data-media', (d) => d.media);

  selection.call(createLegend, {
    width,
    height,
    margin,
    data,
    color: mediaColors,
  });

  selection.call(createHovers, { groups });
};

const getPathString = (
  media,
  { width, height, scales },
) => {
  // line C -> A, A -> S, S -> D, D -> C
  let coords = [
    [width / 2, scales['C'](media.C)],
    [scales['A'](media.A), height / 2],
    [width / 2, scales['S'](media.S)],
    [scales['D'](media.D), height / 2],
  ];
  return line()(coords) + ' Z'; // Z closes the path
};

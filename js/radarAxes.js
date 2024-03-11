import { axisLeft, axisBottom } from 'd3';
export function createRadarChartAxesAndLabels(
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
  selection,
  {
    scales,
    labels = {
      C: 'Total Enrollment',
      S: 'Endowment/Student',
      D: 'Annual R&D Exepdniture',
      A: 'Undergratuate Selectivity',
    },
    axisLabelOffsets = { C: 11, S: 17, D: 11, A: 20 },
  },
) {
  const cAxis = axisLeft(scales['C'])
    .ticks(5)
    .tickFormat((d) => (d !== 0 ? `${d}` : null));
  const sAxis = axisLeft(scales['S'])
    .ticks(5)
    .tickFormat((d) => (d !== 0 ? `$$${d / 1000}K` : 0));

  const dAxis = axisBottom(scales['D'])
    .ticks(5)
    .tickFormat((d) =>
      d !== 0 ? `$$${d / 1000000}M` : null,
    );
  const aAxis = axisBottom(scales['A'])
    .ticks(5)
    .tickFormat((d) => d3.format('.0%')(Math.abs(d)));

  let axes = selection
    .selectAll('.axes')
    .data([null])
    .join('g')
    .classed('axes', true);
  let labelObjects = selection
    .selectAll('.labels')
    .data([null])
    .join('g')
    .classed('labels', true);
  // C
  axes
    .selectAll('.cAxis')
    .data([null])
    .join('g')
    .classed('cAxis', true)
    .attr(
      'transform',
      'translate(' + scales['A'].range()[0] + ',0)',
    )

    .call(cAxis);

  labelObjects
    .selectAll('.cAxisLabel')
    .data([null])
    .join('text')
    .classed('cAxisLabel', true)
    .text(labels['C'])
    .attr('text-anchor', 'middle')
    .attr('x', scales['A'].range()[0])
    .attr(
      'y',
      scales['C'].range()[1] - axisLabelOffsets['C'],
    );

  // A
  axes
    .selectAll('.aAxis')
    .data([null])
    .join('g')
    .classed('aAxis', true)
    .attr(
      'transform',
      'translate(0,' + scales['C'].range()[0] + ')',
    )
    .call(aAxis);

  labelObjects
    .selectAll('.aAxisLabel')
    .data([null])
    .join('text')
    .classed('aAxisLabel', true)
    .text(labels['A'])
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr(
      'y',
      scales['A'].range()[1] + axisLabelOffsets['A'],
    )
    .attr('x', -scales['C'].range()[0]);

  // D
  axes
    .selectAll('.dAxis')
    .data([null])
    .join('g')
    .classed('dAxis', true)
    .attr(
      'transform',
      'translate(0,' + scales['C'].range()[0] + ')',
    )
    .call(dAxis);

  labelObjects
    .selectAll('.dAxisLabel')
    .data([null])
    .join('text')
    .classed('dAxisLabel', true)
    .text(labels['D'])
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr(
      'y',
      scales['D'].range()[1] - axisLabelOffsets['D'],
    )
    .attr('x', -scales['C'].range()[0]);

  // S
  axes
    .selectAll('.sAxis')
    .data([null])
    .join('g')
    .classed('sAxis', true)
    .attr(
      'transform',
      'translate(' + scales['A'].range()[0] + ',0)',
    )
    .call(sAxis);

  labelObjects
    .selectAll('.sAxisLabel')
    .data([null])
    .join('text')
    .classed('sAxisLabel', true)
    .text(labels['S'])
    .attr('text-anchor', 'middle')
    .attr('x', scales['A'].range()[0])
    .attr(
      'y',
      scales['S'].range()[1] + axisLabelOffsets['S'],
    );
}

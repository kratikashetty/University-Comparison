import { removeAllHovers } from './radarHover';
export function createLegend(
  selection,
  {
    width,
    height,
    margin,
    data,
    color,
    legendXOffset = 15,
    legendYOffset = 15,
    boxSize = 15,
  },
) {
  // Legend
  let topGroup = selection
    .selectAll('.legend')
    .data([null])
    .join('g')
    .classed('legend', true)
    .attr(
      'transform',
      `translate(${legendXOffset}, ${legendYOffset})`,
    );
  topGroup
    .selectAll('.legend-item')
    .data(data)
    .join('g')
    .classed('legend-item', true)
    .attr('data-media', (d) => d.media)
    .attr('transform', (d, i) => {
      let jump = 0;

      return `translate(0, ${20 * i + jump})`;
    })
    .call((g) =>
      g
        .append('text')
        .text((d) => d.media)
        .attr('y', 12)
        .attr('x', 25),
    )
    .call((g) =>
      g
        .append('rect')
        .attr('width', boxSize)
        .attr('height', boxSize)
        .style('fill', (d, i) => color[d.media])
        .attr('stroke', (d) => color[d.media]),
    )
    .on('click', function (e, d) {
      // create check uncheck functionality
      let item = d3.select(this);
      // legend item
      let isUnchecked = !item.classed('unchecked');
      item.classed('unchecked', isUnchecked);

      // radar shapes
      let mediaValue = d.media;
      let radarShapes = selection.selectAll('.radar-shape');
      radarShapes
        .filter(function (d) {
          return (
            d3.select(this).attr('data-media') ===
            mediaValue
          );
        })
        .classed('unchecked', isUnchecked);

      // deal with hovers
      if (isUnchecked) {
        removeAllHovers(
          radarShapes,
          selection.selectAll('.legend-item'),
        );
      } else {
        item
          .node()
          .dispatchEvent(new MouseEvent('mouseover'));
      }
    });
}

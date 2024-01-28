import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TracerouteMonitor = ({ width, height }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const nodes = [
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' },
    ];

    const links = [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
      { source: 4, target: 5 },
    ];

    const simulation = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-100))
      .force('link', d3.forceLink(links).id(d => d.id))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    const node = svg
      .selectAll('circle')
      .data(nodes, d => d.id)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2');

    const label = svg
      .selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .text(d => d.label)
      .attr('dy', -15) // Adjusted to move the label above the node
      .attr('text-anchor', 'middle')
      .attr('fill', 'gray')
      .style('pointer-events', 'none'); // Disable pointer events on labels
    
    node.on('mouseover', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', 'orange') // Change the node color on mouseover
            .attr('r', 12); // Increase the node size on mouseover
    
        // Select the corresponding label and update it
        const correspondingLabel = label.filter(labelData => labelData.id === d.id);
        correspondingLabel.transition()
            .duration(200)
            .attr('fill', 'orange') // Change the label color on mouseover
            .attr('font-size', 30) // Increase the label font size on mouseover
            .attr('cy', d => Math.max(5, Math.min(height - 15, d.y - 15))) // Move the node up by 5 px
            .style('cursor', 'pointer'); // Add pointer cursor on mouseover
            
    })
    .on('mouseout', function (event, d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('fill', '#69b3a2') // Restore the original node color on mouseout
            .attr('r', 10); // Restore the original node size on mouseout
    
        // Select the corresponding label and update it
        const correspondingLabel = label.filter(labelData => labelData.id === d.id);
        correspondingLabel.transition()
            .duration(200)
            .attr('fill', 'white') // Restore the original label color on mouseout
            .attr('font-size', 12); // Restore the original label font size on mouseout
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => Math.max(5, Math.min(width - 5, d.source.x)))
        .attr('y1', d => Math.max(5, Math.min(height - 5, d.source.y)))
        .attr('x2', d => Math.max(5, Math.min(width - 5, d.target.x)))
        .attr('y2', d => Math.max(5, Math.min(height - 5, d.target.y)));

      node
        .attr('cx', d => Math.max(5, Math.min(width - 5, d.x)))
        .attr('cy', d => Math.max(5, Math.min(height - 5, d.y)));

      label
        .attr('x', d => Math.max(5, Math.min(width - 5, d.x)))
        .attr('y', d => Math.max(5, Math.min(height - 5, d.y)));
    });

    const orderedNodes = nodes.slice().sort((a, b) => a.label.localeCompare(b.label));
    const orderedLinks = [];
    for (let i = 0; i < orderedNodes.length - 1; i++) {
      orderedLinks.push({ source: orderedNodes[i].id, target: orderedNodes[i + 1].id });
    }

    link
      .data(orderedLinks)
      .attr('x1', d => Math.max(5, Math.min(width - 5, simulation.nodes().find(node => node.id === d.source).x)))
      .attr('y1', d => Math.max(5, Math.min(height - 5, simulation.nodes().find(node => node.id === d.source).y)))
      .attr('x2', d => Math.max(5, Math.min(width - 5, simulation.nodes().find(node => node.id === d.target).x)))
      .attr('y2', d => Math.max(5, Math.min(height - 5, simulation.nodes().find(node => node.id === d.target).y)));
  }, [width, height]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default TracerouteMonitor;

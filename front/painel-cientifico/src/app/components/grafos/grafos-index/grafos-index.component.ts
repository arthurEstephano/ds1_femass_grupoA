import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSet, Network } from 'vis';
import * as d3 from 'd3';


@Component({
  selector: 'app-grafos-index',
  templateUrl: './grafos-index.component.html',
  styleUrls: ['./grafos-index.component.css']
})
export class GrafosIndexComponent implements OnInit {
  @ViewChild('graphSvg', { static: true }) graphSvg: ElementRef<SVGElement>;


  constructor() { }

  ngOnInit(): void {


    const svg = d3.select(this.graphSvg.nativeElement);
    const margin = { top: 150, right: 20, bottom: 20, left: 200 };
    const width = +svg.attr('width') + margin.left + margin.right;
    const height = +svg.attr('height') + margin.top + margin.bottom;

    const data = {
      nodes: [
        { id: 'A' },
        { id: 'B' },
        { id: 'C' },
        { id: 'D' },
        { id: 'E' },
        { id: 'F' },
        // Adicione mais nós conforme necessário
      ],
      links: [
        { source: 'A', target: 'B' },
        { source: 'B', target: 'C' },
        { source: 'C', target: 'D' },
        { source: 'D', target: 'E' },
        { source: 'E', target: 'F' },
        // Adicione mais arestas conforme necessário
      ]
    };

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((d: any) => d.id))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .enter().append('circle')
      .attr('r', 8)
      .attr('fill', '#red')
      .on('click', this.handleClick); // Adicione o manipulador de eventos de clique


    simulation.nodes(data.nodes).on('tick', () => {
      link.attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
    });

    simulation.force('link').links(data.links);
  }

  handleClick(d: any) {
    console.log('Nó clicado:', d);
    // Execute a lógica desejada ao clicar no nó
  }


}

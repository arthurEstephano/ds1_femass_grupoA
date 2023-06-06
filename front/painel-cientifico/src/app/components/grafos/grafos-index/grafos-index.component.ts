import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataSet, Network } from 'vis';
import * as d3 from 'd3';
import { InstitutoService } from 'src/app/services/instituto.service';
import { IPesquisadorPesquisa } from 'src/app/models/pesquisador.model';


@Component({
  selector: 'app-grafos-index',
  templateUrl: './grafos-index.component.html',
  styleUrls: ['./grafos-index.component.css']
})
export class GrafosIndexComponent implements OnInit {
  @ViewChild('graphSvg', { static: true }) graphSvg: ElementRef<SVGElement>;

  public pesquisas;
  public institutos  = []
  public pesquisadores = []
  public dadosAssociados;
  tooltipVisible = true;
  tooltipText = '';

  constructor(private service: InstitutoService) { }

  async ngOnInit(): Promise<void> {
    // await this.getPesquisas()
    // this.getInstitutos()
    await this.getPesquisadores()

    // this.montarGrafo()
  }

  montarGrafo(){
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

  montarGrafos(objetos) {
    console.log('objetos', objetos);
    const svg = d3.select(this.graphSvg.nativeElement);
    const margin = { top: 150, right: 20, bottom: 20, left: 200 };
    const width = +svg.attr('width') + margin.left + margin.right;
    const height = +svg.attr('height') + margin.top + margin.bottom;

    const data = {
      nodes: [],
      links: []
    };

    const institutoMap = new Map(); // Mapa para agrupar pesquisadores por instituto

    // Verificar se objetos é um array ou objeto individual
    const objetosArray = Array.isArray(objetos) ? objetos : [objetos];

    objetosArray.forEach((objeto) => {
      console.log('objeto forEach', objeto);
      const instituto = objeto.instituto;
      const pesquisadores = objeto.pesquisadores;

      const institutoNode = { id: instituto };
      data.nodes.push(institutoNode);

      pesquisadores.forEach((pesquisador) => {
        const pesquisadorNode = { id: pesquisador.nome, name: pesquisador.nome ,pesquisas: pesquisador.pesquisas };
        data.nodes.push(pesquisadorNode);
        data.links.push({ source: institutoNode.id, target: pesquisadorNode.id });
      });
    });

    console.log('data', data)
    const radius = Math.min(width, height) * 0.2; // Raio do layout radial
    const centerX = width * 3;
    const centerY = height * 3;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d) => d.id).distance(200))
      .force('charge', d3.forceManyBody().strength(-2000))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('radial', d3.forceRadial(radius, centerX, centerY).strength(0.2))
      .force('collide', d3.forceCollide(16)); // Ajuste o valor do raio de colisão conforme necessário

    // Criar grupos para os nós e os links
    const nodeGroup = svg.append('g').attr('class', 'node-group');
    const linkGroup = svg.append('g').attr('class', 'link-group');

    const link = linkGroup.selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .style('z-index', -12);

    const node = nodeGroup.selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .style('z-index', 2)
      .style('cursor', 'pointer')
      .attr('r', (d) => (d.hasOwnProperty('pesquisas') ? 6 : 12))
      .attr('fill', (d) => (d.hasOwnProperty('pesquisas') ? 'red' : 'blue')) // Diferenciar cor dos nós dos pesquisadores e dos institutos
      .on('click', this.handleClick)
      .on('mouseover', (event, d) => this.handleMouseOver(event, d)) // Atualizar para usar arrow function para manter o escopo correto
      .on('mouseout', (event, d) => this.handleMouseOut(event, d)); // Atualizar para usar arrow function para manter o escopo correto


    const linkScale = 0.5;

    simulation.on('tick', () => {
      link
          .attr("x1", function(d) { return d.source.x * linkScale; })
          .attr("y1", function(d) { return d.source.y * linkScale; })
          .attr("x2", function(d) { return d.target.x * linkScale; })
          .attr("y2", function(d) { return d.target.y * linkScale; });

      node
           .attr("cx", function (d) { return (d.x+6) * linkScale; })
           .attr("cy", function(d) { return (d.y-6) * linkScale; });
    });

    simulation.force('link').links(data.links);
  }



  async getPesquisadores(){
    this.service.getPesquisadores().subscribe(
      res => {
        console.log('pesquisadore', res)
        this.pesquisadores = res;
        // this.classificarPorInstitutoENome();
        this.getPesquisas()

      }
    )
  }

  async getPesquisas(){

    this.service.getPesquisas().subscribe(res => {
      this.pesquisas = res;
      // this.categorizarPesquisas()
      this.associarPesquisas()

      console.log('pesquisas', res)
    },
    err => {
      console.log(err)
    })
  }



  getInstitutos(){
    this.service.getInstitutos().subscribe(
      res => {
        console.log('institutos', res)
        this.institutos = res;
      }
    )
  }

  classificarPorInstitutoENome() {
    const classificacao = {};

    this.pesquisadores.forEach((pesquisador) => {
      const { instituto, nome } = pesquisador;

      if (!classificacao[instituto]) {
        classificacao[instituto] = {
          instituto: instituto,
          pesquisadores: []
        };
      }

      classificacao[instituto].pesquisadores.push(nome);
    });

    console.log('classificação', classificacao);
  }

  associarPesquisas() {
    const pesquisadoresMap = new Map();

    // Criar um mapa com os pesquisadores
    this.pesquisadores.forEach(pesquisador => {
      pesquisadoresMap.set(pesquisador.nome, {
        nome: pesquisador.nome,
        instituto: pesquisador.instituto,
        pesquisas: []
      });
    });

    // Associar cada pesquisa ao pesquisador correspondente
    this.pesquisas.forEach(pesquisa => {
      pesquisa.pesquisadores.forEach(pesquisadorNome => {
        if (pesquisadoresMap.has(pesquisadorNome)) {
          const pesquisador = pesquisadoresMap.get(pesquisadorNome);
          pesquisador.pesquisas.push(pesquisa);
        }
      });
    });

    // Categorizar as pesquisas por instituto
    const categorias = [];
    pesquisadoresMap.forEach(pesquisador => {
      const instituto = pesquisador.instituto;
      if (!categorias[instituto]) {
        categorias[instituto] = [];
      }
      categorias[instituto].push(pesquisador);
    });

    this.dadosAssociados = categorias;
    console.log('pesquisadores x institutos x pesquisas', this.dadosAssociados)
    let dadosParaGrafo = [];
    // this.dadosAssociados.for(dados => {
    //   this.montarGrafos(dados)
    // });
    for (const key in this.dadosAssociados) {
      dadosParaGrafo.push(this.dadosAssociados[key])
    }
    console.log('dados para grafo', dadosParaGrafo)

    const dadosAgrupados = [];

    const institutoMap = new Map(); // Mapa para agrupar pesquisadores por instituto

    dadosParaGrafo.forEach((objeto) => {
      objeto.forEach(element => {
        console.log("objeti", element)

        const instituto = element.instituto;
        const pesquisador = { nome: element.nome, pesquisas: element.pesquisas.length };

        if (institutoMap.has(instituto)) {
          institutoMap.get(instituto).push(pesquisador);
        } else {
          institutoMap.set(instituto, [pesquisador]);
        }
      });
    });

    institutoMap.forEach((pesquisadores, instituto) => {
      const institutoData = {
        instituto: instituto,
        pesquisadores: pesquisadores
      };
      dadosAgrupados.push(institutoData);
    });

    console.log('dados', dadosAgrupados)
    this.montarGrafos(dadosAgrupados)
  }

  handleMouseOver(event: any, d: any) {
    // Exibir o nome do nó
    console.log('d', d)
    this.tooltipText = `${d.id} ${d.pesquisas ? '- ' + d.pesquisas + ' pesquisas' : ''}`;
    this.tooltipVisible = true;
  }

  handleMouseOut(event: any, d: any) {
    // Ocultar o nome do nó
    this.tooltipVisible = false;
  }

  handleClick(d: any) {
    console.log('Nó clicado:', d);
    // Execute a lógica desejada ao clicar no nó
  }

  categorizarPesquisas() {
    const categorias = [];

    this.pesquisas.forEach((pesquisa) => {
      pesquisa.pesquisadores.forEach((pesquisador) => {
        const categoriaExistente = categorias.find((categoria) => categoria.pesquisador === pesquisador);
        if (categoriaExistente) {
          categoriaExistente.pesquisas.push(pesquisa);
        } else {
          categorias.push({
            pesquisador: pesquisador,
            pesquisas: [pesquisa]
          });
        }
      });
    });

    console.log('categorias pesquisadores', categorias);
  }

}

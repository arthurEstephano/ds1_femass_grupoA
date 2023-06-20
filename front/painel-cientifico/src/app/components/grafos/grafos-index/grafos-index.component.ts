import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataSet, Network } from 'vis';
import * as d3 from 'd3';
import { zoom } from 'd3-zoom';
import { InstitutoService } from 'src/app/services/instituto.service';
import { IPesquisador, IPesquisadorPesquisa } from 'src/app/models/pesquisador.model';


@Component({
  selector: 'app-grafos-index',
  templateUrl: './grafos-index.component.html',
  styleUrls: ['./grafos-index.component.css']
})
export class GrafosIndexComponent implements OnInit {
  @ViewChild('graphSvg', { static: true }) graphSvg: ElementRef<SVGElement>;

  public pesquisas;
  public pesquisasFiltradas;
  public institutos  = []
  public institutosFiltrados  = []
  public pesquisadores = []
  public pesquisadoresFiltrados = []
  public dadosAssociados;
  tooltipVisible = true;
  tooltipText = '';
  public tipoProducoes = ["Artigo Publicado","Livro Publicado","Capítulo de Livro"];
  public tipoComunicacao = null;
  public tipoVertice = null;
  public tooTipsFiltros = [];
  public tooTipsFiltrosInstitutos = [];
  public initialWeightNode = {x: -6, y: -6, width: 12, height: 12};
  public initialBoundingLink = {x: 0, y: 0, width: 0, height: 0};
  public initialGraphWidth = 12
  public initialGraphHeight = 12;

  constructor(private service: InstitutoService, private renderer: Renderer2) { }

  async ngOnInit(): Promise<void> {
    // await this.getPesquisas()
    this.getInstitutos()
    this.getPesquisadores()

    // this.montarGrafo()
  }

  changeSelectProd(event:any, value?:string){
    // this.tipoComunicacao = value != null ? value :event.target.value;
    if(this.tooTipsFiltros.length == 0) this.pesquisasFiltradas = [];

    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    let item = this.tooTipsFiltros.indexOf(event.target.value)
    if(item == -1){
      this.tooTipsFiltros.push(event.target.value)
      this.adcionarPesquisas(event.target.value)
    }
    console.log('values', event.target.value)

  }

  changeTipoDeVertice(event){
    this.tipoVertice = event.target.value
    console.log(this.tipoVertice)
    this.associarPesquisas(this.tipoVertice)
  }

  adcionarPesquisas(item){
    let pesquisasF = this.pesquisas.filter( pesquisa => {
      return pesquisa.tipo == item
    })
    console.log('this.pesquisas F', pesquisasF)
    this.pesquisasFiltradas.push(...pesquisasF)
    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    this.associarPesquisas()
  }

  removerPesquisas(item){
    console.log('dentro de remover')
    this.pesquisasFiltradas = this.pesquisasFiltradas.filter( pesquisa => {
      return pesquisa.tipo != item
    })
    if(this.tooTipsFiltros.length < 1){
      this.pesquisasFiltradas = this.pesquisas
    }
    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    this.associarPesquisas()
  }

  removeTooTip(item){
    this.tooTipsFiltros = this.tooTipsFiltros.filter(tooltip => {
      return item != tooltip
    })
    this.removerPesquisas(item)
  }

  getPesquisadores(){
    this.service.getPesquisadores().subscribe(
      res => {
        console.log('pesquisadore', res)
        this.pesquisadores = res;
        // this.classificarPorInstitutoENome();
        this.getPesquisas()

      }
    )
  }

  getPesquisas(){

    this.service.getPesquisas().subscribe(res => {
      this.pesquisas = res;
      this.pesquisasFiltradas = res;
      // this.categorizarPesquisas()
      this.associarPesquisas()
      // this.montarGrafos(res)
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

  associarPesquisas(tipo?:string) {
    this.clear()
    let pesquisadoresMap = new Map();

    // Criar um mapa com os pesquisadores
    this.pesquisadores.forEach(pesquisador => {
      pesquisadoresMap.set(pesquisador.nome, {
        nome: pesquisador.nome,
        instituto: pesquisador.instituto,
        pesquisas: []
      });
    });

    // Associar cada pesquisa ao pesquisador correspondente
    this.pesquisasFiltradas.forEach(pesquisa => {
      pesquisa.pesquisadores.forEach(pesquisadorNome => {
        if (pesquisadoresMap.has(pesquisadorNome)) {
          const pesquisador = pesquisadoresMap.get(pesquisadorNome);
          pesquisador.pesquisas.push(pesquisa);
        }
      });
    });

    console.log( 'pesquisadores.map', pesquisadoresMap)

    const arrayAssociado = Array.from(pesquisadoresMap.values())
    const agrupadosPorInstituto = arrayAssociado.reduce((agrupados, item) => {
      const instituto = item.instituto;
      if (!agrupados[instituto]) {
        agrupados[instituto] = [];
      }
      agrupados[instituto].push(item);
      return agrupados;
    }, {});

    // if(this.tipoVertice == 'Pesquisadore')
    // this.montarGrafosPesquisadores(pesquisadoresMap)
    console.log('dados por instituto', agrupadosPorInstituto)
    this.tipoVertice != null && this.tipoVertice == 'Pesquisador' ? this.montarGrafosPesquisadores(pesquisadoresMap) : this.montarGrafos(agrupadosPorInstituto)

  }

  clear(){
    let svgElement = this.graphSvg.nativeElement;

    // Remover todos os filhos do elemento SVG
    while (svgElement.firstChild) {
      svgElement.removeChild(svgElement.firstChild);
    }
  }

  montarGrafos(objetos) {
    // console.log('grafo instituição')
    let svg = d3.select(this.graphSvg.nativeElement);
    svg.selectAll('*').remove();
    svg.attr('width', this.initialGraphWidth)
      .attr('height', this.initialGraphHeight);
    svg.style('paint-order', 'stroke fill');
    // console.log('svg width', svg.attr('width'))
    const margin = { top: 150, right: 20, bottom: 20, left: 200 };
    const width = +svg.attr('width') + margin.left + margin.right;
    const height = +svg.attr('height') + margin.top + margin.bottom;

    const data = {
      nodes: [],
      links: []
    };

    for(const key in objetos) {
      // console.log('objeto for in', objetos[key])
      objetos[key].forEach((objeto) => {
        const instituto = objeto.instituto;
        const pesquisas = objeto.pesquisas;

        const pesquisadorNode = { id: instituto , name: instituto, pesquisas: pesquisas, tipo:'1' };
        let filtered = data.nodes.find(node => {
          // console.log('node id', node)
          return node.id == pesquisadorNode.id
        })
        // console.log('filtered', filtered)
        if(!filtered){
          data.nodes.push(pesquisadorNode);
        }

        pesquisas.forEach((pesquisa) => {
          const pesquisaNode = { id: pesquisa.nome, name: pesquisa.nome, instituto: instituto };
          data.nodes.push(pesquisaNode);
          // console.log('links',{ source: instituto, target: pesquisa.nome })
          data.links.push({ source: instituto, target: pesquisa.nome });
        });
      })
    }

    const radius = Math.min(width, height) * 0.2;
    const centerX = width * 5;
    const centerY = height * 4;

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d) => d.id).distance(25))
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('radial', d3.forceRadial(radius, centerX, centerY).strength(0.2))
      .force('collide', d3.forceCollide(16));

    const nodeGroup = svg.append('g').attr('class', 'node-group');
    const linkGroup = svg.append('g').attr('class', 'link-group');

    const link = linkGroup.selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .style('pointer-events', 'none');

    // console.log('data', data)
    const node = nodeGroup.selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .style('z-index', 2)
      .style('cursor', 'pointer')
      .attr('r', (d) => (d.tipo !== '1' ? 3 : 6))
      .attr('fill', (d) => (d.tipo === '1' ? 'red' : 'blue'))
      .on('click', this.handleClick)
      .on('mouseover', (event, d) => this.handleMouseOver(event, d))
      .on('mouseout', (event, d) => this.handleMouseOut(event, d));

    const linkScale = 0.5;
    linkGroup.raise();

    let graphWidth = this.initialGraphWidth
    let graphHeight = this.initialGraphHeight
    let nodeBoundingBox = nodeGroup.node().getBBox();
    let linkBoundingBox = linkGroup.node().getBBox();
    simulation.on('tick', () => {
      nodeBoundingBox = nodeGroup.node().getBBox();
      linkBoundingBox = linkGroup.node().getBBox();

      graphWidth = nodeBoundingBox.width + linkBoundingBox.width;
      graphHeight = nodeBoundingBox.height + linkBoundingBox.height;

      if(this.tooTipsFiltros.includes("Livro Publicado")){
        graphWidth = 2270.1;
        graphHeight = 2270.1
      }

      svg.attr('width', graphWidth)
         .attr('height', graphHeight);

      link.attr('x1', (d) => (d.source.x - nodeBoundingBox.x) * linkScale)
          .attr('y1', (d) => (d.source.y - nodeBoundingBox.y) * linkScale)
          .attr('x2', (d) => (d.target.x - nodeBoundingBox.x) * linkScale)
          .attr('y2', (d) => (d.target.y - nodeBoundingBox.y) * linkScale);

      node.attr('cx', (d) => (d.x - nodeBoundingBox.x + 6) * linkScale)
          .attr('cy', (d) => (d.y - nodeBoundingBox.y - 6) * linkScale);
    });


    simulation.force('link').links(data.links);
  }

  montarGrafosPesquisadores(objetos) {
    console.log('grafo pesquisador')
    // console.log('objetos grafos pesquisador', objetos);
    let svg = d3.select(this.graphSvg.nativeElement);

    svg.selectAll('*').remove();
    svg.attr('width', this.initialGraphWidth)
      .attr('height', this.initialGraphHeight);
    svg.style('paint-order', 'stroke fill');
    const margin = { top: 150, right: 20, bottom: 20, left: 200 };
    const width = +svg.attr('width') + margin.left + margin.right;
    const height = +svg.attr('height') + margin.top + margin.bottom;

    const data = {
      nodes: [],
      links: []
    };

    objetos.forEach((objeto) => {
      // console.log('objeto forEach', objeto);
      const pesquisador = objeto.nome;
      const pesquisas = objeto.pesquisas;

      const pesquisadorNode = { id: pesquisador, name: pesquisador, pesquisas: pesquisas, tipo:'1' };
      data.nodes.push(pesquisadorNode);

      pesquisas.forEach((pesquisa) => {
        const pesquisaNode = { id: pesquisa.nome, name: pesquisa.nome, pesquisas: pesquisa.pesquisadores };
        data.nodes.push(pesquisaNode);
        data.links.push({ source: pesquisadorNode.id, target: pesquisaNode.id });
      });
    });

    // console.log('data', data);
    let radius = Math.min(width, height) * 0.2;
    let centerX = width * 7;
    let centerY = height * 7;

    let simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(centerX, centerY))
      .force('radial', d3.forceRadial(radius, centerX, centerY).strength(0.2))
      .force('collide', d3.forceCollide(16));

    let nodeGroup = svg.append('g').attr('class', 'node-group');
    let linkGroup = svg.append('g').attr('class', 'link-group');

    let link = linkGroup.selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .style('pointer-events', 'none');

    // console.log('data', data.nodes)
    let node = nodeGroup.selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .style('z-index', 2)
      .style('cursor', 'pointer')
      .attr('r', (d) => (d.tipo !== '1' ? 3 : 6))
      .attr('fill', (d) => (d.tipo === '1' ? 'red' : 'blue'))
      .on('click', this.handleClick)
      .on('mouseover', (event, d) => this.handleMouseOver(event, d))
      .on('mouseout', (event, d) => this.handleMouseOut(event, d));

    let linkScale = 0.5;
    linkGroup.raise();
    let graphWidth = this.initialGraphWidth
    let graphHeight = this.initialGraphHeight
    simulation.on('tick', () => {
      let nodeBoundingBox = nodeGroup.node().getBBox();
      let linkBoundingBox = linkGroup.node().getBBox();
      // console.log('nodeBoundingBox', nodeBoundingBox)
      // console.log('linkBoundingBox', linkBoundingBox)
      graphWidth = nodeBoundingBox.width + linkBoundingBox.width;
      graphHeight = nodeBoundingBox.height + linkBoundingBox.height;

      if(this.tooTipsFiltros.includes("Livro Publicado")){
        graphWidth = 2270.1;
        graphHeight = 2270.1
      }

      svg.attr('width', graphWidth)
         .attr('height', graphHeight);

      link.attr('x1', (d) => (d.source.x - nodeBoundingBox.x) * linkScale)
          .attr('y1', (d) => (d.source.y - nodeBoundingBox.y) * linkScale)
          .attr('x2', (d) => (d.target.x - nodeBoundingBox.x) * linkScale)
          .attr('y2', (d) => (d.target.y - nodeBoundingBox.y) * linkScale);

      node.attr('cx', (d) => (d.x - nodeBoundingBox.x + 6) * linkScale)
          .attr('cy', (d) => (d.y - nodeBoundingBox.y - 6) * linkScale);
    });

    simulation.force('link').links(data.links);
  }

  handleMouseOver(event: any, d: any) {
    this.tooltipText = `${d.id}`;
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
    let categorias = [];

    this.pesquisasFiltradas.forEach((pesquisa) => {
      pesquisa.pesquisadores.forEach((pesquisador) => {
        let categoriaExistente = categorias.find((categoria) => categoria.pesquisador === pesquisador);
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

    // console.log('categorias pesquisadores', categorias);
  }

  changeSelect(event){
    console.log('item', event.target.value)
    if(this.tooTipsFiltrosInstitutos.length == 0) this.pesquisasFiltradas = [];

    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    let item = this.tooTipsFiltrosInstitutos.indexOf(event.target.value)
    if(item == -1){
      this.tooTipsFiltros.push(event.target.value)
      this.associarPesquisas(event.target.value)
    }
  }

}

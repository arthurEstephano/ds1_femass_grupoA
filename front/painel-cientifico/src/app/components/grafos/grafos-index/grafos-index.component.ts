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
  public toolTipsFiltros = [];
  public toolTipsFiltrosInstitutos = [];
  public toolTipsFiltrosPesquisadores = [];
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
    if(this.toolTipsFiltros.length == 0) this.pesquisasFiltradas = [];

    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    let item = this.toolTipsFiltros.indexOf(event.target.value)
    if(item == -1){
      this.toolTipsFiltros.push(event.target.value)
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
    if(this.toolTipsFiltros.length < 1){
      this.pesquisasFiltradas = this.pesquisas
    }
    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    this.associarPesquisas()
  }

  getPesquisadores(){
    this.pesquisadores =  [
      {
          "id": 1,
          "identificador_lattes": "0023809873085852",
          "nome": "Rodrigo Salvador Monteiro",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 2,
          "identificador_lattes": "0047810385809553",
          "nome": "Aleksandra Menezes de Oliveira",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 3,
          "identificador_lattes": "0053636364868790",
          "nome": "Lismeia Raimundo Soares",
          "instituto": "FACULDADE Z",
          "pesquisa": null
      },
      {
          "id": 4,
          "identificador_lattes": "0024160866319507",
          "nome": "Leonardo da Silva Gasparini",
          "instituto": "FACULDADE S",
          "pesquisa": null
      },
      {
          "id": 5,
          "identificador_lattes": "0028876341054325",
          "nome": "Marcelo dos Santos Magalh�es",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 6,
          "identificador_lattes": "0066576690749759",
          "nome": "Gizele da Concei��o Soares Martins",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 7,
          "identificador_lattes": "0082487176176434",
          "nome": "Marialda Moreira Christoffel",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 8,
          "identificador_lattes": "0110662125645595",
          "nome": "Rog�rio Ferreira de Moraes",
          "instituto": "FACULDADE Z",
          "pesquisa": null
      },
      {
          "id": 9,
          "identificador_lattes": "0112621452737067",
          "nome": "Vin�cius Ant�nio Gomes Marques",
          "instituto": "FACULDADE S",
          "pesquisa": null
      },
      {
          "id": 10,
          "identificador_lattes": "0161902355523060",
          "nome": "Vinicios Batista Pereira",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 11,
          "identificador_lattes": "0194631586754988",
          "nome": "Michael Maia Mincarone",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 12,
          "identificador_lattes": "0235080730138338",
          "nome": "Rute Ramos da Silva Costa",
          "instituto": "FACULDADE Z",
          "pesquisa": null
      },
      {
          "id": 13,
          "identificador_lattes": "0263660448893625",
          "nome": "Juss�ra Mathias Netto Khouri",
          "instituto": "FACULDADE S",
          "pesquisa": null
      },
      {
          "id": 14,
          "identificador_lattes": "0329773854976808",
          "nome": "Patricia Regina Affonso de Siqueira",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 15,
          "identificador_lattes": "0348923590713594",
          "nome": "M�rcio Jos� de Medeiros",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 16,
          "identificador_lattes": "0485361810192703",
          "nome": "Lu�s Claudio de Carvalho",
          "instituto": "FACULDADE Z",
          "pesquisa": null
      },
      {
          "id": 17,
          "identificador_lattes": "0491984479926888",
          "nome": "Rafael Malheiro da Silva do Amaral Ferreira",
          "instituto": "FACULDADE S",
          "pesquisa": null
      },
      {
          "id": 18,
          "identificador_lattes": "0549723858731158",
          "nome": "Danielle Marques de Araujo Stapelfeldt",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 19,
          "identificador_lattes": "0559800226477492",
          "nome": "Vin�cius Albano Ara�jo",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 20,
          "identificador_lattes": "0600549075776976",
          "nome": "Juliana Milanez",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 21,
          "identificador_lattes": "0604237405440586",
          "nome": "Glaucimara Riguete de Souza Soares",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 22,
          "identificador_lattes": "0658455060876989",
          "nome": "Leonardo Lima dos Santos",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 23,
          "identificador_lattes": "0659726776097432",
          "nome": "Karine da Silva Verdoorn",
          "instituto": "FACULDADE S",
          "pesquisa": null
      },
      {
          "id": 25,
          "identificador_lattes": "0692400140993944",
          "nome": "Raquel Silva de Paiva",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 26,
          "identificador_lattes": "0676650998291996",
          "nome": "Fernando Fernandes Morgado",
          "instituto": "FACULDADE Y",
          "pesquisa": null
      },
      {
          "id": 27,
          "identificador_lattes": "0743793296062293",
          "nome": "Daniel Cardoso Moraes de Oliveira",
          "instituto": "FACULDADE X",
          "pesquisa": null
      },
      {
          "id": 28,
          "identificador_lattes": "0770145420421898",
          "nome": "L�sia M�nica de Souza Gestinari",
          "instituto": "FACULDADE Z",
          "pesquisa": null
      },
      {
          "id": 29,
          "identificador_lattes": "0781779929562675",
          "nome": "Camila Rolim Laricchia",
          "instituto": "FACULDADE Z",
          "pesquisa": null
      },
      {
          "id": 30,
          "identificador_lattes": "0814717344017544",
          "nome": "Kate Cerqueira Revoredo",
          "instituto": "FACULDADE S",
          "pesquisa": null
      }
    ]

    this.pesquisadoresFiltrados = this.pesquisadores
    // this.service.getPesquisadores().subscribe(
      //   res => {
        //     console.log('pesquisadore', res)
        // this.pesquisadores = res;
        // this.pesquisadoresFiltrados = this.pesquisadores
    //     // this.classificarPorInstitutoENome();
        this.getPesquisas()

    //   }
    // )
  }

  getPesquisas(){

    // this.service.getPesquisas().subscribe(res => {
    //   this.pesquisas = res;
    //   this.pesquisasFiltradas = res;
    //   // this.categorizarPesquisas()
    //   this.associarPesquisas()
    //   // this.montarGrafos(res)
    //   console.log('pesquisas', res)
    // },
    // err => {
    //   console.log(err)
    // })

    this.pesquisas =  [
      {
          "id": 1,
          "tipo": "Artigo Publicado",
          "nome": "Improving tests infrastructure through a model-based approach",
          "ano": 2011,
          "periodico": "Software Engineering Notes",
          "volume": 36,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Rodrigo Salvador Monteiro"
          ]
      },
      {
          "id": 2,
          "tipo": "Artigo Publicado",
          "nome": "Polyline Spatial Join Evaluation Using Raster Approximation",
          "ano": 2003,
          "periodico": "Geoinformatica (Dordrecht)",
          "volume": 7,
          "paginaInicial": 315,
          "paginaFinal": 336,
          "pesquisadores": [
              "Rodrigo Salvador Monteiro"
          ]
      },
      {
          "id": 3,
          "tipo": "Capítulo de Livro",
          "nome": "DWFIST: The Data Warehouse of Frequent Itemsets Tactics Approach",
          "ano": 2006,
          "periodico": "Processing and Managing Complex Data for Decision Support",
          "volume": null,
          "paginaInicial": 185,
          "paginaFinal": 214,
          "pesquisadores": [
              "Rodrigo Salvador Monteiro"
          ]
      },
      {
          "id": 4,
          "tipo": "Capítulo de Livro",
          "nome": "SICONV - Sistema de Gest�o de Conv�nios e Contratos de Repasse",
          "ano": 2010,
          "periodico": "Panorama da Interoperabilidade no Brasil",
          "volume": null,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Rodrigo Salvador Monteiro"
          ]
      },
      {
          "id": 5,
          "tipo": "Capítulo de Livro",
          "nome": "Strengthening of the Sociotechnical Approach in Information Systems",
          "ano": 2017,
          "periodico": "GranDSI-BR Grand Research Challenges in Information Systems in Brazil 2016 - 2026",
          "volume": 1,
          "paginaInicial": 133,
          "paginaFinal": 147,
          "pesquisadores": [
              "Rodrigo Salvador Monteiro"
          ]
      },
      {
          "id": 6,
          "tipo": "Capítulo de Livro",
          "nome": "Exploring Calendar-Based Pattern Mining in Data Streams",
          "ano": 2009,
          "periodico": "Complex data warehousing and knowledge discovery for advanced retrieval development: innovative methods and applications",
          "volume": null,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Rodrigo Salvador Monteiro"
          ]
      },
      {
          "id": 7,
          "tipo": "Artigo Publicado",
          "nome": "Cuticular Architecture of Hassalstrongylus epsilon (Nematoda: Trichostrongyloidea)",
          "ano": 2003,
          "periodico": "Parasitology Research",
          "volume": 90,
          "paginaInicial": 280,
          "paginaFinal": 286,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 8,
          "tipo": "Artigo Publicado",
          "nome": "Preliminary observations on fluids incubated with Wuchereria bancrofti",
          "ano": 2008,
          "periodico": "Revista da Sociedade Brasileira de Medicina Tropical (Impresso)",
          "volume": 41,
          "paginaInicial": 209,
          "paginaFinal": 211,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 9,
          "tipo": "Artigo Publicado",
          "nome": "Comparative analysis of a chemotherapy effect on the cuticular surface of Wuchereria bancrofti adult worms in vivo",
          "ano": 2007,
          "periodico": "Parasitology Research (1987. Print)",
          "volume": 101,
          "paginaInicial": 1311,
          "paginaFinal": 1317,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 10,
          "tipo": "Artigo Publicado",
          "nome": "Light and scanning electron microscopy of sporocysts of Eurytrema coelomaticum (Giard et Billet, 1892) Looss, 1907",
          "ano": 2011,
          "periodico": "Veterinary Parasitology (Print)",
          "volume": 177,
          "paginaInicial": 72,
          "paginaFinal": 78,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 11,
          "tipo": "Artigo Publicado",
          "nome": "Effects of albendazole on Litomosoides chagasfilhoi (Nematoda: Filarioidea) females in vivo",
          "ano": 2010,
          "periodico": "Parasitology Research (1987. Print)",
          "volume": 107,
          "paginaInicial": 817,
          "paginaFinal": 826,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 12,
          "tipo": "Artigo Publicado",
          "nome": "Ultrastructural analysis of Wuchereria bancrofti (Nematoda: Filarioidea) body wall",
          "ano": 2010,
          "periodico": "Micron (Oxford. 1993)",
          "volume": 41,
          "paginaInicial": 526,
          "paginaFinal": 531,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 13,
          "tipo": "Artigo Publicado",
          "nome": "Further description of Cruzia tentaculata (Rudolphi, 1819) Travassos, 1917 (Nematoda: Cruzidae) by light and scanning electron microscopy",
          "ano": 2009,
          "periodico": "Parasitology Research (1987. Print)",
          "volume": 104,
          "paginaInicial": 1207,
          "paginaFinal": 1211,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 14,
          "tipo": "Artigo Publicado",
          "nome": "The first description of eggs in the male reproductive system of Physaloptera bispiculata (Nematoda: Spiruroidaea)",
          "ano": 2010,
          "periodico": "Journal of Helminthology",
          "volume": null,
          "paginaInicial": 1,
          "paginaFinal": 4,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 15,
          "tipo": "Artigo Publicado",
          "nome": "Ultrastructure of the sporocysts of Eurytrema coelomaticum (Giard Et Billet, 1892) Looss, 1907",
          "ano": 2011,
          "periodico": "Veterinary Parasitology (Print)",
          "volume": 182,
          "paginaInicial": 201,
          "paginaFinal": 212,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 16,
          "tipo": "Artigo Publicado",
          "nome": "Cytochemical Analysis of the Body Wall of the Flounder Parasite Procamallanus (Spirocamallanus) halitrophus (Nematoda: Camallanidae)",
          "ano": 2012,
          "periodico": "Comparative Parasitology",
          "volume": 79,
          "paginaInicial": 173,
          "paginaFinal": 181,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 17,
          "tipo": "Artigo Publicado",
          "nome": "New Aspidoderidae species parasite of Didelphis aurita (Mammalia: Didelphidae): A light and scanning electron microscopy approach",
          "ano": 2014,
          "periodico": "Acta Tropica",
          "volume": 130,
          "paginaInicial": 162,
          "paginaFinal": 166,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 18,
          "tipo": "Artigo Publicado",
          "nome": "Evaluation of Praziquantel Effects on Echinostoma paraensei Ultrastructure",
          "ano": 2013,
          "periodico": "Veterinary Parasitology (Print)",
          "volume": 194,
          "paginaInicial": 16,
          "paginaFinal": 25,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 19,
          "tipo": "Artigo Publicado",
          "nome": "New insight into the morphology of Eurytrema coelomaticum (Trematoda, Dicrocoeliidae) cercariae by light, scanning, and transmission electron microscopies",
          "ano": 2012,
          "periodico": "Parasitology Research (1987. Internet)",
          "volume": 111,
          "paginaInicial": 1437,
          "paginaFinal": 1445,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 20,
          "tipo": "Artigo Publicado",
          "nome": "A new species of Trichuris from Thrichomys apereoides (Rodentia: Echimyidae) in Brazil: Morphological and histological studies",
          "ano": 2011,
          "periodico": "Veterinary Parasitology (Print)",
          "volume": 176,
          "paginaInicial": 226,
          "paginaFinal": 235,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 21,
          "tipo": "Artigo Publicado",
          "nome": "Morphological aspects of Angiostrongylus costaricensis by light and scanning electron microscopy",
          "ano": 2013,
          "periodico": "Acta Tropica",
          "volume": 127,
          "paginaInicial": 191,
          "paginaFinal": 198,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 22,
          "tipo": "Artigo Publicado",
          "nome": "Additional study of the morphology of eggs and miracidia of Eurytrema coelomaticum (Trematoda)",
          "ano": 2015,
          "periodico": "Helminthologia",
          "volume": 52,
          "paginaInicial": 244,
          "paginaFinal": 251,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 23,
          "tipo": "Artigo Publicado",
          "nome": "Histopathological changes in the kidneys of vertebrate hosts infected naturally and experimentally with Paratanaisia bragai (Trematoda, Digenea)",
          "ano": 2015,
          "periodico": "Revista Brasileira de Parasitologia Veterin�ria (Online)",
          "volume": 24,
          "paginaInicial": 241,
          "paginaFinal": 246,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 24,
          "tipo": "Artigo Publicado",
          "nome": "Ultrastructural and cytochemical characterization of T1 and T2 secretory bodies from the tegument of Echinostoma paraensei",
          "ano": 2015,
          "periodico": "Micron (Oxford. 1993)",
          "volume": 80,
          "paginaInicial": 59,
          "paginaFinal": 65,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 25,
          "tipo": "Artigo Publicado",
          "nome": "Ultraestructural study of effects of alkylphospholipid analogs against nematodes",
          "ano": 2018,
          "periodico": "EXPERIMENTAL PARASITOLOGY",
          "volume": 187,
          "paginaInicial": 49,
          "paginaFinal": 58,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 26,
          "tipo": "Artigo Publicado",
          "nome": "FIRST REPORT ON SURFACE ASPECTS OF Mansonella ozzardi (SPIRURIDA: ONCHOCERCIDAE) MICROFILARIAE BY SCANNING ELECTRON MICROSCOPY: PRELIMINARY RESULTS",
          "ano": 2018,
          "periodico": "REVISTA DE PATOLOGIA TROPICAL (ONLINE)",
          "volume": 47,
          "paginaInicial": 195,
          "paginaFinal": null,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 27,
          "tipo": "Artigo Publicado",
          "nome": "A new morphological analysis of eggs and miracidia of Paratanaisia bragai (Digenea: Eucotylidae)",
          "ano": 2020,
          "periodico": "BIOLOGIA",
          "volume": 0,
          "paginaInicial": 0,
          "paginaFinal": null,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 28,
          "tipo": "Artigo Publicado",
          "nome": "Further description of Aspidodera raillieti (Nematoda: Aspidoderidae) from Didelphis marsupialis (Mammalia: Didelphidae) by light and scanning electron microscopy.",
          "ano": 2007,
          "periodico": "Parasitology Research (1987. Print)",
          "volume": 101,
          "paginaInicial": 1331,
          "paginaFinal": 1336,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 29,
          "tipo": "Capítulo de Livro",
          "nome": "Echinostoma",
          "ano": 2018,
          "periodico": "Handbook of Foodborne Diseases",
          "volume": null,
          "paginaInicial": 737,
          "paginaFinal": null,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 30,
          "tipo": "Capítulo de Livro",
          "nome": "Contribui��o ao estudo do parasitismo por helmintos em bonito-listrado",
          "ano": 2020,
          "periodico": "Sustentabilidade da Pesca do Bonito-Listrado no Brasil",
          "volume": 1,
          "paginaInicial": 122,
          "paginaFinal": 134,
          "pesquisadores": [
              "Aleksandra Menezes de Oliveira"
          ]
      },
      {
          "id": 31,
          "tipo": "Artigo Publicado",
          "nome": "DISCORDANCE BETWEEN BODY MASS INDEX AND ANTHROPOMETRIC MEASUREMENTS AMONG HIV-1-INFECTED PATIENTS ON ANTIRETROVIRAL THERAPY AND WITH LIPOATROPHY/LIPOHYPERTROPHY SYNDROME",
          "ano": 2015,
          "periodico": "REVISTA DO INSTITUTO DE MEDICINA TROPICAL DE SAO PAULO",
          "volume": 57,
          "paginaInicial": 105,
          "paginaFinal": 110,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 32,
          "tipo": "Artigo Publicado",
          "nome": "A Suplementa��o de &#946;-hidroxi-&#946;-metilbutirato em idosos com obesidade sarcop�ncia.",
          "ano": 2015,
          "periodico": "REVISTA BRASILEIRA DE NUTRI��O CL�NICA",
          "volume": 30,
          "paginaInicial": 252,
          "paginaFinal": 255,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 33,
          "tipo": "Artigo Publicado",
          "nome": "Altera��es bioqu�micas em pessoas com HIV/AIDS no munic�pio de Maca�, Rio de Janeiro, Brasil",
          "ano": 2018,
          "periodico": "Acta Brasiliensis",
          "volume": 2,
          "paginaInicial": 80,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 34,
          "tipo": "Artigo Publicado",
          "nome": "Determination of vitamin D in tears of healthy individuals by the electrochemiluminescence method",
          "ano": 2019,
          "periodico": "JOURNAL OF CLINICAL LABORATORY ANALYSIS",
          "volume": 1,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 35,
          "tipo": "Artigo Publicado",
          "nome": "Low bone mineral density among HIV-infected patients in Brazil",
          "ano": 2017,
          "periodico": "REVISTA DO INSTITUTO DE MEDICINA TROPICAL DE S�O PAULO",
          "volume": 59,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 36,
          "tipo": "Artigo Publicado",
          "nome": "Self-reported lipodystrophy, nutritional, lipemic profile and its impact on the body image of HIV-1-infected persons, with and without antiretroviral therapy",
          "ano": 2019,
          "periodico": "AIDS CARE-PSYCHOLOGICAL AND SOCIO-MEDICAL ASPECTS OF AIDS/HIV",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 6,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 37,
          "tipo": "Artigo Publicado",
          "nome": "Association between changes in body fat distribution, biochemical profile, time of HIV diagnosis, and antiretroviral treatment in adults living with and without virus infection",
          "ano": 2020,
          "periodico": "REVISTA DA ASSOCIA��O M�DICA BRASILEIRA",
          "volume": 66,
          "paginaInicial": 67,
          "paginaFinal": 73,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 38,
          "tipo": "Artigo Publicado",
          "nome": "Frequ�ncia de lipodistrofia e fatores de risco para SARS COV 2 em pessoas vivendo com HIV",
          "ano": 2020,
          "periodico": "Boletim Ci�ncia Maca�",
          "volume": 1,
          "paginaInicial": 145,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 39,
          "tipo": "Artigo Publicado",
          "nome": "Projetos integrados de nutri��o e farm�cia em tempos de Covid 19: um relato de experi�ncia",
          "ano": 2021,
          "periodico": "Boletim Ci�ncia Maca�",
          "volume": 1,
          "paginaInicial": 177,
          "paginaFinal": 177,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 40,
          "tipo": "Artigo Publicado",
          "nome": "A interface ensino-pesquisa-extens�o na constru��o discente: relato de experi�ncia de um projeto universit�rio",
          "ano": 2021,
          "periodico": "Conecte-se! Revista Interdisciplinar de Extens�o",
          "volume": 5,
          "paginaInicial": 165,
          "paginaFinal": 172,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 41,
          "tipo": "Artigo Publicado",
          "nome": "Self-Corporal Image among People Living with HIV/AIDS with Lipodystrophy Syndrome in Brazil",
          "ano": 2022,
          "periodico": "WORLD JOURNAL OF AIDS",
          "volume": 12,
          "paginaInicial": 32,
          "paginaFinal": 42,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 42,
          "tipo": "Artigo Publicado",
          "nome": "Descri��o de instrumento de avalia��o do estado nutricional para pacientes hospitalizados (n�o cr�ticos) com Covid 19",
          "ano": 2021,
          "periodico": "Boletim Ci�ncia Maca�",
          "volume": 1,
          "paginaInicial": 160,
          "paginaFinal": 160,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 43,
          "tipo": "Livro Publicado",
          "nome": "Nutri��o Funcional - Segunda Edi��o",
          "ano": 2018,
          "periodico": "Editora Pay� Eireli",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 44,
          "tipo": "Capítulo de Livro",
          "nome": "Aspectos nutricionais, psicol�gicos e cuidados de enfermagem em pacientes HIV+",
          "ano": 2010,
          "periodico": "S�rie da pesquisa � Pr�tica Clinica -SPPC -  HIV/AIDS",
          "volume": 1,
          "paginaInicial": 85,
          "paginaFinal": 101,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 45,
          "tipo": "Capítulo de Livro",
          "nome": "CONDI��O CL�NICA DE PESSOAS VIVENDO COM HIV NO MUNIC�PIO DE MACA�-RJ",
          "ano": 2019,
          "periodico": "Ci�ncias da Sa�de: Da Teoria � Pr�tica 5",
          "volume": null,
          "paginaInicial": 154,
          "paginaFinal": 159,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 46,
          "tipo": "Capítulo de Livro",
          "nome": "Relato de experi�ncia do projeto Envelhecimento, Nutri��o e Promo��o da Sa�de - ENUSA",
          "ano": 2019,
          "periodico": "Saberes e experi�ncias de extens�o em promo��o da sa�de",
          "volume": 200,
          "paginaInicial": 7,
          "paginaFinal": 217,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 47,
          "tipo": "Capítulo de Livro",
          "nome": "Aspectos cl�nico-epidemiol�gicos, autopercep��o da imagem corporal e nutricionais de pessoas vivendo com HIV AIDS atendidos por um servi�o de assist�ncia especializada",
          "ano": 2021,
          "periodico": "Experi�ncias, sabores e afetos: dez anos do curso de Nutri��o do Campus UFRJ Maca�",
          "volume": 1,
          "paginaInicial": 200,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 48,
          "tipo": "Capítulo de Livro",
          "nome": "Estado nutricional e risco cardiovascular de pessoas vivendo com HIV em seguimento ambulatorial no munic�pio de Maca� RJ",
          "ano": 2021,
          "periodico": "Experi�ncias, sabores e afetos: dez anos do curso de Nutri��o do Campus UFRJ Maca�",
          "volume": 1,
          "paginaInicial": 226,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 49,
          "tipo": "Capítulo de Livro",
          "nome": "ASSOCIA��O ENTRE PERFIL ANTROPOM�TRICO, BIOQU�MICO EM PESSOAS VIVENDO COM HIV, LIPODISTROFIA E S�NDROME METAB�LICA EM ATENDIMENTO AMBULATORIAL",
          "ano": 2021,
          "periodico": "Nutri��o Experimental e Cl�nica e sua A��o Transformadora 2",
          "volume": null,
          "paginaInicial": 45,
          "paginaFinal": 56,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 50,
          "tipo": "Capítulo de Livro",
          "nome": "Imunidade, Covid 19 e C�ncer",
          "ano": 2020,
          "periodico": "Sistema Imunol�gico: Especificidades da COVID 19",
          "volume": 1,
          "paginaInicial": 34,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 51,
          "tipo": "Capítulo de Livro",
          "nome": "ESTUDO DA DISTOR��O DE IMAGEM E O FEEDBACK SOCIAL VIVENCIADO PELO INDIV�DUO COM A OP��O PELA CIRURGIA BARI�TRICA",
          "ano": 2021,
          "periodico": "Alimentos, nutri��o e sa�de 2",
          "volume": null,
          "paginaInicial": 168,
          "paginaFinal": 177,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 52,
          "tipo": "Capítulo de Livro",
          "nome": "Autopercep��o da imagem corporal e sua rela��o com vari�veis socioecon�micas, de sa�de e antropom�tricas de idosos",
          "ano": 2020,
          "periodico": "Sa�de, atividade f�sica, nutri��o e bem-estar: teoria e pr�tica",
          "volume": 2,
          "paginaInicial": 110,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 53,
          "tipo": "Capítulo de Livro",
          "nome": "Consumo de nutrientes antioxidantes e avalia��o do n�vel de conhecimento sobre c�ncer de adolescentes de uma unidade escolar do munic�pio de Maca� RJ",
          "ano": 2021,
          "periodico": "Experi�ncias, sabores e afetos: dez anos do curso de Nutri��o do Campus UFRJ Maca�",
          "volume": 1,
          "paginaInicial": 253,
          "paginaFinal": null,
          "pesquisadores": [
              "Lismeia Raimundo Soares"
          ]
      },
      {
          "id": 54,
          "tipo": "Artigo Publicado",
          "nome": "Hybrid parallel iterative sparse linear solver framework for reservoir geomechanical and flow simulation",
          "ano": 2021,
          "periodico": "Journal of Computational Science",
          "volume": 51,
          "paginaInicial": 101330,
          "paginaFinal": null,
          "pesquisadores": [
              "Leonardo da Silva Gasparini"
          ]
      },
      {
          "id": 55,
          "tipo": "Capítulo de Livro",
          "nome": "Multi-User Simulation: Three Views of the emergency admission systen",
          "ano": 2007,
          "periodico": "Operation Research for Health Care Delivery Delivery Engineering",
          "volume": 33,
          "paginaInicial": 393,
          "paginaFinal": 406,
          "pesquisadores": [
              "Marcelo dos Santos Magalh�es"
          ]
      },
      {
          "id": 56,
          "tipo": "Artigo Publicado",
          "nome": "The creation`s process of the Specialization Course in Nursing - Residence Modality in Ophir Loyola Hospital (Par�, Brazil): a historical perspective",
          "ano": 2011,
          "periodico": "Online Brazilian Journal of Nursing",
          "volume": 10,
          "paginaInicial": 2011,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 57,
          "tipo": "Artigo Publicado",
          "nome": "O processo de implanta��o de resid�ncias terap�uticas em Volta Redonda - Rio de Janeiro",
          "ano": 2012,
          "periodico": "Texto & Contexto Enfermagem (UFSC. Impresso)",
          "volume": 21,
          "paginaInicial": 86,
          "paginaFinal": 94,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 58,
          "tipo": "Artigo Publicado",
          "nome": "EXPANS�O DOS CURSOS DE ESPECIALIZA��O EM ENFERMAGEM - MODALIDADE RESID�NCIA NO HOSPITAL OPHIR LOYOLA PAR� (1998 2004).",
          "ano": 2012,
          "periodico": "Online Brazilian Journal of Nursing",
          "volume": 11,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 59,
          "tipo": "Artigo Publicado",
          "nome": "Dispositivos extra-hospitalares que apoiam as Resid�ncias Terap�uticas para utentes com transtorno mental em Volta Redonda/Rio de Janeiro (2005 - 2009)",
          "ano": 2012,
          "periodico": "Refer�ncia (Coimbra)",
          "volume": null,
          "paginaInicial": 93,
          "paginaFinal": 102,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 60,
          "tipo": "Artigo Publicado",
          "nome": "O estigma da doen�a mental e as resid�ncias terap�uticas no munic�pio de Volta Redonda-RJ",
          "ano": 2013,
          "periodico": "Texto & Contexto Enfermagem (UFSC. Impresso)",
          "volume": 22,
          "paginaInicial": 327,
          "paginaFinal": 334,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 61,
          "tipo": "Artigo Publicado",
          "nome": "O ensino de enfermagem psiqui�trica na Escola Ana N�ri na primeira metade do s�culo XX.",
          "ano": 2015,
          "periodico": "Revista Eletr�nica de Enfermagem",
          "volume": 17,
          "paginaInicial": 85,
          "paginaFinal": 93,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 62,
          "tipo": "Artigo Publicado",
          "nome": "A enfermagem na rede de apoio �s resid�ncias terap�uticas para moradores com transtorno mental",
          "ano": 2013,
          "periodico": "Refer�ncia (Coimbra)",
          "volume": null,
          "paginaInicial": 143,
          "paginaFinal": 151,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 63,
          "tipo": "Artigo Publicado",
          "nome": "Update of the professional habitus from the nurses at the national cancer institute (1980-1990)",
          "ano": 2014,
          "periodico": "Texto & Contexto Enfermagem (UFSC. Impresso)",
          "volume": 23,
          "paginaInicial": 720,
          "paginaFinal": 727,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 64,
          "tipo": "Artigo Publicado",
          "nome": "Mental health nurses: conceptions about professional qualification in a Psychosocial Care Center",
          "ano": 2017,
          "periodico": "Revista da Rede de Enfermagem do Nordeste",
          "volume": 18,
          "paginaInicial": 763,
          "paginaFinal": 770,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 65,
          "tipo": "Artigo Publicado",
          "nome": "Care strategies adopted by nurses for the implementation of Psychosocial Care Centers",
          "ano": 2018,
          "periodico": "Revista da Rede de Enfermagem do Nordeste",
          "volume": 19,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 66,
          "tipo": "Artigo Publicado",
          "nome": "Teaching undergraduate nursing in mental health as allied to the consolidation of the Psychiatric Reform movement",
          "ano": 2018,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 22,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 67,
          "tipo": "Artigo Publicado",
          "nome": "Therapeutic use music to nursing care in a pediatric unit / A utiliza��o terap�utica da m�sica junto ao cuidado de enfermagem em uma unidade pedi�trica / Uso terap�utico de la m�sica en los cuidados de enfermer�a en una unidad pedi�trica",
          "ano": 2016,
          "periodico": "Revista de Enfermagem da UFPI (REUFPI)",
          "volume": 5,
          "paginaInicial": 4,
          "paginaFinal": 9,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 68,
          "tipo": "Artigo Publicado",
          "nome": "Electroconvulsive therapy: historical construction of nursing care (1989-2002)",
          "ano": 2018,
          "periodico": "REBEN - REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 71,
          "paginaInicial": 2743,
          "paginaFinal": 2750,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 69,
          "tipo": "Artigo Publicado",
          "nome": "Reconfiguration of palliative oncological nursing care: nursing contributions",
          "ano": 2020,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 73,
          "paginaInicial": 20190384,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 70,
          "tipo": "Artigo Publicado",
          "nome": "Bibliometria das publica��es da revista ?Sa�de em Debate?: uma fotografia da sa�de mental",
          "ano": 2020,
          "periodico": "Sa�de em Debate",
          "volume": 44,
          "paginaInicial": 305,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 71,
          "tipo": "Artigo Publicado",
          "nome": "Historical aspects in pain management in palliative care in an oncological reference unit",
          "ano": 2021,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 74,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 72,
          "tipo": "Artigo Publicado",
          "nome": "Organization and planning for the creation of the HIV testing and counselling center",
          "ano": 2021,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 74,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 73,
          "tipo": "Livro Publicado",
          "nome": "Anais do 8� Encontro de Enfermagem de Maca� e Regi�o",
          "ano": 2018,
          "periodico": "UFRJ Campus Maca�",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 112,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 74,
          "tipo": "Capítulo de Livro",
          "nome": "Brinca que Melhora: promo��o da sa�de atrav�s de atividades l�dicas.",
          "ano": 2019,
          "periodico": "Saberes e experi�ncias de extens�o em promo��o da sa�de",
          "volume": null,
          "paginaInicial": 7,
          "paginaFinal": 232,
          "pesquisadores": [
              "Gizele da Concei��o Soares Martins"
          ]
      },
      {
          "id": 75,
          "tipo": "Artigo Publicado",
          "nome": "A dor no rec�m nascido e na crian�a",
          "ano": 2001,
          "periodico": "Revista Brasileira de Enfermagem",
          "volume": 54,
          "paginaInicial": 27,
          "paginaFinal": 33,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 76,
          "tipo": "Artigo Publicado",
          "nome": "Percep��es das enfermeiras frente � dor dos rec�m-nascidos hospitalizados na uti neonatal",
          "ano": 2002,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 6,
          "paginaInicial": 41,
          "paginaFinal": 52,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 77,
          "tipo": "Artigo Publicado",
          "nome": "As abordagens metodol�gicas na pesquisa em enfermagem na �rea da sa�de da crian�a e adolescente:an�lise da produ��o cient�fica no per�odo de 1995 a 1999",
          "ano": 2002,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 6,
          "paginaInicial": 15,
          "paginaFinal": 24,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 78,
          "tipo": "Artigo Publicado",
          "nome": "Consulta de Enfermagem Neonatal: contribui��es para o programa de triagem neonatal",
          "ano": 2003,
          "periodico": "Revista M�dica de Minas Gerais",
          "volume": 13,
          "paginaInicial": 88,
          "paginaFinal": 88,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 79,
          "tipo": "Artigo Publicado",
          "nome": "Consulta de enfermagem neonatal humanizada:contribui��es s�cio-educativas",
          "ano": 2003,
          "periodico": "Ci�ncia & Sa�de Coletiva",
          "volume": 8,
          "paginaInicial": 748,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 80,
          "tipo": "Artigo Publicado",
          "nome": "An�lise de produ��o cient�fica de enfermagem sobre a tem�tica dor, per�odo de 1988 a 1999",
          "ano": 2001,
          "periodico": "Revista da Sociedade Brasileira de Enfermeiros Pediatras",
          "volume": 2,
          "paginaInicial": 75,
          "paginaFinal": 80,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 81,
          "tipo": "Artigo Publicado",
          "nome": "Parto e nascimento: reflex�es de enfermeiras obst�tricas",
          "ano": 2004,
          "periodico": "Enfermagem Atual (Rio de Janeiro)",
          "volume": 20,
          "paginaInicial": 23,
          "paginaFinal": 26,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 82,
          "tipo": "Artigo Publicado",
          "nome": "Sa�de da fam�lia: estrat�gia de ensino para a gradua��o em enfermagem",
          "ano": 2004,
          "periodico": "Enfermagem Brasil",
          "volume": 3,
          "paginaInicial": 138,
          "paginaFinal": 144,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 83,
          "tipo": "Artigo Publicado",
          "nome": "Direitos humanos e Cidadania",
          "ano": 2004,
          "periodico": "Revista Enfermagem (UERJ)",
          "volume": 12,
          "paginaInicial": 230,
          "paginaFinal": 234,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 84,
          "tipo": "Artigo Publicado",
          "nome": "Tendencias de pesquisa na sa�de da crian�a e os desafios para a enfermagem brasileira",
          "ano": 2005,
          "periodico": "Revista Enfermagem (UERJ)",
          "volume": 13,
          "paginaInicial": 12,
          "paginaFinal": 16,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 85,
          "tipo": "Artigo Publicado",
          "nome": "Integridade cut�nea no rec�m-nascido pr�-termo: um (des)cuidado de enfermagem?",
          "ano": 2005,
          "periodico": "Enfermagem Atual (Rio de Janeiro)",
          "volume": null,
          "paginaInicial": 29,
          "paginaFinal": 33,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 86,
          "tipo": "Artigo Publicado",
          "nome": "Assist�ncia Humanizada ao rec�m-nascido",
          "ano": 2005,
          "periodico": "Enfermagem Atual (Rio de Janeiro)",
          "volume": null,
          "paginaInicial": 7,
          "paginaFinal": 13,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 87,
          "tipo": "Artigo Publicado",
          "nome": "Reci�n nacidos egresados de maternidad municipal de Rio de Janeiro: diagn�stico de salud maternal e infantil a trav�s de la consulta de enfermer�a neonatal",
          "ano": 2005,
          "periodico": "Enfermer�a Global",
          "volume": null,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 88,
          "tipo": "Artigo Publicado",
          "nome": "Hist�ria, Conquista e perspectiva no cuidado � mulher e a crian�a",
          "ano": 2005,
          "periodico": "Texto & Contexto. Enfermagem",
          "volume": 14,
          "paginaInicial": 585,
          "paginaFinal": 593,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 89,
          "tipo": "Artigo Publicado",
          "nome": "Consulta de Enfermagem Neonatal: um projeto em extens�o, no per�odo de 1996 a 2006",
          "ano": 2006,
          "periodico": "Revista Brasileira de Extens�o Universit�ria",
          "volume": 4,
          "paginaInicial": 23,
          "paginaFinal": 26,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 90,
          "tipo": "Artigo Publicado",
          "nome": "A enfermeira obstetra e a pol�tica de humaniza��o",
          "ano": 2006,
          "periodico": "Enfermer�a Global",
          "volume": 9,
          "paginaInicial": 54,
          "paginaFinal": 59,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 91,
          "tipo": "Artigo Publicado",
          "nome": "Consulta de Enfermagem no atendimento ambulatorial ao rec�m-nascido:uma alternativa para a assist�ncia",
          "ano": 2006,
          "periodico": "Interagir (UERJ)",
          "volume": 8,
          "paginaInicial": 67,
          "paginaFinal": 73,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 92,
          "tipo": "Artigo Publicado",
          "nome": "A import�ncia da intera��o m�e-beb� no desenvolvimento infantil: a atua��o da enfermagem materno-infantil",
          "ano": 2006,
          "periodico": "Revista Enfermagem (UERJ)",
          "volume": 14,
          "paginaInicial": 606,
          "paginaFinal": 612,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 93,
          "tipo": "Artigo Publicado",
          "nome": "Triagem Neonatal: as percep��es de m�es na consulta de enfermagem",
          "ano": 2006,
          "periodico": "Enfermagem Brasil",
          "volume": 3,
          "paginaInicial": 148,
          "paginaFinal": 153,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 94,
          "tipo": "Artigo Publicado",
          "nome": "La pr�ctica del cuidado oferecido por las mujeres a sus hijos en su domic�lio",
          "ano": 2007,
          "periodico": "Enfermer�a Global",
          "volume": 10,
          "paginaInicial": 1,
          "paginaFinal": 10,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 95,
          "tipo": "Artigo Publicado",
          "nome": "Editorial - revista da sociedade brasileira de pediatria",
          "ano": 2005,
          "periodico": "Revista da Sociedade Brasileira de Enfermeiros Pediatras",
          "volume": 5,
          "paginaInicial": 5,
          "paginaFinal": 6,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 96,
          "tipo": "Artigo Publicado",
          "nome": "Fatores que interferem nos cuidados � pele da crian�a no domic�lio",
          "ano": 2007,
          "periodico": "Revista de Pesquisa. Cuidado � Fundamental",
          "volume": 1,
          "paginaInicial": 54,
          "paginaFinal": 58,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 97,
          "tipo": "Artigo Publicado",
          "nome": "T�o simples...t�o complexo cuidar do rec�m-nascido que sente dor",
          "ano": 2007,
          "periodico": "Enfermagem Brasil",
          "volume": 6,
          "paginaInicial": 283,
          "paginaFinal": 284,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 98,
          "tipo": "Artigo Publicado",
          "nome": "T�o simples...t�o complexo cuidar do rec�m-nascido que sente dor",
          "ano": 2007,
          "periodico": "Enfermagem Brasil",
          "volume": 6,
          "paginaInicial": 283,
          "paginaFinal": 284,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 99,
          "tipo": "Artigo Publicado",
          "nome": "Modelo Calgary de avalia��o da fam�lia de rec�m-nascidos: estrat�gia pedag�gica para alunos de enfermagem",
          "ano": 2008,
          "periodico": "Escola Anna Nery",
          "volume": 12,
          "paginaInicial": 160,
          "paginaFinal": 165,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 100,
          "tipo": "Artigo Publicado",
          "nome": "A produ��o cient�fica nacional sobre os direitos da crian�a hospitalizada",
          "ano": 2008,
          "periodico": "Revista Eletr�nica de Enfermagem",
          "volume": 10,
          "paginaInicial": 796,
          "paginaFinal": 804,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 101,
          "tipo": "Artigo Publicado",
          "nome": "Tecnologia e humaniza��o na Unidade de Terapia Intensiva Neonatal: reflex�es no contexto do processo sa�de-doen�a",
          "ano": 2009,
          "periodico": "Revista da Escola de Enfermagem da USP (Impresso)",
          "volume": 43,
          "paginaInicial": 684,
          "paginaFinal": 689,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 102,
          "tipo": "Artigo Publicado",
          "nome": "O brincar na vida do escolar com c�ncer em tratamento ambulatorial:possibilidades para o desenvolvimento",
          "ano": 2008,
          "periodico": "Revista Brasileira de Crescimento e Desenvolvimento Humano (Impresso)",
          "volume": 18,
          "paginaInicial": 275,
          "paginaFinal": 287,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 103,
          "tipo": "Artigo Publicado",
          "nome": "Pr�ticas de amamenta�ao de pu�rperas na consulta de enfermagem neonatal em unidade b�sica de sa�de",
          "ano": 2009,
          "periodico": "REME. Revista Mineira de Enfermagem",
          "volume": 13,
          "paginaInicial": 202,
          "paginaFinal": 208,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 104,
          "tipo": "Artigo Publicado",
          "nome": "Princ�pios �ticos da equipe de enfermagem ao cuidar da dor do rec�m-nascido",
          "ano": 2009,
          "periodico": "REME. Revista Mineira de Enfermagem",
          "volume": 13,
          "paginaInicial": 321,
          "paginaFinal": 326,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 105,
          "tipo": "Artigo Publicado",
          "nome": "Aleitamento materno: a vis�o das puerperas",
          "ano": 2009,
          "periodico": "Revista Eletr�nica de Enfermagem",
          "volume": 11,
          "paginaInicial": 605,
          "paginaFinal": 611,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 106,
          "tipo": "Artigo Publicado",
          "nome": "A atua�ao do enfermeiro frente aos sentimentos e atitudes das crian�as hspitalizadas submetidas a pun�ao venosa perif�rica",
          "ano": 2010,
          "periodico": "Revista de Enfermagem UFPE on line",
          "volume": 4,
          "paginaInicial": 371,
          "paginaFinal": 376,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 107,
          "tipo": "Artigo Publicado",
          "nome": "Aspira�ao traqueal e dor: rea��es do rec�m-nascido pr�-termo durante o cuidado",
          "ano": 2010,
          "periodico": "Ci�ncia, Cuidado & Sa�de",
          "volume": 9,
          "paginaInicial": 255,
          "paginaFinal": 261,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 108,
          "tipo": "Artigo Publicado",
          "nome": "Punci�n venosa pedi�trica: un an�lisis cr�tico a partir de la experiencia del cuidar en enfermer�a",
          "ano": 2011,
          "periodico": "Enfermer�a Global",
          "volume": 1,
          "paginaInicial": 277,
          "paginaFinal": 286,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 109,
          "tipo": "Artigo Publicado",
          "nome": "A��es de enfermagem na pun��o venosa: minimizando a dor do rec�m - nascido",
          "ano": 2010,
          "periodico": "Revista de Pesquisa: Cuidado � Fundamental (Online)",
          "volume": 2,
          "paginaInicial": 947,
          "paginaFinal": 957,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 110,
          "tipo": "Artigo Publicado",
          "nome": "As (im)possibilidades de brincar para o escolar com c�ncer em tratamento ambulatorial",
          "ano": 2010,
          "periodico": "Acta Paulista de Enfermagem (UNIFESP. Impresso)",
          "volume": 23,
          "paginaInicial": 334,
          "paginaFinal": 340,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 111,
          "tipo": "Artigo Publicado",
          "nome": "Tecnolog�a secundaria en el tratamiento del reci�n nacido prematuro (cuidados de enfermer�a en el uso del CPAP nasal)",
          "ano": 2010,
          "periodico": "Enfermer�a Global",
          "volume": 20,
          "paginaInicial": 1,
          "paginaFinal": 11,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 112,
          "tipo": "Artigo Publicado",
          "nome": "Dor neonatal:medidas n�o-farmacol�gicas utilizadas pela equipe de enfermagem",
          "ano": 2010,
          "periodico": "Rev Rene",
          "volume": 11,
          "paginaInicial": 169,
          "paginaFinal": 177,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 113,
          "tipo": "Artigo Publicado",
          "nome": "Conhecendo a intera��o social nas brincadeiras das crian�as com c�ncer em tratamento ambulatorial: subs�dios para o cuidado de enfermagem",
          "ano": 2010,
          "periodico": "Revista de Pesquisa: Cuidado � Fundamental",
          "volume": 2,
          "paginaInicial": 63,
          "paginaFinal": 67,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 114,
          "tipo": "Artigo Publicado",
          "nome": "Terapia intravenosa em neonatologia e na pediatria: uma revisao sistem�tica da literatura",
          "ano": 2010,
          "periodico": "Revista de Pesquisa: Cuidado � Fundamental",
          "volume": 2,
          "paginaInicial": 125,
          "paginaFinal": 129,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 115,
          "tipo": "Artigo Publicado",
          "nome": "A dor do rec�m-nascido: avalia��o e principios �ticos do cuidado de enfermagem",
          "ano": 2010,
          "periodico": "Programa de Atualiza��o",
          "volume": 1,
          "paginaInicial": 59,
          "paginaFinal": 91,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 116,
          "tipo": "Artigo Publicado",
          "nome": "Grupos de pesquisas em enfermagem na �rea do rec�m-nascido, da crian�a e do adolescente: perfil e tend�ncia",
          "ano": 2011,
          "periodico": "Texto & Contexto Enfermagem (UFSC. Impresso)",
          "volume": 20,
          "paginaInicial": 147,
          "paginaFinal": 155,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 117,
          "tipo": "Artigo Publicado",
          "nome": "Conhecimento e atitudes de profissionais de sa�de sobre avalia��o e manejo da dor neonatal",
          "ano": 2014,
          "periodico": "Revista Eletr�nica de Enfermagem",
          "volume": 16,
          "paginaInicial": 361,
          "paginaFinal": 369,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 118,
          "tipo": "Artigo Publicado",
          "nome": "EDUCATIONAL INTERVENTION IN A NEONATAL INTENSIVE CARE UNIT IN THE  MANAGEMENT OF PAIN",
          "ano": 2013,
          "periodico": "Revista de Enfermagem UFPE on line",
          "volume": 7,
          "paginaInicial": 6310,
          "paginaFinal": 6314,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 119,
          "tipo": "Artigo Publicado",
          "nome": "Socio-demographic profiles and qualifications of neonatal nurses in developmental care: a descriptive study",
          "ano": 2014,
          "periodico": "Online Brazilian Journal of Nursing",
          "volume": 13,
          "paginaInicial": 292,
          "paginaFinal": 301,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 120,
          "tipo": "Artigo Publicado",
          "nome": "Ser pai de prematuro na unidade de terapia intensiva neonatal: da parentalidade a paternidade",
          "ano": 2015,
          "periodico": "Escola Anna Nery revista de enfermagem",
          "volume": 19,
          "paginaInicial": 1414,
          "paginaFinal": 1418,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 121,
          "tipo": "Artigo Publicado",
          "nome": "El primer encuentro del padre con el beb� prematuro en la Unidad de Cuidados Intensivos Neonatales",
          "ano": 2015,
          "periodico": "Index de Enfermer�a",
          "volume": 24,
          "paginaInicial": 31,
          "paginaFinal": 34,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 122,
          "tipo": "Artigo Publicado",
          "nome": "Conhecimento dos profissionais de saude na avalia��o e tratamento da dor neonatal",
          "ano": 2016,
          "periodico": "Revista Brasileira de Enfermagem",
          "volume": 69,
          "paginaInicial": 0,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 123,
          "tipo": "Artigo Publicado",
          "nome": "Attitudes of healthcare professionals regarding the assessment and treatment of neonatal pain",
          "ano": 2017,
          "periodico": "Escola Anna Nery",
          "volume": 21,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 124,
          "tipo": "Artigo Publicado",
          "nome": "Cateter central de inser��o perif�rica em neonato: revis�o integrativa da literatura Central catheter of peripherally insertion in neonates: integrative literature review",
          "ano": 2016,
          "periodico": "Revista de Pesquisa: Cuidado � Fundamental",
          "volume": 8,
          "paginaInicial": 5193,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 125,
          "tipo": "Artigo Publicado",
          "nome": "OS SIGNIFICADOS DE CUIDAR DO FILHO PR�-TERMO NA VIS�O PATERNA",
          "ano": 2016,
          "periodico": "Texto e Contexto. (UFSC Impresso)",
          "volume": 25,
          "paginaInicial": 2,
          "paginaFinal": 9,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 126,
          "tipo": "Artigo Publicado",
          "nome": "Infant colic: descriptive study of maternal care practices for pain relief",
          "ano": 2013,
          "periodico": "Revista de Enfermagem UFPE on line",
          "volume": 7,
          "paginaInicial": 5876,
          "paginaFinal": 5882,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 127,
          "tipo": "Artigo Publicado",
          "nome": "parentalidade de pais de rec�m-nascidos hospitalizados por s�filis congenita  a luz da teoria das transi��es",
          "ano": 2018,
          "periodico": "TEXTO & CONTEXTO ENFERMAGEM",
          "volume": 27,
          "paginaInicial": 3,
          "paginaFinal": 11,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 128,
          "tipo": "Artigo Publicado",
          "nome": "Aleitamento materno em prematuros egressos de hospitais amigos da crian�a do Sudeste",
          "ano": 2018,
          "periodico": "REVISTA ELETR�NICA DE ENFERMAGEM",
          "volume": 20,
          "paginaInicial": 1,
          "paginaFinal": 14,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 129,
          "tipo": "Artigo Publicado",
          "nome": "Viv�ncias de familiares durante o trabalho de parto pr�-termo",
          "ano": 2019,
          "periodico": "CUIDARTE",
          "volume": 10,
          "paginaInicial": 1,
          "paginaFinal": 13,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 130,
          "tipo": "Artigo Publicado",
          "nome": "Percepções dos profissionais sobre a dor neonatal: estudo descritivo",
          "ano": 2018,
          "periodico": "ONLINE BRAZILIAN JOURNAL OF NURSING",
          "volume": 16,
          "paginaInicial": 420,
          "paginaFinal": 430,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 131,
          "tipo": "Artigo Publicado",
          "nome": "Fluxograma assistencial para manejo de dor em Unidade de Terapia Intensiva Neonatal",
          "ano": 2018,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 71,
          "paginaInicial": 1281,
          "paginaFinal": 1289,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 132,
          "tipo": "Artigo Publicado",
          "nome": "Tradu��o e adapta��o cultural de instrumentos de coleta de dados sobre constru��o de g�nero na inf�ncia",
          "ano": 2018,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 22,
          "paginaInicial": 1,
          "paginaFinal": 12,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 133,
          "tipo": "Artigo Publicado",
          "nome": "Aleitamento materno de prematuros em hospital amigo da crian�a: da alta hospitalar ao domicilio",
          "ano": 2017,
          "periodico": "Rev Rene",
          "volume": 18,
          "paginaInicial": 1,
          "paginaFinal": 11,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 134,
          "tipo": "Artigo Publicado",
          "nome": "Health professionals barriers in the management, evaluation and treatment of neonatal",
          "ano": 2019,
          "periodico": "REVISTA DOR",
          "volume": 2,
          "paginaInicial": 34,
          "paginaFinal": 38,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 135,
          "tipo": "Artigo Publicado",
          "nome": "Pr�ticas de Inser��o, Manuten��o e Remo��o do Cateter Central de Inser��o Perif�rica em Neonatos",
          "ano": 2019,
          "periodico": "Revista de Pesquisa: Cuidado � Fundamental (Online)",
          "volume": 11,
          "paginaInicial": 278,
          "paginaFinal": 284,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 136,
          "tipo": "Artigo Publicado",
          "nome": "Care management for the hospitalized child with chronic cancer pain: intervening conditions",
          "ano": 2019,
          "periodico": "REBEN - REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 72,
          "paginaInicial": 181,
          "paginaFinal": 188,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 137,
          "tipo": "Artigo Publicado",
          "nome": "O preparo de medicamentos realizado por um time de medica��o: estudo descritivo",
          "ano": 2018,
          "periodico": "ONLINE BRAZILIAN JOURNAL OF NURSING",
          "volume": 17,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 138,
          "tipo": "Artigo Publicado",
          "nome": "Translation and cultural adaptation of data collection instruments on gender construction in childhood",
          "ano": 2018,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 22,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 139,
          "tipo": "Artigo Publicado",
          "nome": "PARENTALIDADE DE PAIS DE REC�M-NASCIDOS HOSPITALIZADOS POR S�FILIS CONG�NITA � LUZ DA TEORIA DAS TRANSI��ES",
          "ano": 2019,
          "periodico": "Texto e Contexto. (UFSC Impresso)",
          "volume": 27,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 140,
          "tipo": "Artigo Publicado",
          "nome": "Subconjuntos terminol�gicos da Classifica��o Internacional para Pr�tica de Enfermagem: uma revis�o integrativa da literatura",
          "ano": 2019,
          "periodico": "Revista da Escola de Enfermagem da USP",
          "volume": 53,
          "paginaInicial": 34,
          "paginaFinal": 37,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 141,
          "tipo": "Artigo Publicado",
          "nome": "O processo de trabalho de um time de medica��o na perspectiva da pesquisa-a��o",
          "ano": 2019,
          "periodico": "REVISTA ELETR�NICA DE ENFERMAGEM",
          "volume": 21,
          "paginaInicial": 1,
          "paginaFinal": 11,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 142,
          "tipo": "Artigo Publicado",
          "nome": "Pr�ticas de incentivo e apoio � amamenta��o de rec�m-nascidos prematuros na perspectiva da m�e",
          "ano": 2019,
          "periodico": "Advances in Nursing and Health",
          "volume": 1,
          "paginaInicial": 98,
          "paginaFinal": 112,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 143,
          "tipo": "Artigo Publicado",
          "nome": "utiliza��o de cateteres venosos centrais de inser��o perif�rica na Unidade Intensiva Neonatal.",
          "ano": 2020,
          "periodico": "REVISTA ELETR�NICA DE ENFERMAGEM",
          "volume": 22,
          "paginaInicial": 1,
          "paginaFinal": 18,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 144,
          "tipo": "Artigo Publicado",
          "nome": "Valida��o para o portugu�s da escala de conhecimento acerca do aleitamento materno",
          "ano": 2020,
          "periodico": "Acta Paulista de Enfermagem",
          "volume": 33,
          "paginaInicial": 1,
          "paginaFinal": 11,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 145,
          "tipo": "Artigo Publicado",
          "nome": "Cultural adaptation of Infant Feeding Intentions Scale (IFI) for pregnant women in Brazil",
          "ano": 2020,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 73,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 146,
          "tipo": "Artigo Publicado",
          "nome": "A(in)visibilidade da crian�a em vulnerabilidade social e o impacto do novo coronavirus",
          "ano": 2020,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 73,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 147,
          "tipo": "Artigo Publicado",
          "nome": "PREVAL�NCIA DE ALEITAMENTO MATERNO EXCLUSIVO E SEUS INDICADORES NA ATEN��O B�SICA",
          "ano": 2020,
          "periodico": "INTERNATIONAL JOURNAL OF DEVELOPMENT RESEARCH",
          "volume": 10,
          "paginaInicial": 35991,
          "paginaFinal": 35994,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 148,
          "tipo": "Artigo Publicado",
          "nome": "Perfil sociodemogr�fico, cl�nico e obst�trico de pu�rperas em um alojamento conjunto: um estudo descritivo",
          "ano": 2020,
          "periodico": "RESEARCH, SOCIETY AND DEVELOPMENT",
          "volume": 9,
          "paginaInicial": null,
          "paginaFinal": 7,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 149,
          "tipo": "Artigo Publicado",
          "nome": "PLANEJAMENTO E OBJETIVO DA ALIMENTA��O DA CRIAN�A NA VIS�O DAS GESTANTES DE CASCAVEL &#45; PR",
          "ano": 2020,
          "periodico": "Brazilian Journal of Development",
          "volume": 6,
          "paginaInicial": 61463,
          "paginaFinal": 61473,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 150,
          "tipo": "Artigo Publicado",
          "nome": "Experiencias durante a interna��o de um rec�m-nascido prematuro em terapia intensiva",
          "ano": 2021,
          "periodico": "ENFERMER�A ACTUAL DE COSTA RICA",
          "volume": null,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 151,
          "tipo": "Artigo Publicado",
          "nome": "Qualidade da rela��o da gestante com as pessoas pr�ximas e o aleitamento materno",
          "ano": 2021,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 25,
          "paginaInicial": 1,
          "paginaFinal": 7,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 152,
          "tipo": "Artigo Publicado",
          "nome": "Os conceitos de Florence Nightingale em tempos de pandemia da COVID-19 retratados em hist�ria em quadrinhos: relato de experi�ncia",
          "ano": 2020,
          "periodico": "Escola Anna Nery. Revista de Enfermagem",
          "volume": 24,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 153,
          "tipo": "Artigo Publicado",
          "nome": "Tradu��o, adapta��o e valida��o da Escala Calidad de la relaci�n con su persona cercana",
          "ano": 2020,
          "periodico": "Rev Rene",
          "volume": 21,
          "paginaInicial": 1,
          "paginaFinal": 8,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 154,
          "tipo": "Artigo Publicado",
          "nome": "Resid�ncia multiprofissional como estrat�gia para forma��o de recursos humanos na perspectiva interprofissional em sa�de perinatal",
          "ano": 2020,
          "periodico": "RESEARCH, SOCIETY AND DEVELOPMENT",
          "volume": 9,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 155,
          "tipo": "Artigo Publicado",
          "nome": "Produ��o l�ctea de m�es de rec�m-nascidos internados em Unidade de Terapia Intensiva",
          "ano": 2020,
          "periodico": "RESEARCH, SOCIETY AND DEVELOPMENT",
          "volume": 9,
          "paginaInicial": 1,
          "paginaFinal": 19,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 156,
          "tipo": "Artigo Publicado",
          "nome": "Qualidade do sono de m�es de rec�m-nascidos internados em Unidade de Terapia Intensiva Neonatal",
          "ano": 2020,
          "periodico": "RESEARCH, SOCIETY AND DEVELOPMENT",
          "volume": 9,
          "paginaInicial": 1,
          "paginaFinal": 17,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 157,
          "tipo": "Artigo Publicado",
          "nome": "Medidas n�o farmacol�gicas para al�vio da dor do rec�m-nascido a termo: revis�o integrativa",
          "ano": 2020,
          "periodico": "RESEARCH, SOCIETY AND DEVELOPMENT",
          "volume": 9,
          "paginaInicial": 1,
          "paginaFinal": 21,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 158,
          "tipo": "Artigo Publicado",
          "nome": "Atividades desenvolvidas pela Liga Academica de neonatologia e pediatria durante o distanciamento social: relato de experiencia",
          "ano": 2020,
          "periodico": "Boletim Ciencia Macae",
          "volume": 1,
          "paginaInicial": 146,
          "paginaFinal": 159,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 159,
          "tipo": "Artigo Publicado",
          "nome": "Experi�ncias maternas durante a hospitaliza��o do rec�m-nascido prematuro",
          "ano": 2020,
          "periodico": "REVISTA DA SOCIEDADE BRASILEIRA DE ENFERMEIROS PEDIATRAS",
          "volume": 19,
          "paginaInicial": 7,
          "paginaFinal": 15,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 160,
          "tipo": "Artigo Publicado",
          "nome": "Assistance flowchart for pain management in a Neonatal Intensive Care Unit",
          "ano": 2018,
          "periodico": "REVISTA BRASILEIRA DE ENFERMAGEM",
          "volume": 71,
          "paginaInicial": 1281,
          "paginaFinal": 1289,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 161,
          "tipo": "Artigo Publicado",
          "nome": "Amamenta��o e o desenvolvimento Pondo-Estatural do lactente at� o sexto m�s de vida",
          "ano": 2021,
          "periodico": "SEMINA. CI�NCIAS BIOL�GICAS E DA SA�DE (ONLINE)",
          "volume": 42,
          "paginaInicial": 179,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 162,
          "tipo": "Artigo Publicado",
          "nome": "A avalia��o da autoefic�cia de nutrizes em amamentar para o cuidado de enfermagem",
          "ano": 2021,
          "periodico": "RESEARCH, SOCIETY AND DEVELOPMENT",
          "volume": 10,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 163,
          "tipo": "Artigo Publicado",
          "nome": "(RE) CONHECENDO A PARTICIPA��O MASCULINA NO M�TODO CANGURU: UMA INTERFACE COM A PR�TICA ASSISTENCIAL DE ENFERMAGEM",
          "ano": 2013,
          "periodico": "Ci�ncia, Cuidado e Sa�de (Online)",
          "volume": 12,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 164,
          "tipo": "Livro Publicado",
          "nome": "Navegando no mar da neonatologia: um mergulho no mundo imaginal do rec�m-nascido na UTIN",
          "ano": 2003,
          "periodico": "Editora Anna Nery/UFRJ",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 174,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 165,
          "tipo": "Capítulo de Livro",
          "nome": "Promo��o da sa�de do rec�m-nascido e sua fam�lia",
          "ano": 2006,
          "periodico": "Programa de atualiza��o em enfermagem: sa�de da crian�a e do adolescente",
          "volume": null,
          "paginaInicial": 9,
          "paginaFinal": 50,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 166,
          "tipo": "Capítulo de Livro",
          "nome": "Unidade de Pediatria",
          "ano": 2008,
          "periodico": "Plant�o de enfermagem: o cotidiano da assist�ncia de enfermagem numa unidade hospitalar",
          "volume": 1,
          "paginaInicial": 3,
          "paginaFinal": 18,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 167,
          "tipo": "Capítulo de Livro",
          "nome": "A Hist�ria do Cuidado � Crian�a e a Enfermagem Pedi�trica:Perspectiva hist�ria do cuidado � crian�a e adolescente em aten��o secund�ria e terci�ria no Mundo e no Brasil",
          "ano": 2010,
          "periodico": "Enfermagem Pedi�trica",
          "volume": 1,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 168,
          "tipo": "Capítulo de Livro",
          "nome": "O cuidar em enfermagem a crian�a vitima de violencia intrafamiliar",
          "ano": 2012,
          "periodico": "Interfaces do cuidado em enfermagem a crian�a e ao adolescente",
          "volume": 1,
          "paginaInicial": 155,
          "paginaFinal": 171,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 169,
          "tipo": "Capítulo de Livro",
          "nome": "Cuidados de Enfermagem a crian�a com hepatites virais",
          "ano": 2013,
          "periodico": "Programa de atualiza��o em enfermagem- PROENF",
          "volume": 3,
          "paginaInicial": 73,
          "paginaFinal": 116,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 170,
          "tipo": "Capítulo de Livro",
          "nome": "DIST�RBIOS METAB�LICOS NO REC�M-NASCIDO",
          "ano": 2013,
          "periodico": "PROENF SA�DE MATERNA E NEONATAL",
          "volume": 4,
          "paginaInicial": 9,
          "paginaFinal": 56,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 171,
          "tipo": "Capítulo de Livro",
          "nome": "Cuidado desenvolvimental ao rec�m-nascido: pr�ticas baseadas em evidencias",
          "ano": 2018,
          "periodico": "Programa de atualiza��o em enfermagem: sa�de materna e neonatal",
          "volume": 2,
          "paginaInicial": 125,
          "paginaFinal": 170,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 172,
          "tipo": "Capítulo de Livro",
          "nome": ". DIAGN�STICOS E INTERVEN��ES DE ENFERMAGEM NO BANCO DE LEITE HUMANO.",
          "ano": 2019,
          "periodico": ". DIAGN�STICOS E INTERVEN��ES DE ENFERMAGEM NO BANCO DE LEITE HUMANO.",
          "volume": 1,
          "paginaInicial": 33,
          "paginaFinal": 42,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 173,
          "tipo": "Capítulo de Livro",
          "nome": "PERFIL DOS ENFERMEIROS DE UM TIME DE MEDICA��O NA UNIDADE NEONATAL",
          "ano": 2019,
          "periodico": "PERFIL DOS ENFERMEIROS DE UM TIME DE MEDICA��O NA UNIDADE NEONATAL",
          "volume": 1,
          "paginaInicial": 67,
          "paginaFinal": 78,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 174,
          "tipo": "Capítulo de Livro",
          "nome": "CUIDADOS � CRIAN�A COM TRANSTORNO DO ESPECTRO AUTISTA",
          "ano": 2020,
          "periodico": "Pediatria ? Experi�ncias Profissionais e Relatos de Caso",
          "volume": 2,
          "paginaInicial": 176,
          "paginaFinal": 192,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 175,
          "tipo": "Capítulo de Livro",
          "nome": "AN�LISE DAS TAXAS DE NASCIMENTOS NO MUNIC�PIO DE MACA� EM UMA D�CADA",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 13,
          "paginaFinal": 26,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 176,
          "tipo": "Capítulo de Livro",
          "nome": "PERFIL DA PREMATURIDADE NO MUNIC�PIO DE MACA� ? RIO DE JANEIRO",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 23,
          "paginaFinal": 43,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 177,
          "tipo": "Capítulo de Livro",
          "nome": "AN�LISE DA INCID�NCIA DE CES�REAS SEGUNDO A CLASSIFICA��O DE ROBSON NO MUNIC�PIO DE MACA�",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 45,
          "paginaFinal": 57,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 178,
          "tipo": "Capítulo de Livro",
          "nome": "A VIV�NCIA DA MATERNAGEM DE MULHERES-M�ES NO MUNIC�PIO DE MACA�-RJ",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 89,
          "paginaFinal": 100,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 179,
          "tipo": "Capítulo de Livro",
          "nome": "ANALGESIA E SEDA��O � CRIAN�A GRAVEMENTE ENFERMA",
          "ano": 2013,
          "periodico": "Proenf- saude da crian�a e do adolescente",
          "volume": 4,
          "paginaInicial": 5,
          "paginaFinal": 25,
          "pesquisadores": [
              "Marialda Moreira Christoffel"
          ]
      },
      {
          "id": 180,
          "tipo": "Artigo Publicado",
          "nome": "Eptatretus menezesi, a new species of hagfish (Agnatha, Myxinidae) from Brazil",
          "ano": 2000,
          "periodico": "Bulletin of Marine Science",
          "volume": 67,
          "paginaInicial": 815,
          "paginaFinal": 819,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 181,
          "tipo": "Artigo Publicado",
          "nome": "Myxine sotoi, a new species of hagfish (Agnatha, Myxinidae) from Brazil",
          "ano": 2001,
          "periodico": "Bulletin of Marine Science",
          "volume": 68,
          "paginaInicial": 479,
          "paginaFinal": 483,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 182,
          "tipo": "Artigo Publicado",
          "nome": "Further description of the hagfish Nemamyxine kreffti McMillan & Wisner, 1982 (Agnatha, Myxinidae)",
          "ano": 2001,
          "periodico": "Mare Magnum (Itaja�)",
          "volume": 1,
          "paginaInicial": 19,
          "paginaFinal": 22,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 183,
          "tipo": "Artigo Publicado",
          "nome": "Dipturus diehli sp. nov., a new species of skate (Chondrichthyes, Rajidae) from southern Brazil",
          "ano": 2001,
          "periodico": "Mare Magnum (Itaja�)",
          "volume": 1,
          "paginaInicial": 3,
          "paginaFinal": 6,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 184,
          "tipo": "Artigo Publicado",
          "nome": "First record of kitefin shark, Dalatias licha (Bonnaterre, 1788) (Squaliformes, Dalatiidae), in the south Atlantic",
          "ano": 2001,
          "periodico": "Mare Magnum (Itaja�)",
          "volume": 1,
          "paginaInicial": 23,
          "paginaFinal": 26,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 185,
          "tipo": "Artigo Publicado",
          "nome": "Eptatretus lakeside sp. nov., a new species of five-gilled hagfish (Myxinidae) from the Gal�pagos Islands",
          "ano": 2004,
          "periodico": "Proceedings of the California Academy of Sciences (1907)",
          "volume": 55,
          "paginaInicial": 162,
          "paginaFinal": 168,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 186,
          "tipo": "Artigo Publicado",
          "nome": "First record of the hagfish Eptatretus multidens Fernholm & Hubbs, 1981 (Myxinidae) in Brazilian waters",
          "ano": 2004,
          "periodico": "Comunica��es do Museu de Ci�ncias e Tecnologia da PUCRS. S�rie Zoologia",
          "volume": 17,
          "paginaInicial": 33,
          "paginaFinal": 38,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 187,
          "tipo": "Artigo Publicado",
          "nome": "Occurence of Cottunculus granulosus Karrer, 1968 (Scorpaeniformes: Psychrolutidae) in southern Brazil",
          "ano": 2004,
          "periodico": "Comunica��es do Museu de Ci�ncias e Tecnologia da PUCRS. S�rie Zoologia",
          "volume": 17,
          "paginaInicial": 39,
          "paginaFinal": 43,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 188,
          "tipo": "Artigo Publicado",
          "nome": "Collections of the Museu Oceanogr�fico do Vale do Itaja�. I. Catalog of cartilaginous fishes (Myxini, Cephalaspidomorphi, Elasmobranchii, Holocephali)",
          "ano": 2004,
          "periodico": "Mare Magnum",
          "volume": 2,
          "paginaInicial": 1,
          "paginaFinal": 125,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 189,
          "tipo": "Artigo Publicado",
          "nome": "Report on the demersal fishes sampled by onboard observers off southern Brazil",
          "ano": 2004,
          "periodico": "Mare Magnum (Itaja�)",
          "volume": 2,
          "paginaInicial": 127,
          "paginaFinal": 144,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 190,
          "tipo": "Artigo Publicado",
          "nome": "Sobre a ocorr�ncia do peixe-fita Trachipterus jacksonensis (Ramsay, 1881) (Lampridiformes, Trachipteridae) na costa brasileira",
          "ano": 2001,
          "periodico": "Mare Magnum",
          "volume": 1,
          "paginaInicial": 121,
          "paginaFinal": 124,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 191,
          "tipo": "Artigo Publicado",
          "nome": "First record of the southern hagfish Myxine australis (Myxinidae) in brazilian waters",
          "ano": 2001,
          "periodico": "Mare Magnum (Itaja�)",
          "volume": 1,
          "paginaInicial": 125,
          "paginaFinal": 127,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 192,
          "tipo": "Artigo Publicado",
          "nome": "Distribution and morphology of the giant isopods Bathynomus giganteus and Bathynomus miyarei (Flabellifera, Cirolanidae) off southern Brazil",
          "ano": 2001,
          "periodico": "Mare Magnum",
          "volume": 1,
          "paginaInicial": 141,
          "paginaFinal": 145,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 193,
          "tipo": "Artigo Publicado",
          "nome": "First record of the grey conger Conger esculentus Poey, 1861 (Congridae) in Brazilian waters",
          "ano": 2005,
          "periodico": "Comunica��es do Museu de Ci�ncias e Tecnologia da PUCRS. S�rie Zoologia",
          "volume": 18,
          "paginaInicial": 59,
          "paginaFinal": 62,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 194,
          "tipo": "Artigo Publicado",
          "nome": "Studies on the Zoarcidae (Teleostei: Perciformes) of the southern hemisphere. IX. A new species of Pachycara from the southwestern Atlantic",
          "ano": 2006,
          "periodico": "Zootaxa (Auckland. Print)",
          "volume": 1177,
          "paginaInicial": 21,
          "paginaFinal": 26,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 195,
          "tipo": "Artigo Publicado",
          "nome": "A New Species of Giant Seven-gilled Hagfish (Myxinidae: Eptatretus) From New Zealand",
          "ano": 2006,
          "periodico": "Copeia",
          "volume": 2006,
          "paginaInicial": 225,
          "paginaFinal": 229,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 196,
          "tipo": "Artigo Publicado",
          "nome": "Occurrence of Pleuroscopus pseudodorsalis Barnard, 1927 (Uranoscopidae) near Rio Grande Plateau, western South Atlantic",
          "ano": 2007,
          "periodico": "Journal of Fish Biology",
          "volume": 71,
          "paginaInicial": 1238,
          "paginaFinal": 1240,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 197,
          "tipo": "Artigo Publicado",
          "nome": "Deep-sea ophidiiform fishes collected on the Brazilian continental slope, between 11� and 23�S",
          "ano": 2008,
          "periodico": "ZOOTAXA",
          "volume": 1770,
          "paginaInicial": 41,
          "paginaFinal": 64,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 198,
          "tipo": "Artigo Publicado",
          "nome": "A new genus and species of eelpout (Teleostei: Zoarcidae) from Brazil",
          "ano": 2008,
          "periodico": "Zootaxa (Auckland)",
          "volume": 1852,
          "paginaInicial": 65,
          "paginaFinal": 68,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 199,
          "tipo": "Artigo Publicado",
          "nome": "Ocellus-bearing Neobythites species (Teleostei: Ophidiidae) from the West Atlantic with description of a new species",
          "ano": 2009,
          "periodico": "Zootaxa (Auckland. Print)",
          "volume": 2228,
          "paginaInicial": 57,
          "paginaFinal": 68,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 200,
          "tipo": "Artigo Publicado",
          "nome": "Review of the Australian hagfishes with description of two new species of Eptatretus (Myxinidae)",
          "ano": 2010,
          "periodico": "JOURNAL OF FISH BIOLOGY",
          "volume": 77,
          "paginaInicial": 779,
          "paginaFinal": 801,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 201,
          "tipo": "Artigo Publicado",
          "nome": "A new species of hagfish (Myxinidae: Eptatretus) from Papua New Guinea",
          "ano": 2010,
          "periodico": "Journal of Fish Biology",
          "volume": 77,
          "paginaInicial": 998,
          "paginaFinal": 1005,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 202,
          "tipo": "Artigo Publicado",
          "nome": "Fishes of the family Sternoptychidae (Stomiiformes) collected on the Brazilian continental slope between 11� and 23�S",
          "ano": 2011,
          "periodico": "Zootaxa (Auckland. Print)",
          "volume": 2742,
          "paginaInicial": 34,
          "paginaFinal": 48,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 203,
          "tipo": "Artigo Publicado",
          "nome": "New records of coastal fishes in the northern Rio de Janeiro State, Brazil, with comments on the biogeography of the south-western Atlantic Ocean",
          "ano": 2011,
          "periodico": "Journal of Fish Biology",
          "volume": 79,
          "paginaInicial": 546,
          "paginaFinal": 555,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 204,
          "tipo": "Artigo Publicado",
          "nome": "Conservation status of the world?s hagfish species and the loss of phylogenetic diversity and ecosystem function",
          "ano": 2011,
          "periodico": "AQUATIC CONSERVATION-MARINE AND FRESHWATER ECOSYSTEMS",
          "volume": 21,
          "paginaInicial": 401,
          "paginaFinal": 411,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 205,
          "tipo": "Artigo Publicado",
          "nome": "First record and further description of the Cape hagfish Myxine capensis (Myxinidae) off Mozambique, western Indian Ocean",
          "ano": 2011,
          "periodico": "Journal of Fish Biology",
          "volume": 79,
          "paginaInicial": 806,
          "paginaFinal": 811,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 206,
          "tipo": "Artigo Publicado",
          "nome": "Avalia��o do risco de extin��o do peixe-bruxa Eptatretus menezesi Mincarone, 2000 no Brasil",
          "ano": 2012,
          "periodico": "Biodiversidade Brasileira",
          "volume": 2,
          "paginaInicial": 150,
          "paginaFinal": 153,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 207,
          "tipo": "Artigo Publicado",
          "nome": "Avalia��o do risco de extin��o do peixe-bruxa Eptatretus multidens Fernholm & Hubbs, 1981 no Brasil",
          "ano": 2012,
          "periodico": "Biodiversidade Brasileira",
          "volume": 2,
          "paginaInicial": 154,
          "paginaFinal": 157,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 208,
          "tipo": "Artigo Publicado",
          "nome": "Avalia��o do risco de extin��o do peixe-bruxa Myxine australis Jenyns, 1842 no Brasil",
          "ano": 2012,
          "periodico": "Biodiversidade Brasileira",
          "volume": 2,
          "paginaInicial": 158,
          "paginaFinal": 161,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 209,
          "tipo": "Artigo Publicado",
          "nome": "Avalia��o do risco de extin��o do peixe-bruxa Myxine sotoi Mincarone, 2001 no Brasil",
          "ano": 2012,
          "periodico": "Biodiversidade Brasileira",
          "volume": 2,
          "paginaInicial": 162,
          "paginaFinal": 165,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 210,
          "tipo": "Artigo Publicado",
          "nome": "Avalia��o do risco de extin��o do peixe-bruxa Nemamyxine kreffti McMillan & Wisner, 1982 no Brasil",
          "ano": 2012,
          "periodico": "Biodiversidade Brasileira",
          "volume": 2,
          "paginaInicial": 166,
          "paginaFinal": 169,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 211,
          "tipo": "Artigo Publicado",
          "nome": "An update on the fish composition (Teleostei) of the coastal lagoons of the Restinga de Jurubatiba National Park and the Imboassica Lagoon, northern Rio de Janeiro State",
          "ano": 2013,
          "periodico": "Acta Limnologica Brasiliensia (Online)",
          "volume": 25,
          "paginaInicial": 257,
          "paginaFinal": 278,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 212,
          "tipo": "Artigo Publicado",
          "nome": "Fish composition (Teleostei) of the estuarine region of the Maca� River, southeastern Brazil",
          "ano": 2014,
          "periodico": "Check List (S�o Paulo. Online)",
          "volume": 10,
          "paginaInicial": 927,
          "paginaFinal": 935,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 213,
          "tipo": "Artigo Publicado",
          "nome": "Deep-sea bigscales, pricklefishes, gibberfishes and whalefishes (Teleostei: Stephanoberycoidei) off Brazil: new records, range extensions for the south-western Atlantic Ocean and remarks on the taxonomy of Poromitra</i>",
          "ano": 2014,
          "periodico": "JOURNAL OF FISH BIOLOGY",
          "volume": 85,
          "paginaInicial": 1546,
          "paginaFinal": 1570,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 214,
          "tipo": "Artigo Publicado",
          "nome": "A better way forward for Brazil's fisheries",
          "ano": 2015,
          "periodico": "Science (New York, N.Y.)",
          "volume": 347,
          "paginaInicial": 1079,
          "paginaFinal": 1079,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 215,
          "tipo": "Artigo Publicado",
          "nome": "A new deep-sea species of Barathronus Goode &amp; Bean from Brazil, with notes on Barathronus bicolor Goode &amp; Bean (Ophidiiformes: Aphyonidae)",
          "ano": 2015,
          "periodico": "Neotropical Ichthyology (Impresso)",
          "volume": 13,
          "paginaInicial": 53,
          "paginaFinal": 60,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 216,
          "tipo": "Artigo Publicado",
          "nome": "Conservar a fauna aqu�tica para garantir a produ��o pesqueira",
          "ano": 2015,
          "periodico": "CI�NCIA E CULTURA",
          "volume": 67,
          "paginaInicial": 56,
          "paginaFinal": 59,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 217,
          "tipo": "Artigo Publicado",
          "nome": "Megafaunal communities along a depth gradient on the tropical Brazilian continental margin",
          "ano": 2015,
          "periodico": "Marine Biology Research (Online)",
          "volume": 11,
          "paginaInicial": 1053,
          "paginaFinal": 1064,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 218,
          "tipo": "Artigo Publicado",
          "nome": "Carta das �guas de Maca�: contribui��o do NUPEM/UFRJ para a governan�a dos recursos h�dricos de Maca�",
          "ano": 2015,
          "periodico": "Cadernos NUPEM",
          "volume": 6,
          "paginaInicial": 1,
          "paginaFinal": 37,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 219,
          "tipo": "Artigo Publicado",
          "nome": "Cole��o de Peixes do N�cleo em Ecologia e  Desenvolvimento Socioambiental de Maca�, Universidade Federal do Rio de Janeiro (NPM-NUPEM/UFRJ): reflex�es sobre o papel de cole��es zool�gicas regionais na estrutura universit�ria brasileira",
          "ano": 2016,
          "periodico": "BOLETIM - SOCIEDADE BRASILEIRA DE ICTIOLOGIA (IMPRESSO)",
          "volume": 117,
          "paginaInicial": 2,
          "paginaFinal": 8,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 220,
          "tipo": "Artigo Publicado",
          "nome": "Fish biodiversity and conservation in South America",
          "ano": 2016,
          "periodico": "Journal of Fish Biology",
          "volume": 89,
          "paginaInicial": 12,
          "paginaFinal": 47,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 221,
          "tipo": "Artigo Publicado",
          "nome": "Photography-based taxonomy is inadequate, unnecessary, and potentially harmful for biological sciences",
          "ano": 2016,
          "periodico": "Zootaxa (Auckland. Print)",
          "volume": 4196,
          "paginaInicial": 435,
          "paginaFinal": 445,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 222,
          "tipo": "Artigo Publicado",
          "nome": "Contribui��es do Programa de P�s-Gradua��o em Ci�ncias Ambientais e Conserva��o na gera��o de conhecimento cient�fico promotor do desenvolvimento regional e conserva��o dos ecossistemas costeiros do norte do estado do Rio de Janeiro",
          "ano": 2016,
          "periodico": "RBPG. REVISTA BRASILEIRA DE P�S-GRADUA��O",
          "volume": 13,
          "paginaInicial": 917,
          "paginaFinal": 954,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 223,
          "tipo": "Artigo Publicado",
          "nome": "Zoologia, biologia evolutiva e sistem�tica",
          "ano": 2014,
          "periodico": "Cadernos NUPEM",
          "volume": 5,
          "paginaInicial": 43,
          "paginaFinal": 45,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 224,
          "tipo": "Artigo Publicado",
          "nome": "Reply to Vitule et al.</i> (2017): -Fish biodiversity and conservation in South America by Reis et al</i> . (2016)?",
          "ano": 2016,
          "periodico": "JOURNAL OF FISH BIOLOGY",
          "volume": 90,
          "paginaInicial": 1191,
          "paginaFinal": 1195,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 225,
          "tipo": "Artigo Publicado",
          "nome": "Marine fishes (Elasmobranchii and Teleostei) from the Santana Archipelago, a Marine Protected Area in the southwestern Atlantic",
          "ano": 2017,
          "periodico": "Marine Biology Research",
          "volume": 13,
          "paginaInicial": 1,
          "paginaFinal": 19,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 226,
          "tipo": "Artigo Publicado",
          "nome": "Redescription of the hagfishes (Myxinidae: Eptatretus</i> ) from southern Africa",
          "ano": 2017,
          "periodico": "Marine Biology Research",
          "volume": 13,
          "paginaInicial": 1,
          "paginaFinal": 14,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 227,
          "tipo": "Artigo Publicado",
          "nome": "O saber dos pescadores artesanais de Maca� (RJ): subs�dios para a conserva��o e manejo dos recursos pesqueiros marinhos",
          "ano": 2017,
          "periodico": "Boletin do Observat�rio Ambiental Alberto Ribeiro Lamego",
          "volume": 11,
          "paginaInicial": 59,
          "paginaFinal": 77,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 228,
          "tipo": "Artigo Publicado",
          "nome": "South-western Atlantic reef fishes: Zoogeographical patterns and ecological drivers reveal a secondary biodiversity centre in the Atlantic Ocean",
          "ano": 2018,
          "periodico": "DIVERSITY AND DISTRIBUTIONS",
          "volume": 4,
          "paginaInicial": 1,
          "paginaFinal": 15,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 229,
          "tipo": "Artigo Publicado",
          "nome": "Requesting South American participation in FISH-BOL",
          "ano": 2007,
          "periodico": "BOLETIM - SOCIEDADE BRASILEIRA DE ICTIOLOGIA (IMPRESSO)",
          "volume": 87,
          "paginaInicial": 6,
          "paginaFinal": 6,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 230,
          "tipo": "Artigo Publicado",
          "nome": "First records of the Redfin Brotula, Petrotyx sanguineus (Meek &amp; Hildebrand, 1928) (Ophidiiformes, Bythitidae), in the western South Atlantic",
          "ano": 2018,
          "periodico": "CHECK LIST, JOURNAL OF SPECIES LIST AND DISTRIBUTION",
          "volume": 14,
          "paginaInicial": 675,
          "paginaFinal": 679,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 231,
          "tipo": "Artigo Publicado",
          "nome": "The southernmost records of Brotula barbata</i> (Bloch &amp; Schneider 1801) (Ophidiiformes: Ophidiidae) in the western Atlantic Ocean",
          "ano": 2018,
          "periodico": "JOURNAL OF FISH BIOLOGY",
          "volume": 93,
          "paginaInicial": 715,
          "paginaFinal": 718,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 232,
          "tipo": "Artigo Publicado",
          "nome": "First record of the intermediate scabbardfish Aphanopus intermedius</i> (Scombriformes: Trichiuridae) in the western South Atlantic Ocean",
          "ano": 2018,
          "periodico": "JOURNAL OF FISH BIOLOGY",
          "volume": 93,
          "paginaInicial": 1,
          "paginaFinal": 4,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 233,
          "tipo": "Artigo Publicado",
          "nome": "Length-weight relationships of eleven mesopelagic fishes from oceanic islands of the Southwestern Tropical Atlantic",
          "ano": 2018,
          "periodico": "JOURNAL OF APPLIED ICHTHYOLOGY",
          "volume": 35,
          "paginaInicial": 1,
          "paginaFinal": 3,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 234,
          "tipo": "Artigo Publicado",
          "nome": "Blue Hake Antimora rostrata (Gadiformes: Moridae) off the Atlantic Coast of South America: an Overview on Its Distribution and Biology",
          "ano": 2019,
          "periodico": "Journal of Ichthyology",
          "volume": 59,
          "paginaInicial": 174,
          "paginaFinal": 185,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 235,
          "tipo": "Artigo Publicado",
          "nome": "Deep-sea manefishes (Perciformes: Caristiidae) from oceanic islands and seamounts off northeastern Brazil, with comments on the caristiids previously reported in Brazilian waters",
          "ano": 2019,
          "periodico": "MARINE BIOLOGY RESEARCH (ONLINE)",
          "volume": 15,
          "paginaInicial": 297,
          "paginaFinal": 304,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 236,
          "tipo": "Artigo Publicado",
          "nome": "The Fish Collection of the Instituto de Biodiversidade e Sustentabilidade - NUPEM/UFRJ, Universidade Federal do Rio de Janeiro (UFRJ), Brazil",
          "ano": 2019,
          "periodico": "BOLETIM - SOCIEDADE DE ICTIOLOGIA DE LONDRINA",
          "volume": 129,
          "paginaInicial": 109,
          "paginaFinal": 113,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 237,
          "tipo": "Artigo Publicado",
          "nome": "Deep-sea oceanic basslets (Perciformes, Howellidae) from Brazil: new records and range extensions",
          "ano": 2019,
          "periodico": "CHECK LIST, JOURNAL OF SPECIES LIST AND DISTRIBUTION",
          "volume": 15,
          "paginaInicial": 965,
          "paginaFinal": 971,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 238,
          "tipo": "Artigo Publicado",
          "nome": "New distributional and morphological data of two species of catsharks, genus Scyliorhinus Blainville, 1816 (Carcharhiniformes, Scyliorhinidae), from the western South Atlantic",
          "ano": 2020,
          "periodico": "CHECK LIST, JOURNAL OF SPECIES LIST AND DISTRIBUTION",
          "volume": 16,
          "paginaInicial": 47,
          "paginaFinal": 52,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 239,
          "tipo": "Artigo Publicado",
          "nome": "A new species of the genus Verilus (Teleostei, Percomorpha, Acropomatidae) from Brazil",
          "ano": 2020,
          "periodico": "ZOOTAXA",
          "volume": 4751,
          "paginaInicial": 589,
          "paginaFinal": 596,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 240,
          "tipo": "Artigo Publicado",
          "nome": "Hatchetfishes (Stomiiformes: Sternoptychidae) biodiversity, trophic ecology, vertical niche partitioning and functional roles in the western Tropical Atlantic",
          "ano": 2020,
          "periodico": "PROGRESS IN OCEANOGRAPHY",
          "volume": 187,
          "paginaInicial": 102389,
          "paginaFinal": null,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 241,
          "tipo": "Artigo Publicado",
          "nome": "Length&#8208;weight relationship of twelve mesopelagic fishes from the western Tropical Atlantic",
          "ano": 2020,
          "periodico": "JOURNAL OF APPLIED ICHTHYOLOGY",
          "volume": 36,
          "paginaInicial": 845,
          "paginaFinal": 848,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 242,
          "tipo": "Artigo Publicado",
          "nome": "Trophic ecology, habitat, and migratory behaviour of the viperfish Chauliodus sloani reveal a key mesopelagic player",
          "ano": 2020,
          "periodico": "Scientific Reports",
          "volume": 10,
          "paginaInicial": 1,
          "paginaFinal": 13,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 243,
          "tipo": "Artigo Publicado",
          "nome": "Deep-sea smelts, pencil smelts, and barreleyes (Teleostei: Argentiniformes) from oceanic islands and seamounts off northeastern Brazil",
          "ano": 2020,
          "periodico": "Marine Biology Research",
          "volume": 16,
          "paginaInicial": 762,
          "paginaFinal": 773,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 244,
          "tipo": "Artigo Publicado",
          "nome": "World scientists warning to humanity: A second notice",
          "ano": 2017,
          "periodico": "BIOSCIENCE",
          "volume": 12,
          "paginaInicial": 1026,
          "paginaFinal": 1028,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 245,
          "tipo": "Artigo Publicado",
          "nome": "Review of the hagfishes (Myxinidae) from the Galapagos Islands, with descriptions of four new species and their phylogenetic relationships",
          "ano": 2021,
          "periodico": "ZOOLOGICAL JOURNAL OF THE LINNEAN SOCIETY",
          "volume": 192,
          "paginaInicial": 453,
          "paginaFinal": 474,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 246,
          "tipo": "Artigo Publicado",
          "nome": "Taxonomy and Distribution of Deep-Sea Bigscales and Whalefishes (Teleostei: Stephanoberycoidei) Collected off Northeastern Brazil, Including Seamounts and Oceanic Islands",
          "ano": 2021,
          "periodico": "Ichthyology &amp; Herpetology",
          "volume": 109,
          "paginaInicial": 467,
          "paginaFinal": 488,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 247,
          "tipo": "Artigo Publicado",
          "nome": "Deep-sea anglerfishes (Lophiiformes: Ceratioidei) from off northeastern Brazil, with remarks on the ceratioids reported from the Brazilian Exclusive Economic Zone",
          "ano": 2021,
          "periodico": "Neotropical Ichthyology",
          "volume": 19,
          "paginaInicial": 1,
          "paginaFinal": 28,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 248,
          "tipo": "Artigo Publicado",
          "nome": "A new species of viviparous brotula genus <scp> Pseudogilbia</i> (Ophidiiformes: Dinematichthyidae) </scp> from <scp>Brazilian</scp> reefs, with an updated diagnosis of the genus",
          "ano": 2021,
          "periodico": "JOURNAL OF FISH BIOLOGY",
          "volume": 99,
          "paginaInicial": 1292,
          "paginaFinal": 1298,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 249,
          "tipo": "Artigo Publicado",
          "nome": "Distribution, vertical migration, and trophic ecology of lanternfishes (Myctophidae) in the Southwestern Tropical Atlantic",
          "ano": 2021,
          "periodico": "PROGRESS IN OCEANOGRAPHY",
          "volume": 199,
          "paginaInicial": 102695,
          "paginaFinal": null,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 250,
          "tipo": "Artigo Publicado",
          "nome": "The role of mesopelagic fishes as microplastics vectors across the deep-sea layers from the Southwestern Tropical Atlantic",
          "ano": 2022,
          "periodico": "ENVIRONMENTAL POLLUTION",
          "volume": 300,
          "paginaInicial": 118988,
          "paginaFinal": null,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 251,
          "tipo": "Artigo Publicado",
          "nome": "<scp>NEOTROPICAL FRESHWATER FISHES</scp> : A dataset of occurrence and abundance of freshwater fishes in the Neotropics",
          "ano": 2022,
          "periodico": "ECOLOGY",
          "volume": 104,
          "paginaInicial": 1,
          "paginaFinal": 2,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 252,
          "tipo": "Artigo Publicado",
          "nome": "First report of Lappetascaris lutjani Rasheed, 1965 (Nematoda, Ascaridoidea, Anisakidae) parasitizing Trachipterus arawatae (Pisces, Lampridiformes) on the Atlantic coast of Brazil",
          "ano": 2002,
          "periodico": "Mem�rias do Instituto Oswaldo Cruz (Impresso)",
          "volume": 97,
          "paginaInicial": 93,
          "paginaFinal": 94,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 253,
          "tipo": "Livro Publicado",
          "nome": "Atlas de sensibilidade ambiental ao �leo de Bacia Mar�tima de Campos",
          "ano": 2016,
          "periodico": "Minist�rio do Meio Ambiente",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 84,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 254,
          "tipo": "Capítulo de Livro",
          "nome": "Fam�lia Myxinidae",
          "ano": 2003,
          "periodico": "Cat�logo das esp�cies de peixes marinhos do Brasil",
          "volume": null,
          "paginaInicial": 21,
          "paginaFinal": null,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 255,
          "tipo": "Capítulo de Livro",
          "nome": "Family Myxinidae Hagfishes",
          "ano": 2008,
          "periodico": "Fishes of Australia?s Southern Coast",
          "volume": null,
          "paginaInicial": 26,
          "paginaFinal": 27,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 256,
          "tipo": "Capítulo de Livro",
          "nome": "Ictiofauna demersal.",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 295,
          "paginaFinal": 373,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 257,
          "tipo": "Capítulo de Livro",
          "nome": "Barathrodemus manatinus Goode & Bean, 1983.",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 344,
          "paginaFinal": 345,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 258,
          "tipo": "Capítulo de Livro",
          "nome": "Bassogigas gillii Goode & Bean, 1896.",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 346,
          "paginaFinal": 347,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 259,
          "tipo": "Capítulo de Livro",
          "nome": "Bassozetus robustus Smith & Radcliffe, 1913",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 348,
          "paginaFinal": 349,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 260,
          "tipo": "Capítulo de Livro",
          "nome": "Holcomycteronus squamosus (Roule, 1916).",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 350,
          "paginaFinal": 351,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 261,
          "tipo": "Capítulo de Livro",
          "nome": "Penopus microphthalmus (Vaillant, 1888).",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 352,
          "paginaFinal": 353,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 262,
          "tipo": "Capítulo de Livro",
          "nome": "Xyelacyba myersi Cohen, 1961",
          "ano": 2010,
          "periodico": "Biodiversidade da regi�o oce�nica profunda da Bacia de Campos: megafauna e ictiofauna demersal.",
          "volume": null,
          "paginaInicial": 354,
          "paginaFinal": 355,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 263,
          "tipo": "Capítulo de Livro",
          "nome": "Redescription of Eptatretus luzonicus Fernholm et al., 2013, a replacement name for Eptatretus fernholmi McMillan and Wisner, 2004 (Craniata: Myxinidae), based on the discovery of the holotype and additional specimens from the Philippines",
          "ano": 2014,
          "periodico": "The Coral Triangle: The 2011 Hearst Philippine Biodiversity Expedition",
          "volume": null,
          "paginaInicial": 341,
          "paginaFinal": 349,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 264,
          "tipo": "Capítulo de Livro",
          "nome": "Myxinifomes",
          "ano": 2015,
          "periodico": "Biologia e Ecologia dos Vertebrados",
          "volume": null,
          "paginaInicial": 13,
          "paginaFinal": 19,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 265,
          "tipo": "Capítulo de Livro",
          "nome": "Hagfishes",
          "ano": 2016,
          "periodico": "The living marine resources of the eastern Central Atlantic. Volume 2: Bivalves, gastropods, hagfishes, sharks, batoid fishes, and chimaeras",
          "volume": 2,
          "paginaInicial": 1117,
          "paginaFinal": 1121,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 335,
          "tipo": "Capítulo de Livro",
          "nome": "A singular din�mica territorial dos homic�dios no Brasil nos anos 2000",
          "ano": 2013,
          "periodico": "Brasil em Desenvolvimento 2013 - Estado, Planejamento e Pol�ticas P�blicas",
          "volume": 3,
          "paginaInicial": 877,
          "paginaFinal": 898,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 266,
          "tipo": "Capítulo de Livro",
          "nome": "Padr�es de distribui��o das assembleias de peixes e cefal�podes demersais na plataforma e talude continental da Bacia de Campos",
          "ano": 2017,
          "periodico": "Comunidades Demersais e Bioconstrutores: caracteriza��o ambiental regional da Bacia de Campos, Atl�ntico Sudoeste",
          "volume": 4,
          "paginaInicial": 87,
          "paginaFinal": 110,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 267,
          "tipo": "Capítulo de Livro",
          "nome": "Distribui��o e abund�ncia do n�cton demersal da plataforma e talude continental da Bacia de Campos",
          "ano": 2017,
          "periodico": "Comunidades Demersais e Bioconstrutores: caracteriza��o ambiental regional da Bacia de Campos, Atl�ntico Sudoeste",
          "volume": 4,
          "paginaInicial": 111,
          "paginaFinal": 138,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 268,
          "tipo": "Capítulo de Livro",
          "nome": "Ecologia tr�fica do n�cton demersal da plataforma e talude continental da Bacia de Campos",
          "ano": 2017,
          "periodico": "Comunidades Demersais e Bioconstrutores: caracteriza��o ambiental regional da Bacia de Campos, Atl�ntico Sudoeste",
          "volume": 4,
          "paginaInicial": 167,
          "paginaFinal": 185,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 269,
          "tipo": "Capítulo de Livro",
          "nome": "Peixes marinhos da Bacia de Campos: uma revis�o da diversidade",
          "ano": 2017,
          "periodico": "Comunidades Demersais e Bioconstrutores: caracteriza��o ambiental regional da Bacia de Campos, Atl�ntico Sudoeste",
          "volume": 4,
          "paginaInicial": 187,
          "paginaFinal": 216,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 270,
          "tipo": "Capítulo de Livro",
          "nome": "Peixes costeiros da Bacia de Campos",
          "ano": 2017,
          "periodico": "Atlas de sensibilidade ambiental ao �leo: caracteriza��o ambiental regional da Bacia de Campos, Atl�ntico Sudoeste",
          "volume": 9,
          "paginaInicial": 113,
          "paginaFinal": 126,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 271,
          "tipo": "Capítulo de Livro",
          "nome": "Ophidion holbrookii (Putnam, 1874)",
          "ano": 2018,
          "periodico": "Livro Vermelho da Fauna Brasileira Amea�ada de Extin��o: Volume VI - Peixes.",
          "volume": 6,
          "paginaInicial": 442,
          "paginaFinal": 444,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 272,
          "tipo": "Capítulo de Livro",
          "nome": "Achirus mucuri Ramos, Ramos & Lopes, 2009",
          "ano": 2018,
          "periodico": "Livro Vermelho da Fauna Brasileira Amea�ada de Extin��o: Volume VI - Peixes.",
          "volume": 6,
          "paginaInicial": 933,
          "paginaFinal": 935,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 273,
          "tipo": "Capítulo de Livro",
          "nome": "Myxine sotoi Mincarone, 2001",
          "ano": 2018,
          "periodico": "Livro Vermelho da Fauna Brasileira Amea�ada de Extin��o: Volume VI - Peixes.",
          "volume": 6,
          "paginaInicial": 1120,
          "paginaFinal": 1122,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 274,
          "tipo": "Capítulo de Livro",
          "nome": "Petromyzontiformes",
          "ano": 2015,
          "periodico": "Biologia e Ecologia dos Vertebrados",
          "volume": null,
          "paginaInicial": 21,
          "paginaFinal": 29,
          "pesquisadores": [
              "Michael Maia Mincarone"
          ]
      },
      {
          "id": 275,
          "tipo": "Artigo Publicado",
          "nome": "Consumo Alimentar aparente de ferro",
          "ano": 2006,
          "periodico": "CERES: nutri��o & sa�de",
          "volume": 2,
          "paginaInicial": 15,
          "paginaFinal": 28,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 276,
          "tipo": "Artigo Publicado",
          "nome": "High fat diet induces central obesity, insulin resistance and microvascular dysfunction in hamsters. Microvascular Research (Print)",
          "ano": 2011,
          "periodico": "Microvascular Research (Print)",
          "volume": 82,
          "paginaInicial": 416,
          "paginaFinal": 422,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 277,
          "tipo": "Artigo Publicado",
          "nome": "Aerobic exercise improves microvascular dysfunction in fructose fed hamsters",
          "ano": 2014,
          "periodico": "Microvascular Research (Print)",
          "volume": 93,
          "paginaInicial": 34,
          "paginaFinal": 41,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 278,
          "tipo": "Artigo Publicado",
          "nome": "REFLEX�ES ACERCA DA EDUCA��O ESCOLAR QUILOMBOLA NA COMUNIDADE REMANESCENTE DE QUILOMBO MACHADINHA/QUISSAM�/RJ",
          "ano": 2017,
          "periodico": "HUMANIDADES & INOVA��O",
          "volume": 4,
          "paginaInicial": 225,
          "paginaFinal": 233,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 279,
          "tipo": "Artigo Publicado",
          "nome": "A promo��o da alimenta��o saud�vel sob a �tica de atores sociais que coordenam o Programa de Alimenta��o Escolar em munic�pios do Rio de Janeiro",
          "ano": 2018,
          "periodico": "REVISTA DA ASSOCIA��O BRASILEIRA DE NUTRI��O",
          "volume": 9,
          "paginaInicial": 75,
          "paginaFinal": 87,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 280,
          "tipo": "Artigo Publicado",
          "nome": "O PROCESSO EDUCATIVO DO JONGO NO QUILOMBO MACHADINHA: ORALIDADE, SABER DA EXPERI�NCIA E IDENTIDADE",
          "ano": 2019,
          "periodico": "EDUCA��O & SOCIEDADE",
          "volume": 40,
          "paginaInicial": 1,
          "paginaFinal": 17,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 281,
          "tipo": "Artigo Publicado",
          "nome": "Culin�ria afro-brasileira: um sabor poss�vel na Educa��o de Jovens e Adultos",
          "ano": 2019,
          "periodico": "Cadernos Cenpec",
          "volume": 9,
          "paginaInicial": 75,
          "paginaFinal": 99,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 282,
          "tipo": "Artigo Publicado",
          "nome": "Encontros, sabores e experi�ncias entre grades: dialogando sobre sa�de, vida e prazer",
          "ano": 2018,
          "periodico": "RA�ZES E RUMOS",
          "volume": 6,
          "paginaInicial": 167,
          "paginaFinal": 174,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 283,
          "tipo": "Artigo Publicado",
          "nome": "As potencialidades da educa��o popular na constru��o curricular da forma��o em nutri��o",
          "ano": 2020,
          "periodico": "REVISTA DE EDUCA��O POPULAR (IMPRESSO)",
          "volume": 19,
          "paginaInicial": 3,
          "paginaFinal": 23,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 284,
          "tipo": "Artigo Publicado",
          "nome": "Direito Humano � Alimenta��o Adequada como di�logo na Educa��o de Jovens e Adultos de Maca�",
          "ano": 2020,
          "periodico": "REVISTA �FRICA E AFRICANIDADES",
          "volume": 34,
          "paginaInicial": 1,
          "paginaFinal": 16,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 285,
          "tipo": "Artigo Publicado",
          "nome": "Culin�ria, hist�rias e educa��o popular",
          "ano": 2021,
          "periodico": "REVISTA DE EDUCA��O POPULAR (IMPRESSO)",
          "volume": 20,
          "paginaInicial": 252,
          "paginaFinal": 274,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 286,
          "tipo": "Artigo Publicado",
          "nome": "?N�O � UMA ASSOCIA��O PARA CUIDAR DAS TERRAS, MAS PARA CUIDAR DAS PESSOAS?: A ORGANIZA��O SOCIAL QUILOMBOLA SOB AS LENTES DA EDUCA��O CR�TICA",
          "ano": 2017,
          "periodico": "HUMANIDADES & INOVA��O",
          "volume": 4,
          "paginaInicial": 129,
          "paginaFinal": 144,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 287,
          "tipo": "Livro Publicado",
          "nome": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "ano": 2021,
          "periodico": "Universidade Federal do Rio de Janeiro, Instituto NUTES de Educa��o em Ci�ncias e Sa�de",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 240,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 288,
          "tipo": "Capítulo de Livro",
          "nome": "'Caf�, farinha torrada e a��car?: den�ncia de iniquidades e proposta de novos sabores � Educa��o",
          "ano": 2019,
          "periodico": "DECOLONIALIDADES NA EDUCA��O EM CI�NCIAS",
          "volume": 1,
          "paginaInicial": 307,
          "paginaFinal": 332,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 289,
          "tipo": "Capítulo de Livro",
          "nome": "Projeto de extens�o A culin�ria afro-brasileira como promotora da alimenta��o saud�vel no ambiente escolar - CulinAfro",
          "ano": 2020,
          "periodico": "Projeto de extens�o A culin�ria afro-brasileira como promotora da alimenta��o saud�vel no ambiente escolar - CulinAfro",
          "volume": null,
          "paginaInicial": 63,
          "paginaFinal": 79,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 290,
          "tipo": "Capítulo de Livro",
          "nome": "A RECEP��O DE CALOUROS DO CURSO DE NUTRI��O DA UFRJ- CAMPUS MACA� ? UM RELATO DE EXPERI�NCIA",
          "ano": 2021,
          "periodico": "Experi�ncias, Sabores e Afetos: dez anos do curso de Nutri��o do campus UFRJ - Maca�",
          "volume": 1,
          "paginaInicial": 65,
          "paginaFinal": 77,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 291,
          "tipo": "Capítulo de Livro",
          "nome": "Aprendizados quilombolas e os desafios de di�logo com a escola",
          "ano": 2021,
          "periodico": "Aprendizagens, Experi�ncias, Sensibilidades e Resist�ncias: Estrat�gias para enfrentar as desigualdades na educa��o",
          "volume": 1,
          "paginaInicial": 157,
          "paginaFinal": 162,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 292,
          "tipo": "Capítulo de Livro",
          "nome": "Introdu��o - Experi�ncias e aprendizados na encruzilhada dos saberes: cozinha e escola quilombolas",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 11,
          "paginaFinal": 16,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 293,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo I - Aprendendo com as mestras das cozinhas dom�sticas da Comunidade Remanescente de Quilombo Machadinha - RJ",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 18,
          "paginaFinal": 32,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 294,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo II - A feijoada da Comunidade Remanescente de Quilombo Machadinha/RJ: para pensar o mito da democracia racial",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 33,
          "paginaFinal": 50,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 295,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo III - Panela, l�pis e colher de pau: a cozinha dom�stica quilombola alimenta a sala de aula",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 51,
          "paginaFinal": 69,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 296,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo V - Educa��o quilombola como pr�tica de liberdade: as narrativas de educadoras da Comunidade Remanescente de Quilombo Machadinha/RJ",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 93,
          "paginaFinal": 117,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 297,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo VI - A educa��o escolar na Comunidade Remanescente de Quilombo Machadinha: entrevistas com educadores da Escola Municipal Felizarda Maria Concei��o de Azevedo, Quissam�/RJ",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 118,
          "paginaFinal": 127,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 336,
          "tipo": "Artigo Publicado",
          "nome": "EXPERI�NCIAS DE AVALIA��O DO SETOR SUPLEMENTAR DE SA�DE: CONTRIBUI��ES DA INTEGRALIDADE",
          "ano": 2008,
          "periodico": "Ci�ncia e Sa�de Coletiva (Impresso)",
          "volume": 13,
          "paginaInicial": 1489,
          "paginaFinal": 1500,
          "pesquisadores": [
              "Lu�s Claudio de Carvalho"
          ]
      },
      {
          "id": 298,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo IX - Os desafios e as potencialidades da alimenta��o escolar quilombola em Machadinha: entrevista com a nutricionista respons�vel t�cnica do Programa Nacional de Alimenta��o Escolar de Quissam�/RJ",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 164,
          "paginaFinal": 180,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 299,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo X - Estado Nutricional e alimenta��o escolar de estudantes da Comunidade Remanescente de Quilombo Machadinha, Quissam�/RJ",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 181,
          "paginaFinal": 203,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 300,
          "tipo": "Capítulo de Livro",
          "nome": "Cap�tulo XII - Pr�tica educativa pelo cinema: narrando, ad-mirando e tornando-se sujeito da palavra-corpo-grafia quilombola",
          "ano": 2021,
          "periodico": "Tempero de Quilombo na Escola: Experi�ncias de Extens�o do Projeto CulinAfro (UFRJ-Maca�)",
          "volume": 1,
          "paginaInicial": 211,
          "paginaFinal": 222,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 301,
          "tipo": "Capítulo de Livro",
          "nome": "Tecnologia social e educa��o popular: o desenvolvimento de uma casa de farinha em um assentamento de reforma agr�ria",
          "ano": 2021,
          "periodico": "Tecnologia social e reforma agr�ria popular",
          "volume": 1,
          "paginaInicial": 199,
          "paginaFinal": 242,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 302,
          "tipo": "Capítulo de Livro",
          "nome": "Aprendendo a dizer adeus",
          "ano": 2021,
          "periodico": "Sobre nossas av�s: mem�ria, resist�ncia, ancestralidade",
          "volume": 1,
          "paginaInicial": 161,
          "paginaFinal": 162,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 303,
          "tipo": "Capítulo de Livro",
          "nome": "Mulheres negras, ci�ncia e cozinha: na encruzilhada de pot�ncias",
          "ano": 2021,
          "periodico": "Ensino, diversidade cultural e decoloniza��o",
          "volume": 2,
          "paginaInicial": 18,
          "paginaFinal": 25,
          "pesquisadores": [
              "Rute Ramos da Silva Costa"
          ]
      },
      {
          "id": 304,
          "tipo": "Artigo Publicado",
          "nome": "Syphilitic dementia",
          "ano": 2005,
          "periodico": "Arquivos de Neuro-Psiquiatria",
          "volume": 63,
          "paginaInicial": 114,
          "paginaFinal": null,
          "pesquisadores": [
              "Juss�ra Mathias Netto Khouri"
          ]
      },
      {
          "id": 305,
          "tipo": "Artigo Publicado",
          "nome": "Neuromyelitis Optica With Onset in Childhood and Adolescence",
          "ano": 2014,
          "periodico": "Pediatric Neurology",
          "volume": 50,
          "paginaInicial": 66,
          "paginaFinal": null,
          "pesquisadores": [
              "Juss�ra Mathias Netto Khouri"
          ]
      },
      {
          "id": 306,
          "tipo": "Artigo Publicado",
          "nome": "CHRONIC MYELOPATHY AND ENCEPHALOPATHY CAUSED BY PARVOVIRUS",
          "ano": 2003,
          "periodico": "Journal of Neurological Sciences",
          "volume": 214,
          "paginaInicial": 57,
          "paginaFinal": 111,
          "pesquisadores": [
              "Juss�ra Mathias Netto Khouri"
          ]
      },
      {
          "id": 307,
          "tipo": "Livro Publicado",
          "nome": "Exame Neurol�gico O Roteiro B�sico",
          "ano": 2009,
          "periodico": "Jussara Mathias Netto Khouri",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 306,
          "pesquisadores": [
              "Juss�ra Mathias Netto Khouri"
          ]
      },
      {
          "id": 308,
          "tipo": "Capítulo de Livro",
          "nome": "Recomenda��es para o tratamento de Esclerose M�ltipla com Imunomoduladores",
          "ano": 2012,
          "periodico": "Recomenda��es Esclerose M�ltipla",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 112,
          "pesquisadores": [
              "Juss�ra Mathias Netto Khouri"
          ]
      },
      {
          "id": 309,
          "tipo": "Artigo Publicado",
          "nome": "A enfermagem e a sa�de da mulher: quest�es de g�nero e sociopol�ticas",
          "ano": 2000,
          "periodico": "ESCOLA ANNA NERY",
          "volume": 4,
          "paginaInicial": 105,
          "paginaFinal": 114,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 310,
          "tipo": "Artigo Publicado",
          "nome": "O cotiadiano da assist�ncia ao rec�m-nascido: propostas governamentais e bases operacionais/ The everyday assistance to the newborn: governmental proposals and operational bases",
          "ano": 2001,
          "periodico": "ESCOLA ANNA NERY",
          "volume": 5,
          "paginaInicial": 315,
          "paginaFinal": 324,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 311,
          "tipo": "Artigo Publicado",
          "nome": "CONHECIMENTO DOS AGENTES COMUNIT�RIOS DE SA�DE SOBRE O SISTEMA DE VIGIL�NCIA ALIMENTAR E NUTRICIONAL NAS ESTRAT�GIAS DE SA�DE DA FAM�LIA - MACA�",
          "ano": 2013,
          "periodico": "The FIEP Bulletin",
          "volume": 83,
          "paginaInicial": 239,
          "paginaFinal": 242,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 312,
          "tipo": "Artigo Publicado",
          "nome": "VIV�NCIAS NA PANDEMIA POR COVID-19: REFLEX�ES SOBRE OS DESAFIOS COTIDIANOS DOS M�LTIPLOS PAP�IS FEMININOS",
          "ano": 2020,
          "periodico": "BOLETIM CI�NCIA MACA�",
          "volume": 1,
          "paginaInicial": 73,
          "paginaFinal": 92,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 313,
          "tipo": "Artigo Publicado",
          "nome": "TEND�NCIA TEMPORAL DO ALEITAMENTO MATERNO NO MUNIC�PIO DE MACA�/RIO DE JANEIRO",
          "ano": 2020,
          "periodico": "REVISTA VARIA SCIENTIA  CI�NCIAS DA SA�DE",
          "volume": 6,
          "paginaInicial": 92,
          "paginaFinal": 100,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 314,
          "tipo": "Artigo Publicado",
          "nome": "Tendencias da produ��o cient�fica de enfermagem na �rea de sa�de da mulher.",
          "ano": 2001,
          "periodico": "Escola Anna Nery",
          "volume": 5,
          "paginaInicial": 335,
          "paginaFinal": 346,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 315,
          "tipo": "Livro Publicado",
          "nome": "Sa�de da mulher no Norte Fluminense",
          "ano": 2020,
          "periodico": "Editora e Livraria Appris Ltda",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 187,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 316,
          "tipo": "Capítulo de Livro",
          "nome": "PARTO DOMICILIAR: ESCOLHA E RELATO DAS EXPERI�NCIAS VIVENCIADAS POR MULHERES E SEUS COMPANHEIROS",
          "ano": 2020,
          "periodico": "Impress�es sobre o Cuidar de Enfermagem Sistematizado 2",
          "volume": 1,
          "paginaInicial": 144,
          "paginaFinal": 154,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 317,
          "tipo": "Capítulo de Livro",
          "nome": "AN�LISE DAS TAXAS DE NASCIMENTOS NO MUNIC�PIO DE MACA� EM UMA D�CADA",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 13,
          "paginaFinal": 26,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 318,
          "tipo": "Capítulo de Livro",
          "nome": "PERFIL DA PREMATURIDADE NO MUNIC�PIO DE MACA� ? RIO DE JANEIRO",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 27,
          "paginaFinal": null,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 319,
          "tipo": "Capítulo de Livro",
          "nome": "MORTALIDADE MATERNA DA MULHER NEGRA NO MUNIC�PIO DE MACA�",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 59,
          "paginaFinal": 68,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 320,
          "tipo": "Capítulo de Livro",
          "nome": "INTERVEN��ES NO TRABALHO DE PARTO E NASCIMENTO E A SATISFA��O DAS MULHERES COM OS CUIDADOS PRESTADOS",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 69,
          "paginaFinal": 88,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 321,
          "tipo": "Capítulo de Livro",
          "nome": "A VIV�NCIA DA MATERNAGEM DE MULHERES-M�ES NO MUNIC�PIO DE MACA�-RJ",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 89,
          "paginaFinal": 104,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 322,
          "tipo": "Capítulo de Livro",
          "nome": "A ESCOLHA DE M�TODOS CONTRACEPTIVOS POR PU�RPERAS ATENDIDAS NA REDE P�BLICA DE ASSIST�NCIA � SA�DE DO MUNIC�PIO DE MACA�/RJ",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 145,
          "paginaFinal": 158,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 323,
          "tipo": "Capítulo de Livro",
          "nome": "INFLU�NCIAS DOS FATORES SOCIOECON�MICOS NO ARREPENDIMENTO P�S LAQUEADURA TUB�RIA",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 159,
          "paginaFinal": null,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 324,
          "tipo": "Capítulo de Livro",
          "nome": "M�ES ADOLESCENTES E SEUS FILHOS: UMA REVIS�O INTEGRATIVA SOBRE ALEITAMENTO MATERNO",
          "ano": 2020,
          "periodico": "A Enfermagem Centrada na Investiga��o Cient�fica 5",
          "volume": 1,
          "paginaInicial": 36,
          "paginaFinal": 52,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 325,
          "tipo": "Capítulo de Livro",
          "nome": "ALEITAMENTO MATERNO EM COMUNIDADE DO NORTE FLUMINENSE: VIV�NCIA DE MULHERES-M�ES",
          "ano": 2020,
          "periodico": "Sa�de da mulher no norte fluminense",
          "volume": 1,
          "paginaInicial": 105,
          "paginaFinal": null,
          "pesquisadores": [
              "Patricia Regina Affonso de Siqueira"
          ]
      },
      {
          "id": 326,
          "tipo": "Artigo Publicado",
          "nome": "Lack of association between the 5-HTTLPR and positive screening for mental disorders among children exposed to urban violence and maltreatment",
          "ano": 2014,
          "periodico": "Revista Brasileira de Psiquiatria (S�o Paulo. 1999. Impresso)",
          "volume": 0,
          "paginaInicial": 0,
          "paginaFinal": 0,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 327,
          "tipo": "Artigo Publicado",
          "nome": "Associa��o entre atividade f�sica e marcadores bioqu�micos de risco para doen�a cardiovascular em adolescentes de escolas p�blicas de Piracicaba",
          "ano": 2013,
          "periodico": "Revista Brasileira de Atividade F�sica e Sa�de",
          "volume": 18,
          "paginaInicial": 614,
          "paginaFinal": null,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 328,
          "tipo": "Artigo Publicado",
          "nome": "Influence Diagnostics for Linear Models with First-Order Autoregressive Elliptical Errors",
          "ano": 2009,
          "periodico": "Statistics & Probability Letters",
          "volume": 79,
          "paginaInicial": 339,
          "paginaFinal": 346,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 329,
          "tipo": "Artigo Publicado",
          "nome": "Monthly Distribution of Phlebotomine Sand Flies, and Biotic and Abiotic Factors Related to Their Abundance, in an Urban Area to Which Visceral Leishmaniasis Is Endemic in Corumb�, Brazil",
          "ano": 2016,
          "periodico": "Plos One",
          "volume": 11,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 330,
          "tipo": "Artigo Publicado",
          "nome": "Experimental infection and transmission of Leishmania by Lutzomyia cruzi (Diptera: Psychodidae): Aspects of the ecology of parasite-vector interactions",
          "ano": 2017,
          "periodico": "PLoS Neglected Tropical Diseases (Online)",
          "volume": 11,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 331,
          "tipo": "Artigo Publicado",
          "nome": "Congenital Zika Syndrome in a Brazil-Paraguay-Bolivia border region: Clinical features of cases diagnosed between 2015 and 2018",
          "ano": 2019,
          "periodico": "PLoS One",
          "volume": 14,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 332,
          "tipo": "Artigo Publicado",
          "nome": "Molecular testing and analysis of disease spreading during the emergence of COVID-19 in Maca�, the Brazilian National Capital of Oil",
          "ano": 2021,
          "periodico": "Scientific Reports",
          "volume": 11,
          "paginaInicial": 1,
          "paginaFinal": 13,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 333,
          "tipo": "Artigo Publicado",
          "nome": "Spatio-temporal modeling of visceral leishmaniasis in Midwest Brazil: An ecological study of 18-years data (2001-2018)",
          "ano": 2020,
          "periodico": "PLoS One",
          "volume": 15,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 334,
          "tipo": "Capítulo de Livro",
          "nome": "Risco Nutricional e Fragilidade em Idosos Institucionalizados do Munic�pio de Maca� (RJ)",
          "ano": 2020,
          "periodico": "Nutri��o no envelhecer",
          "volume": null,
          "paginaInicial": 235,
          "paginaFinal": 280,
          "pesquisadores": [
              "M�rcio Jos� de Medeiros"
          ]
      },
      {
          "id": 337,
          "tipo": "Artigo Publicado",
          "nome": "Disputas en torno a los planes de cuidado en la internaci�n domiciliaria: Una reflexi�n necesaria",
          "ano": 2007,
          "periodico": "Salud Colectiva",
          "volume": 3,
          "paginaInicial": 259,
          "paginaFinal": 269,
          "pesquisadores": [
              "Lu�s Claudio de Carvalho"
          ]
      },
      {
          "id": 338,
          "tipo": "Capítulo de Livro",
          "nome": "Refletindo sobre o Ato de Cuidar da Sa�de",
          "ano": 2003,
          "periodico": "Constru��o da Integralidade: cotidiano, saberes e pr�ticas em sa�de",
          "volume": null,
          "paginaInicial": 113,
          "paginaFinal": 128,
          "pesquisadores": [
              "Lu�s Claudio de Carvalho"
          ]
      },
      {
          "id": 339,
          "tipo": "Capítulo de Livro",
          "nome": "Avalia��o de redes de aten��o � sa�de: contribui��es da integralidade",
          "ano": 2006,
          "periodico": "Gest�o em Redes: pr�ticas de avalia��o, forma��o e participa��o na sa�de",
          "volume": null,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Lu�s Claudio de Carvalho"
          ]
      },
      {
          "id": 340,
          "tipo": "Capítulo de Livro",
          "nome": "O cuidado na Aten��o Domiciliar, a face da disputa do plano de cuidados e o encontro com a morte em casa",
          "ano": 2013,
          "periodico": "Assist�ncia Domiciliar Pedi�trica",
          "volume": 1,
          "paginaInicial": 19,
          "paginaFinal": 39,
          "pesquisadores": [
              "Lu�s Claudio de Carvalho"
          ]
      },
      {
          "id": 341,
          "tipo": "Capítulo de Livro",
          "nome": "A DISPUTA DE CUIDADO E A MORTE NO DOMIC�LIO:  DESAFIOS PARA A��ES SINGULARES DAS REDES DE ATEN��O B�SICA",
          "ano": 2012,
          "periodico": "TECENDO REDES: OS PLANOS DA EDUCA��O, CUIDADO E GEST�O NA CONSTRU��O DO SUS / A EXPERI�NCIA DE VOLTA REDONDA- RJ",
          "volume": null,
          "paginaInicial": 1,
          "paginaFinal": 391,
          "pesquisadores": [
              "Lu�s Claudio de Carvalho"
          ]
      },
      {
          "id": 342,
          "tipo": "Artigo Publicado",
          "nome": "Aproveitamento da energia das mar�s para a gera��o de eletricidade",
          "ano": 2008,
          "periodico": "PCH NOT�CIAS & SHP NEWS",
          "volume": 38,
          "paginaInicial": 35,
          "paginaFinal": 40,
          "pesquisadores": [
              "Rafael Malheiro da Silva do Amaral Ferreira"
          ]
      },
      {
          "id": 343,
          "tipo": "Artigo Publicado",
          "nome": "Perspectivas da PCH Bacanga movida pela energia das mar�s",
          "ano": 2009,
          "periodico": "PCH Not�cias & SHP News",
          "volume": 42,
          "paginaInicial": 19,
          "paginaFinal": 24,
          "pesquisadores": [
              "Rafael Malheiro da Silva do Amaral Ferreira"
          ]
      },
      {
          "id": 344,
          "tipo": "Artigo Publicado",
          "nome": "Explora��o de energia maremotriz para gera��o de eletricidade: aspectos b�sicos e principais tend�ncias",
          "ano": 2011,
          "periodico": "Ingeniare. Revista Chilena de Ingenier�a (Impresa)",
          "volume": 19,
          "paginaInicial": 219,
          "paginaFinal": 232,
          "pesquisadores": [
              "Rafael Malheiro da Silva do Amaral Ferreira"
          ]
      },
      {
          "id": 345,
          "tipo": "Artigo Publicado",
          "nome": "Under What Conditions SAR Along-Track Interferometry is Suitable for Assessment of Tidal Energy Resource",
          "ano": 2016,
          "periodico": "IEEE Journal of Selected Topics in Applied Earth Observations and Remote Sensing",
          "volume": 9,
          "paginaInicial": 1,
          "paginaFinal": 12,
          "pesquisadores": [
              "Rafael Malheiro da Silva do Amaral Ferreira"
          ]
      },
      {
          "id": 346,
          "tipo": "Artigo Publicado",
          "nome": "Alternative concept for tidal power plant with reservoir restrictions",
          "ano": 2009,
          "periodico": "Renewable Energy",
          "volume": 34,
          "paginaInicial": 1151,
          "paginaFinal": 1157,
          "pesquisadores": [
              "Rafael Malheiro da Silva do Amaral Ferreira"
          ]
      },
      {
          "id": 347,
          "tipo": "Artigo Publicado",
          "nome": "Relationship of Mercury with Aluminum, Iron and Manganese Oxy-Hidroxides in Sediments from the Alto Pantanal",
          "ano": 2000,
          "periodico": "SCIENCE OF THE TOTAL ENVIRONMENT",
          "volume": 260,
          "paginaInicial": 97,
          "paginaFinal": 107,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 348,
          "tipo": "Artigo Publicado",
          "nome": "Physikalisch-chemische und biologische Verfahren zur Behandlung quecksilberkontaminierter mineralischer Abf�lle",
          "ano": 2008,
          "periodico": "Altlasten-Spektrum",
          "volume": 3,
          "paginaInicial": 101,
          "paginaFinal": 114,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 349,
          "tipo": "Artigo Publicado",
          "nome": "Colorimetric Determination of Ether Amine Greases Utilized In the Flotation of Iron Ore",
          "ano": 2009,
          "periodico": "Journal of Analytical Chemistry (Moscow)",
          "volume": 64,
          "paginaInicial": 390,
          "paginaFinal": 392,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 350,
          "tipo": "Artigo Publicado",
          "nome": "Reciclagem de Aminas na Flota��o de Min�rio de Ferro",
          "ano": 2008,
          "periodico": "Revista da Escola de Minas",
          "volume": 61,
          "paginaInicial": 455,
          "paginaFinal": 460,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 351,
          "tipo": "Artigo Publicado",
          "nome": "Quantifica��o de Aminas Graxas em Res�duos da Flota��o de Min�rio de Ferro.",
          "ano": 2009,
          "periodico": "Analytica (S�o Paulo)",
          "volume": 42,
          "paginaInicial": 68,
          "paginaFinal": 71,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 352,
          "tipo": "Artigo Publicado",
          "nome": "Estudos Comparativos entre Carv�o Ativado e Resina de Troca I�nica para Adsor��o de Ouro, Cobre e Ferro",
          "ano": 2009,
          "periodico": "Revista da Escola de Minas (Impresso)",
          "volume": 62,
          "paginaInicial": 463,
          "paginaFinal": 468,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 353,
          "tipo": "Artigo Publicado",
          "nome": "Crystal violet dye adsorption by a biosorbent mixture obtained from Salvinia biloba and Pistia stratiotes",
          "ano": 2016,
          "periodico": "Journal of Basic and Applied Research",
          "volume": 13,
          "paginaInicial": 222,
          "paginaFinal": 231,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 354,
          "tipo": "Artigo Publicado",
          "nome": "Pb(II) adsorption by biomass from chemically modified aquatic macrophytes, Salvinia sp. and Pistia stratiotes",
          "ano": 2016,
          "periodico": "Water Science and Technology",
          "volume": 73,
          "paginaInicial": 2670,
          "paginaFinal": 2679,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 355,
          "tipo": "Artigo Publicado",
          "nome": "Contextualizando a qu�mica com a educa��o sexual aplicada de forma transdisciplinar nas aulas de biologia",
          "ano": 2016,
          "periodico": "Qu�mica Nova na Escola (Impresso)",
          "volume": 34,
          "paginaInicial": 342,
          "paginaFinal": 348,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 356,
          "tipo": "Artigo Publicado",
          "nome": "Studies of selective adsorption, desorption and reuse of chemically altered biomass produced from aquatic macrophytes for treatment of metal-containing wastewater",
          "ano": 2017,
          "periodico": "WATER SCIENCE AND TECHNOLOGY",
          "volume": 75,
          "paginaInicial": null,
          "paginaFinal": 2093,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 357,
          "tipo": "Artigo Publicado",
          "nome": "Adsorption of indigo carmine on Pistia stratiotes dry biomass chemically modified",
          "ano": 2019,
          "periodico": "Environmental Science and Pollution Research",
          "volume": 26,
          "paginaInicial": 28614,
          "paginaFinal": 28621,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 358,
          "tipo": "Artigo Publicado",
          "nome": "Use of Salvinia sp on the adsorption of hexavalent chromium",
          "ano": 2019,
          "periodico": "Environmental Science and Pollution Research",
          "volume": 26,
          "paginaInicial": 30463,
          "paginaFinal": 30471,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 359,
          "tipo": "Artigo Publicado",
          "nome": "A watershed impacted by anthropogenic activities: Microbial community alterations and reservoir of antimicrobial resistance genes",
          "ano": 2021,
          "periodico": "SCIENCE OF THE TOTAL ENVIRONMENT",
          "volume": 793,
          "paginaInicial": 148552,
          "paginaFinal": null,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 360,
          "tipo": "Artigo Publicado",
          "nome": "Emulsified oil separation by bioadsorption: a sustainable proposal",
          "ano": 2020,
          "periodico": "ENVIRONMENTAL TECHNOLOGY",
          "volume": 41,
          "paginaInicial": 1,
          "paginaFinal": 13,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 361,
          "tipo": "Artigo Publicado",
          "nome": "Biodegradation studies on fatty amines used for reverse flotation of iron ore",
          "ano": 2010,
          "periodico": "International Biodeterioration and Biodegradation",
          "volume": 64,
          "paginaInicial": 151,
          "paginaFinal": 155,
          "pesquisadores": [
              "Danielle Marques de Araujo Stapelfeldt"
          ]
      },
      {
          "id": 362,
          "tipo": "Artigo Publicado",
          "nome": "Probing the Electronic Factors Responible for the Electron-Transfer Induced Isomerism fac-mer: Synthesis, Eletrochemical and Spectroscopic Studies of fac-[Mn(CO)3(L'-L')L]0/+ Complexes",
          "ano": 2005,
          "periodico": "INORGANICA CHIMICA ACTA",
          "volume": 258,
          "paginaInicial": 3735,
          "paginaFinal": 3744,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 363,
          "tipo": "Artigo Publicado",
          "nome": "The role of oxygen vacancy in the photoluminescence property at room temperature of the CaTiO[sub 3]",
          "ano": 2009,
          "periodico": "JOURNAL OF APPLIED PHYSICS",
          "volume": 106,
          "paginaInicial": 43526,
          "paginaFinal": null,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 364,
          "tipo": "Artigo Publicado",
          "nome": "CONTRIBUI��ES TE�RICAS PARA CONSTRU��O DE UM DI�LOGO ENTRE A FORMA��O DE PROFESSORES E A EDUCA��O AMBIENTAL",
          "ano": 2018,
          "periodico": "REVISTA GEPESVIDA",
          "volume": 4,
          "paginaInicial": 423,
          "paginaFinal": 434,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 365,
          "tipo": "Artigo Publicado",
          "nome": "Relation between photoluminescence emission and local order-disorder in the CaTiO3 lattice modifier",
          "ano": 2007,
          "periodico": "Applied Physics Letters",
          "volume": 90,
          "paginaInicial": 111904,
          "paginaFinal": 111904,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 366,
          "tipo": "Capítulo de Livro",
          "nome": "Reflex�es pedag�gicas sobre o ato pol�tico de educar",
          "ano": 2020,
          "periodico": "Educar � um ato pol�tico",
          "volume": 3,
          "paginaInicial": 233,
          "paginaFinal": 248,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 367,
          "tipo": "Capítulo de Livro",
          "nome": "Desafios e reflex�es da implementa��o da educa��o ambiental no ensino superior sob o vi�s da perspectiva cr�tica e complexa",
          "ano": 2020,
          "periodico": "Educa��o Brasil 2",
          "volume": 2,
          "paginaInicial": 198,
          "paginaFinal": 211,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 368,
          "tipo": "Capítulo de Livro",
          "nome": "Revisitando o pensamento freiriano em di�logo com o pensamento moriniano: por uma escola cidad� e por uma nova racionalidade",
          "ano": 2020,
          "periodico": "Educar � um ato de coragem",
          "volume": 2,
          "paginaInicial": 311,
          "paginaFinal": 329,
          "pesquisadores": [
              "Juliana Milanez"
          ]
      },
      {
          "id": 369,
          "tipo": "Artigo Publicado",
          "nome": "Aspectos �ticos e implica��es jur�dicas do enfermeiro frente ao preparo e administra��o de soros e antibi�ticos: revis�o de literatura.",
          "ano": 2009,
          "periodico": "Revista de Enfermagem UFPE on line",
          "volume": 3,
          "paginaInicial": 3,
          "paginaFinal": null,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 370,
          "tipo": "Artigo Publicado",
          "nome": "Preparo e administra��o venosa de medicamentos e soros sob a �tica da Resolu��o COFEN n� 311/07",
          "ano": 2010,
          "periodico": "Acta Paulista de Enfermagem (UNIFESP. Impresso)",
          "volume": 23,
          "paginaInicial": 843,
          "paginaFinal": 851,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 371,
          "tipo": "Artigo Publicado",
          "nome": "El vivir de las mujeres en el climaterio: revisi�n sistem�tica de la literatura",
          "ano": 2012,
          "periodico": "Enfermer�a Global",
          "volume": 25,
          "paginaInicial": 440,
          "paginaFinal": 451,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 372,
          "tipo": "Artigo Publicado",
          "nome": "Altera��es F�sico-Psicol�gicas do Climat�rio no Ambiente de Trabalho e Suas Interfer�ncias na Qualidade de Vida da Mulher: Atua��o para o Enfermeiro do Trabalho",
          "ano": 2010,
          "periodico": "Revista de Pesquisa: Cuidado � Fundamental",
          "volume": 2,
          "paginaInicial": 554,
          "paginaFinal": null,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 373,
          "tipo": "Artigo Publicado",
          "nome": "ABSENTEEISM WITH FOCUS ON THE HEALTH OF THE NURSING TEAM WORKER ACTING IN INTENSIVE CARE: INTEGRATIVE REVIEW",
          "ano": 2016,
          "periodico": "Revista de Enfermagem UFPE on line",
          "volume": 10,
          "paginaInicial": 3426,
          "paginaFinal": 3437,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 374,
          "tipo": "Artigo Publicado",
          "nome": "O conhecimento produzido acerca de climat�rio, fam�lia e envelhecimento",
          "ano": 2018,
          "periodico": "REVISTA ENFERMAGEM UERJ",
          "volume": 26,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 375,
          "tipo": "Artigo Publicado",
          "nome": "O cuidar em sa�de mental: contribui��es fenomenol�gicas acerca de mulheres trabalhadoras em situa��o de climat�rio",
          "ano": 2015,
          "periodico": "Revista Cubana de Enfermeria",
          "volume": 31,
          "paginaInicial": 1,
          "paginaFinal": 5,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 376,
          "tipo": "Capítulo de Livro",
          "nome": "A vis�o dos acad�micos de enfermagem sobre o aborto",
          "ano": 2019,
          "periodico": "Livro eletr�nico &quot;Discursos, Saberes e Pr�ticas da Enfermagem 2&quot;.",
          "volume": null,
          "paginaInicial": 46,
          "paginaFinal": 56,
          "pesquisadores": [
              "Glaucimara Riguete de Souza Soares"
          ]
      },
      {
          "id": 377,
          "tipo": "Artigo Publicado",
          "nome": "Renal recovery after injury: the role of Pax-2",
          "ano": 2009,
          "periodico": "Nephrology Dialysis Transplantation",
          "volume": 24,
          "paginaInicial": 2628,
          "paginaFinal": 2633,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 378,
          "tipo": "Artigo Publicado",
          "nome": "Bone marrow mononuclear cells attenuate interstitial fibrosis and stimulate the repair of tubular epithelial cells after unilateral ureteral obstruction",
          "ano": 2009,
          "periodico": "Cellular Physiology and Biochemistry",
          "volume": 24,
          "paginaInicial": 585,
          "paginaFinal": 594,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 379,
          "tipo": "Artigo Publicado",
          "nome": "Bone marrow mononuclear cells shift bioactive lipid pattern in injured kidney towards tissue repair in rats with unilateral ureteral obstruction",
          "ano": 2010,
          "periodico": "Nephrology Dialysis Transplantation",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 7,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 380,
          "tipo": "Artigo Publicado",
          "nome": "Paracrine Interaction between Bone Marrow-derived Stem Cells and Renal Epithelial Cells",
          "ano": 2011,
          "periodico": "Cellular Physiology and Biochemistry",
          "volume": 28,
          "paginaInicial": 267,
          "paginaFinal": 278,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 381,
          "tipo": "Artigo Publicado",
          "nome": "A comparative proteomic analysis of Vibrio cholerae O1 wild-type cells versus a phoB mutant showed that the PhoB/PhoR system is required for full growth and rpoS expression under inorganic phosphate abundance",
          "ano": 2013,
          "periodico": "Journal of Proteomics (Print)",
          "volume": 86,
          "paginaInicial": 1,
          "paginaFinal": 15,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 382,
          "tipo": "Artigo Publicado",
          "nome": "Biphasic regulation of type II phosphatidylinositol-4 kinase by sphingosine: Cross talk between glycero- and sphingolipids in the kidney",
          "ano": 2013,
          "periodico": "Biochimica et Biophysica Acta. Biomembranes",
          "volume": 1838,
          "paginaInicial": 1003,
          "paginaFinal": 1009,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 383,
          "tipo": "Artigo Publicado",
          "nome": "Altered signaling pathways linked to Angiotensin II underpin the upregulation of renal Na+-ATPase in chronically undernourished rats",
          "ano": 2014,
          "periodico": "Biochimica et Biophysica Acta. Molecular Basis of Disease",
          "volume": 1842,
          "paginaInicial": 2357,
          "paginaFinal": 2366,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 384,
          "tipo": "Artigo Publicado",
          "nome": "Delta Opioid Receptors: The Link between Exercise and Cardioprotection",
          "ano": 2014,
          "periodico": "Plos One",
          "volume": 9,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 385,
          "tipo": "Artigo Publicado",
          "nome": "Exercise for cardiac health and regeneration: killing two birds with one stone",
          "ano": 2017,
          "periodico": "ANNALS OF TRANSLATIONAL MEDICINE",
          "volume": 5,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 386,
          "tipo": "Artigo Publicado",
          "nome": "Transplantation of bone marrow-derived MSCs improves renal function and Na++K+-ATPase activity in rats with renovascular hypertension",
          "ano": 2017,
          "periodico": "CELL & TISSUE RESEARCH (INTERNET)",
          "volume": 369,
          "paginaInicial": 287,
          "paginaFinal": 301,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 387,
          "tipo": "Artigo Publicado",
          "nome": "Tipo acromial de brasileiros: Estudo em esc�pulas humanas",
          "ano": 2020,
          "periodico": "Revista Cient�fica Multidisciplinar N�cleo do Conhecimento",
          "volume": 6,
          "paginaInicial": 17,
          "paginaFinal": 28,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 388,
          "tipo": "Artigo Publicado",
          "nome": "O Risco do uso de m�scaras por pessoas com epilepsia",
          "ano": 2021,
          "periodico": "Revista de Neuroci�ncias",
          "volume": 29,
          "paginaInicial": 1,
          "paginaFinal": 9,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 389,
          "tipo": "Capítulo de Livro",
          "nome": "Resident Stem Cells in Kidney Tissue",
          "ano": 2013,
          "periodico": "Resident Stem Cells and Regenerative Therapy",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 31,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 390,
          "tipo": "Capítulo de Livro",
          "nome": "Cardiac Ischemia/Reperfusion Injury: The Beneficial Effects of Exercise",
          "ano": 2017,
          "periodico": "Advances in Experimental Medicine and Biology",
          "volume": null,
          "paginaInicial": 155,
          "paginaFinal": 179,
          "pesquisadores": [
              "Karine da Silva Verdoorn"
          ]
      },
      {
          "id": 391,
          "tipo": "Artigo Publicado",
          "nome": "CUIDADO � FAM�LA DO CLIENTE HOSPITALIZADO: CONTRIBUI��ES PARA ENFERMAGEM",
          "ano": 2010,
          "periodico": "Rev Rene",
          "volume": 11,
          "paginaInicial": 180,
          "paginaFinal": 188,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 392,
          "tipo": "Artigo Publicado",
          "nome": "Imagem corporal de parapl�gicos: o enfrentamento das mudan�as na perspectiva de pessoas com les�o medular",
          "ano": 2016,
          "periodico": "Revista Enfermagem UERJ",
          "volume": 24,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 393,
          "tipo": "Artigo Publicado",
          "nome": "Os fatores predisponentes relacionados ao acidente perfurocortante",
          "ano": 2019,
          "periodico": "REVISTA CUBANA DE ENFERMERIA",
          "volume": 35,
          "paginaInicial": 1,
          "paginaFinal": 13,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 394,
          "tipo": "Artigo Publicado",
          "nome": "Estudos sobre o cuidado � fam�lia do cliente hospitalizado: contribui��es para enfermagem",
          "ano": 2010,
          "periodico": "Rev Rene",
          "volume": 11,
          "paginaInicial": 180,
          "paginaFinal": 188,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 395,
          "tipo": "Artigo Publicado",
          "nome": "A inclus�o da pessoa com defici�ncia no ensino superior: trajet�ria de implanta��o da comiss�o permanente UFRJ-Maca� acess�vel e inclusiva",
          "ano": 2021,
          "periodico": "REVISTA SA�DE EM REDES",
          "volume": 7,
          "paginaInicial": 2,
          "paginaFinal": null,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 396,
          "tipo": "Artigo Publicado",
          "nome": "The need to become family caregivers: Grounded Theory",
          "ano": 2012,
          "periodico": "Online Brazilian Journal of Nursing",
          "volume": 11,
          "paginaInicial": 607,
          "paginaFinal": 620,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 397,
          "tipo": "Capítulo de Livro",
          "nome": "Educa��o em sa�de para o cuidador domiciliar de pessoas com necessidades especiais: a��es extensionistas da enfermagem",
          "ano": 2019,
          "periodico": "Saberes e Experi�ncias de Extens�o em Promo��o da Sa�de",
          "volume": 1,
          "paginaInicial": 171,
          "paginaFinal": 180,
          "pesquisadores": [
              "Raquel Silva de Paiva"
          ]
      },
      {
          "id": 398,
          "tipo": "Artigo Publicado",
          "nome": "Towards supporting the life cycle of large scale scientific experiments",
          "ano": 2010,
          "periodico": "International Journal of Business Process Integration and Management (Print)",
          "volume": 5,
          "paginaInicial": 79,
          "paginaFinal": 92,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 399,
          "tipo": "Artigo Publicado",
          "nome": "Is Cloud Computing the Solution for Brazilian Researchers?",
          "ano": 2010,
          "periodico": "International Journal of Computer Applications",
          "volume": 6,
          "paginaInicial": 19,
          "paginaFinal": 23,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 400,
          "tipo": "Artigo Publicado",
          "nome": "Similarity-based Workflow Clustering",
          "ano": 2011,
          "periodico": "Journal of Computational Interdisciplinary Sciences",
          "volume": 2,
          "paginaInicial": 23,
          "paginaFinal": 35,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 401,
          "tipo": "Artigo Publicado",
          "nome": "Capturing Distributed Provenance Metadata  from Cloud-Based Scientific Workflows",
          "ano": 2011,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 2,
          "paginaInicial": 43,
          "paginaFinal": 50,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 402,
          "tipo": "Artigo Publicado",
          "nome": "Many Task Computing for Orthologous Genes Identification in Protozoan Genomes Using Hydra",
          "ano": 2011,
          "periodico": "Concurrency and Computation",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 16,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 403,
          "tipo": "Artigo Publicado",
          "nome": "An Adaptive Parallel Execution Strategy for Cloud-based Scientific Workflows",
          "ano": 2012,
          "periodico": "CONCURRENCY AND COMPUTATION-PRACTICE & EXPERIENCE",
          "volume": 24,
          "paginaInicial": 1531,
          "paginaFinal": 1550,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 404,
          "tipo": "Artigo Publicado",
          "nome": "Uncertainty Quantification in Computational Predictive Models for Fluid Dynamics Using Workflow Management Engine",
          "ano": 2012,
          "periodico": "International Journal for Uncertainty Quantification",
          "volume": 2,
          "paginaInicial": 53,
          "paginaFinal": 71,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 405,
          "tipo": "Artigo Publicado",
          "nome": "An algebraic approach for data-centric scientific workflows",
          "ano": 2011,
          "periodico": "Proceedings of the VLDB Endowment",
          "volume": 4,
          "paginaInicial": 1328,
          "paginaFinal": 1339,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 406,
          "tipo": "Artigo Publicado",
          "nome": "Ontology-based Semi-automatic Workflow Composition",
          "ano": 2012,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 3,
          "paginaInicial": 61,
          "paginaFinal": 72,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 407,
          "tipo": "Artigo Publicado",
          "nome": "A Forecasting Method for Fertilizers Consumption in Brazil",
          "ano": 2013,
          "periodico": "International Journal of Agricultural and Environmental Information Systems",
          "volume": 4,
          "paginaInicial": 23,
          "paginaFinal": 36,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 408,
          "tipo": "Artigo Publicado",
          "nome": "A Provenance-based Adaptive Scheduling Heuristic for Parallel Scientific Workflows in Clouds",
          "ano": 2012,
          "periodico": "Journal of Grid Computing",
          "volume": 10,
          "paginaInicial": 521,
          "paginaFinal": 552,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 409,
          "tipo": "Artigo Publicado",
          "nome": "Performance evaluation of parallel strategies in public clouds: A study with phylogenomic workflows",
          "ano": 2013,
          "periodico": "Future Generation Computer Systems",
          "volume": 29,
          "paginaInicial": 1816,
          "paginaFinal": 1825,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 410,
          "tipo": "Artigo Publicado",
          "nome": "Designing a parallel cloud based comparative genomics workflow to improve phylogenetic analyses",
          "ano": 2013,
          "periodico": "Future Generation Computer Systems",
          "volume": null,
          "paginaInicial": 2205,
          "paginaFinal": 2219,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 411,
          "tipo": "Artigo Publicado",
          "nome": "Performance Analysis of Data Filtering in Scientific Workflows",
          "ano": 2013,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 4,
          "paginaInicial": 17,
          "paginaFinal": 26,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 412,
          "tipo": "Artigo Publicado",
          "nome": "Constru��o de ambiente para desenvolvimento de jogos educacionais baseados em interface de gestos",
          "ano": 2013,
          "periodico": "Revista Brasileira de Computa��o Aplicada",
          "volume": 5,
          "paginaInicial": 110,
          "paginaFinal": 119,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 413,
          "tipo": "Artigo Publicado",
          "nome": "Experiencing Affective Agents in Simulation Games",
          "ano": 2013,
          "periodico": "REVISTA DE INFORM�TICA APLICADA",
          "volume": 9,
          "paginaInicial": 54,
          "paginaFinal": 65,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 530,
          "tipo": "Artigo Publicado",
          "nome": "Modeling and Using Context in Business Process Management: A Research Agenda",
          "ano": 2017,
          "periodico": "Mod�lisation et utilisation du contexte",
          "volume": 17,
          "paginaInicial": 1,
          "paginaFinal": 20,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 414,
          "tipo": "Artigo Publicado",
          "nome": "Towards a UML-based Reference Model for Blended Learning",
          "ano": 2014,
          "periodico": "International Journal of Recent Contributions from Engineering, Science &amp; IT (iJES)",
          "volume": 2,
          "paginaInicial": 15,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 415,
          "tipo": "Artigo Publicado",
          "nome": "Chiron: a parallel engine for algebraic scientific workflows",
          "ano": 2013,
          "periodico": "Concurrency and Computation",
          "volume": 25,
          "paginaInicial": 2327,
          "paginaFinal": 2341,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 416,
          "tipo": "Artigo Publicado",
          "nome": "Optimizing virtual machine allocation for parallel scientific workflows in federated clouds",
          "ano": 2015,
          "periodico": "Future Generation Computer Systems",
          "volume": 46,
          "paginaInicial": 51,
          "paginaFinal": 68,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 417,
          "tipo": "Artigo Publicado",
          "nome": "Parallel computing in genomic research: advances and applications",
          "ano": 2015,
          "periodico": "Advances and Applications in Bioinformatics and Chemistry",
          "volume": null,
          "paginaInicial": 23,
          "paginaFinal": 35,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 418,
          "tipo": "Artigo Publicado",
          "nome": "Running Multi-relational Data Mining Processes in the Cloud: a Practical Approach for Social Networks",
          "ano": 2015,
          "periodico": "Communications in Computer and Information Science (Print)",
          "volume": 565,
          "paginaInicial": 3,
          "paginaFinal": 18,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 419,
          "tipo": "Artigo Publicado",
          "nome": "Multi-objective scheduling of Scientific Workflows in multisite clouds",
          "ano": 2016,
          "periodico": "Future Generation Computer Systems",
          "volume": 63,
          "paginaInicial": 76,
          "paginaFinal": 95,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 420,
          "tipo": "Artigo Publicado",
          "nome": "A Dynamic Cloud Dimensioning Approach for Parallel Scientific Workflows: a Case Study in the Comparative Genomics Domain",
          "ano": 2016,
          "periodico": "Journal of Grid Computing",
          "volume": 14,
          "paginaInicial": 443,
          "paginaFinal": 461,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 421,
          "tipo": "Artigo Publicado",
          "nome": "Analyzing related raw data files through dataflows",
          "ano": 2016,
          "periodico": "Concurrency and Computation",
          "volume": 28,
          "paginaInicial": 2528,
          "paginaFinal": 2545,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 422,
          "tipo": "Artigo Publicado",
          "nome": "Deriving scientific workflows from algebraic experiment lines: A practical approach",
          "ano": 2017,
          "periodico": "Future Generation Computer Systems",
          "volume": 68,
          "paginaInicial": 111,
          "paginaFinal": 127,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 423,
          "tipo": "Artigo Publicado",
          "nome": "Raw data queries during data-intensive parallel workflow execution",
          "ano": 2017,
          "periodico": "Future Generation Computer Systems",
          "volume": null,
          "paginaInicial": 402,
          "paginaFinal": 422,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 424,
          "tipo": "Artigo Publicado",
          "nome": "Oh Gosh!! Why is this game so Hard? Identifying Cycle Patterns in 2D Platform Games Using Provenance Data",
          "ano": 2017,
          "periodico": "Entertainment Computing",
          "volume": 19,
          "paginaInicial": 65,
          "paginaFinal": 81,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 425,
          "tipo": "Artigo Publicado",
          "nome": "Managing Provenance of Implicit Data Flows in Scientific Experiments",
          "ano": 2017,
          "periodico": "ACM Transactions on Internet Technology",
          "volume": 17,
          "paginaInicial": 1,
          "paginaFinal": 22,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 426,
          "tipo": "Artigo Publicado",
          "nome": "Querying Provenance along with Domain Data Using Prolog",
          "ano": 2017,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 8,
          "paginaInicial": 3,
          "paginaFinal": 18,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 427,
          "tipo": "Artigo Publicado",
          "nome": "A hybrid evolutionary algorithm for task scheduling and data assignment of data-intensive scientific workflows on clouds",
          "ano": 2017,
          "periodico": "Future Generation Computer Systems",
          "volume": 76,
          "paginaInicial": 1,
          "paginaFinal": 17,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 428,
          "tipo": "Artigo Publicado",
          "nome": "Provenance Analytics for Workflow-Based Computational Experiments",
          "ano": 2018,
          "periodico": "ACM COMPUTING SURVEYS",
          "volume": 51,
          "paginaInicial": 1,
          "paginaFinal": 25,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 429,
          "tipo": "Artigo Publicado",
          "nome": "Dfanalyzer",
          "ano": 2018,
          "periodico": "Proceedings of the VLDB Endowment",
          "volume": 11,
          "paginaInicial": 2082,
          "paginaFinal": 2085,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 430,
          "tipo": "Artigo Publicado",
          "nome": "Beyond hit-or-miss: a comparative study of synopses for similarity searching",
          "ano": 2018,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 9,
          "paginaInicial": 36,
          "paginaFinal": 52,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 431,
          "tipo": "Artigo Publicado",
          "nome": "Towards an Empirical Evaluation of Scientific Data Indexing and Querying",
          "ano": 2018,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 9,
          "paginaInicial": 84,
          "paginaFinal": 93,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 432,
          "tipo": "Artigo Publicado",
          "nome": "A Provenance-based heuristic for preserving results confidentiality in cloud-based scientific workflows",
          "ano": 2019,
          "periodico": "Future Generation Computer Systems",
          "volume": 97,
          "paginaInicial": 697,
          "paginaFinal": 713,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 433,
          "tipo": "Artigo Publicado",
          "nome": "A superpixel-driven deep learning approach for the analysis of dermatological wounds",
          "ano": 2020,
          "periodico": "COMPUTER METHODS AND PROGRAMS IN BIOMEDICINE",
          "volume": 183,
          "paginaInicial": 105079,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 434,
          "tipo": "Artigo Publicado",
          "nome": "BioinfoPortal: A scientific gateway for integrating bioinformatics applications on the Brazilian national high-performance computing network",
          "ano": 2020,
          "periodico": "Future Generation Computer Systems",
          "volume": null,
          "paginaInicial": 192,
          "paginaFinal": 214,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 435,
          "tipo": "Artigo Publicado",
          "nome": "OLAP parallel query processing in clouds with C-ParGRES",
          "ano": 2020,
          "periodico": "CONCURRENCY AND COMPUTATION-PRACTICE & EXPERIENCE",
          "volume": 32,
          "paginaInicial": 123,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 436,
          "tipo": "Artigo Publicado",
          "nome": "Provenance-based fault tolerance technique recommendation for cloud-based scientific workflows: a practical approach",
          "ano": 2020,
          "periodico": "Cluster Computing-The Journal of Networks Software Tools and Applications",
          "volume": 23,
          "paginaInicial": 123,
          "paginaFinal": 148,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 437,
          "tipo": "Artigo Publicado",
          "nome": "Adding domain data to code profiling tools to debug workflow parallel execution",
          "ano": 2020,
          "periodico": "Future Generation Computer Systems",
          "volume": 110,
          "paginaInicial": 422,
          "paginaFinal": 439,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 438,
          "tipo": "Artigo Publicado",
          "nome": "Towards optimizing the execution of spark scientific workflows using machine learning-based parameter tuning",
          "ano": 2021,
          "periodico": "CONCURRENCY AND COMPUTATION-PRACTICE & EXPERIENCE",
          "volume": 33,
          "paginaInicial": 1,
          "paginaFinal": 35,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 439,
          "tipo": "Artigo Publicado",
          "nome": "Capturing and Analyzing Provenance from Spark-based Scientific Workflows with SAMbA-RaP",
          "ano": 2020,
          "periodico": "Future Generation Computer Systems",
          "volume": 112,
          "paginaInicial": 658,
          "paginaFinal": 669,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 440,
          "tipo": "Artigo Publicado",
          "nome": "An incremental reinforcement learning scheduling strategy for data-intensive scientific workflows in the cloud",
          "ano": 2021,
          "periodico": "CONCURRENCY AND COMPUTATION-PRACTICE & EXPERIENCE",
          "volume": null,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 441,
          "tipo": "Artigo Publicado",
          "nome": "Efficient Execution of Scientific Workflows in the Cloud Through Adaptive Caching",
          "ano": 2020,
          "periodico": "INTERNATIONAL JOURNAL ON TRANSACTIONS ON LARGE-SCALE DATA- AND KNOWLEDGE-CENTERED SYSTEMS (TLDKS)",
          "volume": null,
          "paginaInicial": 41,
          "paginaFinal": 66,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 442,
          "tipo": "Artigo Publicado",
          "nome": "DfAnalyzer: Runtime Dataflow Analysis Tool for Computational Science and Engineering Applications",
          "ano": 2020,
          "periodico": "SoftwareX",
          "volume": 12,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 443,
          "tipo": "Artigo Publicado",
          "nome": "Polyflow: a Polystore-compliant Mechanism to Provide Interoperability to Heterogeneous Provenance Graphs",
          "ano": 2020,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 11,
          "paginaInicial": 165,
          "paginaFinal": 192,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 444,
          "tipo": "Artigo Publicado",
          "nome": "Cache-aware scheduling of scientific workflows in a multisite cloud",
          "ano": 2021,
          "periodico": "Future Generation Computer Systems",
          "volume": 122,
          "paginaInicial": 172,
          "paginaFinal": 186,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 445,
          "tipo": "Artigo Publicado",
          "nome": "Distributed in-memory data management for workflow executions",
          "ano": 2021,
          "periodico": "PEERJ COMPUTER SCIENCE",
          "volume": 7,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 446,
          "tipo": "Artigo Publicado",
          "nome": "Provenance-and machine learning-based recommendation of parameter values in scientific workflows",
          "ano": 2021,
          "periodico": "PEERJ COMPUTER SCIENCE",
          "volume": 7,
          "paginaInicial": null,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 447,
          "tipo": "Artigo Publicado",
          "nome": "J-EDA: a workbench to help select parameters in content-based image retrieval",
          "ano": 2021,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 12,
          "paginaInicial": 126,
          "paginaFinal": 137,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 448,
          "tipo": "Artigo Publicado",
          "nome": "Managing Hypothesis of Scientific Experiments with PhenoManager",
          "ano": 2021,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 12,
          "paginaInicial": 138,
          "paginaFinal": 155,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 449,
          "tipo": "Artigo Publicado",
          "nome": "Multimodal Provenance-based Analysis of Collaboration in Business Processes",
          "ano": 2021,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 12,
          "paginaInicial": 415,
          "paginaFinal": 427,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 450,
          "tipo": "Artigo Publicado",
          "nome": "An Empirical assessment of quality metrics for diversified similarity searching",
          "ano": 2021,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 12,
          "paginaInicial": 290,
          "paginaFinal": 305,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 451,
          "tipo": "Artigo Publicado",
          "nome": "Online Deep Learning Hyperparameter Tuning based on Provenance Analysis",
          "ano": 2021,
          "periodico": "Journal of Information and Data Management - JIDM",
          "volume": 12,
          "paginaInicial": 396,
          "paginaFinal": 414,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 452,
          "tipo": "Artigo Publicado",
          "nome": "BioProv - A provenance library for bioinformatics workflows",
          "ano": 2021,
          "periodico": "Journal of Open Source Software",
          "volume": 6,
          "paginaInicial": 3622,
          "paginaFinal": null,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 453,
          "tipo": "Artigo Publicado",
          "nome": "Dynamic steering of HPC scientific workflows: A survey",
          "ano": 2015,
          "periodico": "Future Generation Computer Systems",
          "volume": 46,
          "paginaInicial": 100,
          "paginaFinal": 113,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 454,
          "tipo": "Livro Publicado",
          "nome": "Proceedings of the Satellite Events of the 32nd Brazilian Symposium on Databases",
          "ano": 2017,
          "periodico": "Sociedade Brasileira de Computa��o - SBC",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 342,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 455,
          "tipo": "Capítulo de Livro",
          "nome": "Towards a Taxonomy for Cloud Computing from an e-Science Perspective",
          "ano": 2010,
          "periodico": "Cloud Computing: Principles, Systems and Applications",
          "volume": 0,
          "paginaInicial": 47,
          "paginaFinal": 62,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 456,
          "tipo": "Capítulo de Livro",
          "nome": "Monitoramento e adapta��o de transforma��es em dados cient�ficos ao longo de execu��es paralelas em ambientes de processamento de alto desempenho",
          "ano": 2015,
          "periodico": "Grandes Desafios da Computa��o no Brasil - Relatos do 3o Semin�rio",
          "volume": null,
          "paginaInicial": 278,
          "paginaFinal": 292,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 457,
          "tipo": "Capítulo de Livro",
          "nome": "Mirror Mirror on the Wall, How Do I Dimension My Cloud After All?",
          "ano": 2017,
          "periodico": "Computer Communications and Networks",
          "volume": null,
          "paginaInicial": 27,
          "paginaFinal": 58,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 458,
          "tipo": "Capítulo de Livro",
          "nome": "Clouds and Reproducibility: A Way to Go to Scientific Experiments?",
          "ano": 2017,
          "periodico": "Computer Communications and Networks",
          "volume": null,
          "paginaInicial": 127,
          "paginaFinal": 151,
          "pesquisadores": [
              "Daniel Cardoso Moraes de Oliveira"
          ]
      },
      {
          "id": 459,
          "tipo": "Artigo Publicado",
          "nome": "Composi��o qu�mica centesimal de cinco esp�cies de algas marinhas bent�nicas",
          "ano": 1997,
          "periodico": "Leandra (UFRJ)",
          "volume": 12,
          "paginaInicial": 11,
          "paginaFinal": 17,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 460,
          "tipo": "Artigo Publicado",
          "nome": "Algas Marinhas Bent�nicas da Reserva Biol�gica Estadual da Praia do Sul - Ilha Grande, Angra dos Reis (R.J., Brasil)",
          "ano": 1998,
          "periodico": "Acta Botanica Brasilica",
          "volume": 12,
          "paginaInicial": 67,
          "paginaFinal": 76,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 461,
          "tipo": "Artigo Publicado",
          "nome": "Comunidades de Algas Calc�rias Articuladas em Tr�s Pontos da Ba�a do Esp�rito Santo - E.S.",
          "ano": 1995,
          "periodico": "Ner�tica",
          "volume": 9,
          "paginaInicial": 33,
          "paginaFinal": 48,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 462,
          "tipo": "Artigo Publicado",
          "nome": "Stenogramme interrupta (C. Agardh) Montagne ex Harvey (Rhodophyta, Gigartinales) em �guas profundas da plataforma continental brasileira, Atl�ntico Sul.",
          "ano": 2000,
          "periodico": "Leandra (UFRJ)",
          "volume": 15,
          "paginaInicial": 73,
          "paginaFinal": 78,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 463,
          "tipo": "Artigo Publicado",
          "nome": "Utiliza��o da farinha seca de Ulva spp. e Sargassum spp. como bioestimulantes de crescimento na olericultura",
          "ano": 2002,
          "periodico": "Leandra (UFRJ)",
          "volume": 17,
          "paginaInicial": 45,
          "paginaFinal": 70,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 464,
          "tipo": "Artigo Publicado",
          "nome": "INFLU�NCIA DA CONCENTRA��O DE NUTRIENTES E DA AERA��O DA �GUA NO DESENVOLVIMENTO DE CLADOPHORA VAGABUNDA (L.) C. HOEK (CHLOROPHYTA, CLADOPHORALES)",
          "ano": 2005,
          "periodico": "Anais da X Reuni�o Brasileira de Ficologia",
          "volume": 10,
          "paginaInicial": 275,
          "paginaFinal": 288,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 465,
          "tipo": "Artigo Publicado",
          "nome": "AN�LISE QUALI-QUANTITATIVA DAS POPULA��ES ALG�CEAS DE UM TRECHO RECIFAL NA PRAIA DE BOA VIAGEM, PE",
          "ano": 2008,
          "periodico": "Oecologia Brasiliensis (Impresso)",
          "volume": 12,
          "paginaInicial": 222,
          "paginaFinal": 228,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 466,
          "tipo": "Artigo Publicado",
          "nome": "Os g�neros Chaetomorpha K�tz. nom. cons. e Rhizoclonium K�tz. (Chlorophyta) do litoral do Estado da Bahia, Brasil",
          "ano": 2009,
          "periodico": "Brazilian Journal of Botany",
          "volume": 32,
          "paginaInicial": 545,
          "paginaFinal": 570,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 467,
          "tipo": "Artigo Publicado",
          "nome": "Phylogenetic analyses of Cladophora vagabunda (L.) C. Hoek (Cladophorales, Chlorophyta) from Brazil based on SSU rDNA sequences",
          "ano": 2009,
          "periodico": "Brazilian Journal of Botany",
          "volume": 32,
          "paginaInicial": 531,
          "paginaFinal": 538,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 468,
          "tipo": "Artigo Publicado",
          "nome": "ANTIVIRAL ACTIVITY OF THE GREEN MARINE ALGA Ulva fasciata ON THE REPLICATION OF HUMAN METAPNEUMOVIRUS",
          "ano": 2010,
          "periodico": "Revista do Instituto de Medicina Tropical de S�o Paulo (Impresso)",
          "volume": 52,
          "paginaInicial": 3,
          "paginaFinal": 10,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 469,
          "tipo": "Artigo Publicado",
          "nome": "Atividade biol�gica de metab�litos secund�rios de algas marinhas do g�nero Laurencia",
          "ano": 2010,
          "periodico": "Revista Brasileira de Farmacognosia (Impresso)",
          "volume": 20,
          "paginaInicial": 441,
          "paginaFinal": 452,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 470,
          "tipo": "Artigo Publicado",
          "nome": "La familia Valoniaceae (Chlorophyta) en el estado de Bah�a, Brasil: aspectos morfol�gicos y de distribuci�n",
          "ano": 2010,
          "periodico": "Hidrobiologica (M�xico)",
          "volume": 20,
          "paginaInicial": 171,
          "paginaFinal": 184,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 471,
          "tipo": "Artigo Publicado",
          "nome": "Distribution of Cladophora Species (Cladophorales, Chlorophyta) along the Brazilian Coast",
          "ano": 2010,
          "periodico": "Phytotaxa (Online)",
          "volume": 14,
          "paginaInicial": 2242,
          "paginaFinal": null,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 472,
          "tipo": "Artigo Publicado",
          "nome": "Morphology and taxonomy of Anadyomene species (Cladophorales, Chlorophyta) from Bahia, Brazil",
          "ano": 2011,
          "periodico": "Botanica Marina (Print)",
          "volume": 54,
          "paginaInicial": 135,
          "paginaFinal": 145,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 473,
          "tipo": "Artigo Publicado",
          "nome": "Antileishmanial Sesquiterpenes from the Brazilian Red Alga Laurencia dendroidea",
          "ano": 2011,
          "periodico": "Planta Medica (Internet)",
          "volume": 77,
          "paginaInicial": 733,
          "paginaFinal": 735,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 474,
          "tipo": "Artigo Publicado",
          "nome": "In Vitro Anti-HMPV Activity of Meroditerpenoids from Marine Alga Stypopodium zonale (Dictyotales)",
          "ano": 2011,
          "periodico": "Molecules (Basel. Online)",
          "volume": 16,
          "paginaInicial": 8437,
          "paginaFinal": 8450,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 475,
          "tipo": "Artigo Publicado",
          "nome": "Microdictyon (Chlorophyta, Anadyomenaceae) do Estado da Bahia, Brasil",
          "ano": 2011,
          "periodico": "Sitientibus. S�rie Ci�ncias Biol�gicas",
          "volume": 11,
          "paginaInicial": 57,
          "paginaFinal": 61,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 476,
          "tipo": "Artigo Publicado",
          "nome": "Boodlea composita (Harv.) F. Brand (Chlorophyta) no litoral nordeste do Brasil",
          "ano": 2012,
          "periodico": "Acta Botanica Bras�lica (Impresso)",
          "volume": 26,
          "paginaInicial": 476,
          "paginaFinal": 480,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 477,
          "tipo": "Artigo Publicado",
          "nome": "Antiviral activity of extracts from Brazilian seaweeds against herpes simplex virus",
          "ano": 2012,
          "periodico": "Revista Brasileira de Farmacognosia (Impresso)",
          "volume": 22,
          "paginaInicial": 714,
          "paginaFinal": 723,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 478,
          "tipo": "Artigo Publicado",
          "nome": "The genus Cladophora (Chlorophyta) in the littoral of Bahia, Brazil",
          "ano": 2012,
          "periodico": "Nova Hedwigia",
          "volume": 95,
          "paginaInicial": 337,
          "paginaFinal": 372,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 479,
          "tipo": "Artigo Publicado",
          "nome": "Flora da Bahia: Siphonocladaceae",
          "ano": 2012,
          "periodico": "Sitientibus. S�rie Ci�ncias Biol�gicas",
          "volume": 12,
          "paginaInicial": 1,
          "paginaFinal": 24,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 480,
          "tipo": "Artigo Publicado",
          "nome": "Diterpenes from the brown seaweed Dictyota caribaea (Dictyotaceae, Phaeophyceae): The ecological and taxonomic significance",
          "ano": 2014,
          "periodico": "Biochemical Systematics and Ecology",
          "volume": 52,
          "paginaInicial": 33,
          "paginaFinal": 37,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 481,
          "tipo": "Artigo Publicado",
          "nome": "Flora da Bahia: Boodleaceae",
          "ano": 2012,
          "periodico": "Sitientibus. S�rie Ci�ncias Biol�gicas",
          "volume": 12,
          "paginaInicial": 179,
          "paginaFinal": 188,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 482,
          "tipo": "Artigo Publicado",
          "nome": "Sesquiterpenes from the Brazilian Red Alga Laurencia dendroidea J. Agardh",
          "ano": 2014,
          "periodico": "Molecules (Basel. Online)",
          "volume": 19,
          "paginaInicial": 3181,
          "paginaFinal": 3192,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 483,
          "tipo": "Artigo Publicado",
          "nome": "Antioxidant properties and total phenolic contents of some tropical seaweeds of the Brazilian coast",
          "ano": 2013,
          "periodico": "Journal of Applied Phycology",
          "volume": 25,
          "paginaInicial": 1179,
          "paginaFinal": 1187,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 484,
          "tipo": "Artigo Publicado",
          "nome": "Benthic Macroalgae diversity in Admiralty Bay (King George Island,South Shetland Islands, Antarctic Peninsula)",
          "ano": 2010,
          "periodico": "Annual Activity Report 2009",
          "volume": 1,
          "paginaInicial": 62,
          "paginaFinal": 64,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 485,
          "tipo": "Artigo Publicado",
          "nome": "Flora da Bahia: Siphonocladaceae",
          "ano": 2012,
          "periodico": "Sitientibus serie Ciencias Biologicas (SCB)",
          "volume": 12,
          "paginaInicial": 167,
          "paginaFinal": 177,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 486,
          "tipo": "Artigo Publicado",
          "nome": "Chemical diversity and antileishmanial activity of crude extracts of Laurencia complex (Ceramiales, Rhodophyta) from Brazil",
          "ano": 2014,
          "periodico": "Revista Brasileira de Farmacognosia (Impresso)",
          "volume": 24,
          "paginaInicial": 635,
          "paginaFinal": 643,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 487,
          "tipo": "Artigo Publicado",
          "nome": "Composition and Distribution of Deep Water Macroalgae Species from the Continental Shelf of Sergipe State, Brazil</strong>",
          "ano": 2014,
          "periodico": "Phytotaxa (Online)",
          "volume": 190,
          "paginaInicial": 250,
          "paginaFinal": 267,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 488,
          "tipo": "Artigo Publicado",
          "nome": "Update of the Brazilian floristic list of Algae and Cyanobacteria",
          "ano": 2015,
          "periodico": "Rodrigu�sia (Online)",
          "volume": 66,
          "paginaInicial": 1,
          "paginaFinal": 16,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 489,
          "tipo": "Artigo Publicado",
          "nome": "Checklist of phytobenthos from Boipeba Island, Bahia, Brazil, emphasizing the morphological features of Nitophyllum punctatum (Rhodophyta, Ceramiales)",
          "ano": 2015,
          "periodico": "Check List (S�o Paulo. Online)",
          "volume": 11,
          "paginaInicial": 1,
          "paginaFinal": 11,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 490,
          "tipo": "Artigo Publicado",
          "nome": "Nitric oxide production inhibition and anti-mycobacterial activity of extracts and halogenated sesquiterpenes from the Brazilian red alga laurencia dendroidea J. Agardh",
          "ano": 2015,
          "periodico": "Pharmacognosy Magazine",
          "volume": 11,
          "paginaInicial": 611,
          "paginaFinal": 618,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 491,
          "tipo": "Artigo Publicado",
          "nome": "Geographic Distribution of Natural Products Produced by Red Algae Laurencia dendroidea J. AGARDH",
          "ano": 2016,
          "periodico": "Chemistry & Biodiversity (Print)",
          "volume": 13,
          "paginaInicial": 845,
          "paginaFinal": 851,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 492,
          "tipo": "Artigo Publicado",
          "nome": "Influence of the water-soluble fraction of petroleum on photosynthesis and chemical defenses in two sympatric seaweeds",
          "ano": 2017,
          "periodico": "Journal of Applied Phycology",
          "volume": null,
          "paginaInicial": 1,
          "paginaFinal": 12,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 529,
          "tipo": "Artigo Publicado",
          "nome": "DW-CGU: Integra��o dos Dados do Portal da Transpar�ncia do Governo Federal Brasileiro",
          "ano": 2016,
          "periodico": "iSys: Revista Brasileira de Sistemas de Informa��o",
          "volume": 9,
          "paginaInicial": 6,
          "paginaFinal": 32,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 493,
          "tipo": "Artigo Publicado",
          "nome": "Contribui��es do Programa de P�s-Gradua��o em Ci�ncias Ambientais e Conserva��o na gera��o de conhecimento cient�fico promotor do desenvolvimento regional e conserva��o dos ecossistemas costeiros do norte do estado do Rio de Janeiro",
          "ano": 2017,
          "periodico": "http://dx.doi.org/10.21713/2358-2332.2016.v13.1012",
          "volume": 13,
          "paginaInicial": 917,
          "paginaFinal": 954,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 494,
          "tipo": "Artigo Publicado",
          "nome": "Climatic triggers and phenological responses in Isoetes cangae (Isoetaceae), an endemic quillwort from Amazon Iron Rocky Outcrops, Brazil",
          "ano": 2021,
          "periodico": "LIMNOLOGICA",
          "volume": 89,
          "paginaInicial": 125889,
          "paginaFinal": 1,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 495,
          "tipo": "Artigo Publicado",
          "nome": "Distinct Reproductive Strategy of Two Endemic Amazonian Quillworts",
          "ano": 2021,
          "periodico": "DIVERSITY",
          "volume": 13,
          "paginaInicial": 348,
          "paginaFinal": null,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 496,
          "tipo": "Artigo Publicado",
          "nome": "Morphological Plasticity in the Endemic Iso�tes Species from Serra dos Caraj�s, Amazonia, Brazil",
          "ano": 2021,
          "periodico": "AMERICAN FERN JOURNAL",
          "volume": 111,
          "paginaInicial": 174,
          "paginaFinal": 195,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 497,
          "tipo": "Artigo Publicado",
          "nome": "Discovery of Mixed Sporangia in the Amazonian Quillwort Iso�tes cangae",
          "ano": 2021,
          "periodico": "AMERICAN FERN JOURNAL",
          "volume": 111,
          "paginaInicial": 327,
          "paginaFinal": 331,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 498,
          "tipo": "Livro Publicado",
          "nome": "Biodiversidade, Conserva��o  e Uso Sustent�vel da Flora do Brasil",
          "ano": 2002,
          "periodico": "Editora Universit�ria - UFPE",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": 262,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 499,
          "tipo": "Capítulo de Livro",
          "nome": "Algas marinhas bent�nicas do Estado de Pernambuco",
          "ano": 2002,
          "periodico": "Diagn�stica da Biodiversidade de Pernambuco",
          "volume": 1,
          "paginaInicial": 97,
          "paginaFinal": 124,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 500,
          "tipo": "Capítulo de Livro",
          "nome": "Taxonomia das clor�fitas marinhas",
          "ano": 2011,
          "periodico": "Macroalgas (Chlorophyta) e gramas (Magnoliophyta) marinhas do Brasil",
          "volume": 2,
          "paginaInicial": 42,
          "paginaFinal": 99,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 501,
          "tipo": "Capítulo de Livro",
          "nome": "Altera��es decadais nas comunidades macroalg�ceas",
          "ano": 2018,
          "periodico": "A Ba�a de Guanabara - Passado, presente e futuro de um ecossistema amea�ado",
          "volume": null,
          "paginaInicial": 199,
          "paginaFinal": 211,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 502,
          "tipo": "Capítulo de Livro",
          "nome": "Pioneirismo, sonho e realiza��o profissional: viv�ncias dos docentes pioneiros da UFRJ-Maca�",
          "ano": 2018,
          "periodico": "NUPEM PROTAGONISTA DA INTERIORIZA��O DA UFRJ",
          "volume": 1,
          "paginaInicial": 171,
          "paginaFinal": 200,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 503,
          "tipo": "Capítulo de Livro",
          "nome": "MACROALGAS",
          "ano": 2006,
          "periodico": "Diversidade b�ntica da regi�o central da Zona Econ�mica Exclusiva brasileira",
          "volume": 18,
          "paginaInicial": 67,
          "paginaFinal": 105,
          "pesquisadores": [
              "L�sia M�nica de Souza Gestinari"
          ]
      },
      {
          "id": 504,
          "tipo": "Artigo Publicado",
          "nome": "Pol�ticas de agroindustrializa��o em assentamentos da reforma agr�ria: uma an�lise do dialogo entre a pr�tica das cooperativas do MST e as pol�ticas governamentais",
          "ano": 2015,
          "periodico": "REVISTA TECNOLOGIA E SOCIEDADE (ONLINE)",
          "volume": 11,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 505,
          "tipo": "Artigo Publicado",
          "nome": "A FORMA��O DE COLETIVOS DE PRODU��O AGROECOL�GICA EM UM ASSENTAMENTO DE REFORMA AGR�RIA",
          "ano": 2021,
          "periodico": "REVISTA PEGADA ELETR�NICA (ONLINE)",
          "volume": 22,
          "paginaInicial": 343,
          "paginaFinal": 374,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 506,
          "tipo": "Artigo Publicado",
          "nome": "Aspectos das influ�ncias do g�nero nas rela��es de trabalho de engenheiras de produ��o formadas numa institui��o federal",
          "ano": 2018,
          "periodico": "REVISTA TECNOLOGIA E SOCIEDADE (ONLINE)",
          "volume": 14,
          "paginaInicial": 173,
          "paginaFinal": null,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 507,
          "tipo": "Livro Publicado",
          "nome": "Incubadoras tecnol�gicas de economia solid�ria: concep��o, metodologia e avalia��o",
          "ano": 2018,
          "periodico": "UFRJ",
          "volume": null,
          "paginaInicial": 0,
          "paginaFinal": null,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 508,
          "tipo": "Capítulo de Livro",
          "nome": "Experimentos da utopia autogestion�ria em uma universidade heterogestion�ria: an�lise da organiza��o do Soltec",
          "ano": 2015,
          "periodico": "Extens�o e pol�tica: o agir integrado para o desenvolvimento social",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 509,
          "tipo": "Capítulo de Livro",
          "nome": "PEGADAS: marcas de conhecimento no universo acad�mico e comunit�rio",
          "ano": 2011,
          "periodico": "Circuito de experi�ncias: tecnologias, metodologias e avan�os na extens�o universit�ria para o desenvolvimento social",
          "volume": 1,
          "paginaInicial": 109,
          "paginaFinal": 126,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 510,
          "tipo": "Capítulo de Livro",
          "nome": "A constru��o de um espa�o contra-hegem�nico na engenharia: o Encontro Nacional de Engenharia e Desenvolvimento Social (Eneds)",
          "ano": 2015,
          "periodico": "Percursos na extens�o universit�ria: saindo da torre de marfim",
          "volume": 1,
          "paginaInicial": 44,
          "paginaFinal": 57,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 511,
          "tipo": "Capítulo de Livro",
          "nome": "Pol�ticas de agroindustrializa��o em assentamentos da reforma agr�ria: uma an�lise do di�logo entre a pr�tica das cooperativas do MST e as pol�ticas governamentais",
          "ano": 2016,
          "periodico": "QUEST�O AGR�RIA, COOPERA��O E AGROECOLOGIA",
          "volume": 2,
          "paginaInicial": 1,
          "paginaFinal": 496,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 512,
          "tipo": "Capítulo de Livro",
          "nome": "A INDISSOCIABILIDADE DA TR�ADE ? ENSINO, PESQUISA E EXTENS�O ?, OS PROGRAMAS DE EDUCA��O TUTORIAL E O ENSINO EM ENGENHARIA: CONTRIBUI��ES PARA O DESENVOLVIMENTO DE PESQUISADORES E PROFISSIONAIS AUT�NOMOS",
          "ano": 2017,
          "periodico": "DESAFIOS DA EDUCA��O EM ENGENHARIA: Forma��o Acad�mica e atua��o Profissional, Pr�ticas Pedag�gicas e Laborat�rios Remotos.",
          "volume": null,
          "paginaInicial": 1,
          "paginaFinal": 271,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 513,
          "tipo": "Capítulo de Livro",
          "nome": "Cooperativa de Produtos da Reforma Agr�ria",
          "ano": 2018,
          "periodico": "Estrutura��o de problemas sociais complexos: teoria da mente, mapas metacognitivos e modelos de apoio � decis�o",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 514,
          "tipo": "Capítulo de Livro",
          "nome": "Projeto Campo-Cidade e o curso de extens�o em gest�o e coopera��o agroecol�gica",
          "ano": 2018,
          "periodico": "Tecnologia para o desenvolvimento social: di�logos Nides-  UFRJ",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 457,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 515,
          "tipo": "Capítulo de Livro",
          "nome": "O conceito de Incubadoras Tecnol�gicas de Economia Solid�ria",
          "ano": 2018,
          "periodico": "Incubadoras tecnol�gicas de economia solid�ria: concep��o, metodologia e avalia��o",
          "volume": 1,
          "paginaInicial": 11,
          "paginaFinal": 22,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 516,
          "tipo": "Capítulo de Livro",
          "nome": "Projetos de engenharia popular na pr�tica: o que podemos aprender com eles?",
          "ano": 2020,
          "periodico": "Engenharia Popular: constru��o e gest�o de projetos de tecnologia e inova��o social",
          "volume": 1,
          "paginaInicial": 125,
          "paginaFinal": 136,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 517,
          "tipo": "Capítulo de Livro",
          "nome": "Tecnologia Social e Educa��o Popular: o desenvolvimento de uma casa de farinha em um assentamento de reforma agr�ria",
          "ano": 2021,
          "periodico": "Tecnologia Social e Reforma Agr�ria Popular",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 518,
          "tipo": "Capítulo de Livro",
          "nome": "A coopera��o no trabalho de produ��o e comercializa��o em assentamentos de Reforma Agr�ria do Rio de Janeiro",
          "ano": 2020,
          "periodico": "Da coopera��o na cidade � cidade cooperativa",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 343,
          "pesquisadores": [
              "Camila Rolim Laricchia"
          ]
      },
      {
          "id": 519,
          "tipo": "Artigo Publicado",
          "nome": "Compressing probabilistic Prolog programs",
          "ano": 2008,
          "periodico": "Machine Learning",
          "volume": 70,
          "paginaInicial": 151,
          "paginaFinal": 168,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 520,
          "tipo": "Artigo Publicado",
          "nome": "Using Concept Maps and Ontology Alignment for Learning Assessment",
          "ano": 2012,
          "periodico": "IEEE Multidisciplinary Engineering Education Magazine",
          "volume": 7,
          "paginaInicial": 33,
          "paginaFinal": 40,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 521,
          "tipo": "Artigo Publicado",
          "nome": "Management of Scientific Experiments in Computational Modeling: Challenges and Perspectives",
          "ano": 2012,
          "periodico": "iSys: Revista Brasileira de Sistemas de Informa��o",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": null,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 522,
          "tipo": "Artigo Publicado",
          "nome": "Link prediction using a probabilistic description logic",
          "ano": 2013,
          "periodico": "Journal of the Brazilian Computer Society (Impresso)",
          "volume": 1,
          "paginaInicial": 1,
          "paginaFinal": 1,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 523,
          "tipo": "Artigo Publicado",
          "nome": "A Formal Representation for Context-Aware Business Processes",
          "ano": 2014,
          "periodico": "Computers in Industry",
          "volume": 65,
          "paginaInicial": 1193,
          "paginaFinal": 1214,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 524,
          "tipo": "Artigo Publicado",
          "nome": "How Can Ontology Design Patterns Help Ontology Refinement?",
          "ano": 2015,
          "periodico": "Learning and Nonlinear Models",
          "volume": 1,
          "paginaInicial": 4,
          "paginaFinal": 16,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 525,
          "tipo": "Artigo Publicado",
          "nome": "Effort Estimation of Business Process Modeling through Clustering Techniques",
          "ano": 2014,
          "periodico": "iSys: Revista Brasileira de Sistemas de Informa��o",
          "volume": 7,
          "paginaInicial": 34,
          "paginaFinal": 47,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 526,
          "tipo": "Artigo Publicado",
          "nome": "UMA METODOLOGIA PARA O APRENDIZADO DE UM MODELO CLASSIFICADOR PARA O ALINHAMENTO DE ONTOLOGIAS",
          "ano": 2013,
          "periodico": "RESI : Revista Eletr�nica de Sistemas de Informa��o",
          "volume": 12,
          "paginaInicial": 1,
          "paginaFinal": 27,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 527,
          "tipo": "Artigo Publicado",
          "nome": "Minerando Publica��es Cient�ficas para An�lise da Colabora��o em Comunidades de Pesquisa - O caso da comunidades de Sistemas de Informa��o",
          "ano": 2015,
          "periodico": "RESI : Revista Eletr�nica de Sistemas de Informa��o",
          "volume": 14,
          "paginaInicial": 1,
          "paginaFinal": 20,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 528,
          "tipo": "Artigo Publicado",
          "nome": "A method to infer the need to update situations in business process adaptation",
          "ano": 2015,
          "periodico": "Computers in Industry",
          "volume": 71,
          "paginaInicial": 128,
          "paginaFinal": 143,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 531,
          "tipo": "Artigo Publicado",
          "nome": "BPM2Text: A language independent framework for Business Process Models to Natural Language Text",
          "ano": 2016,
          "periodico": "iSys: Revista Brasileira de Sistemas de Informa��o",
          "volume": 9,
          "paginaInicial": 38,
          "paginaFinal": 56,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 532,
          "tipo": "Capítulo de Livro",
          "nome": "Intelig�ncia artificial para sistemas colaborativos",
          "ano": 2011,
          "periodico": "Sistemas Colaborativos",
          "volume": 1,
          "paginaInicial": 245,
          "paginaFinal": null,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 533,
          "tipo": "Capítulo de Livro",
          "nome": "Learning Ontology from Text: A Storytelling Exploratory Case Study",
          "ano": 2015,
          "periodico": "Lecture Notes in Business Information Processing",
          "volume": null,
          "paginaInicial": 477,
          "paginaFinal": 491,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      },
      {
          "id": 534,
          "tipo": "Capítulo de Livro",
          "nome": "Computing Inferences for Relational Bayesian Networks Based on ALC Constructs",
          "ano": 2014,
          "periodico": "Uncertainty Reasoning for the Semantic Web III - Lecture Notes in Computer Science",
          "volume": 8816,
          "paginaInicial": 21,
          "paginaFinal": 40,
          "pesquisadores": [
              "Kate Cerqueira Revoredo"
          ]
      }
    ]
    this.pesquisasFiltradas = this.pesquisas;
    this.associarPesquisas()
  }

  getInstitutos(){
    // this.service.getInstitutos().subscribe(
    //   res => {
    //     console.log('institutos', res)
    //     this.institutos = res;
    //   }
    // )

    this.institutos =  [
      {
          "id": 1,
          "nome": "FACULDADE X",
          "acronimo": "FACX"
      },
      {
          "id": 2,
          "nome": "FACULDADE Y",
          "acronimo": "FACY"
      },
      {
          "id": 3,
          "nome": "FACULDADE Z",
          "acronimo": "FACZ"
      },
      {
          "id": 4,
          "nome": "FACULDADE S",
          "acronimo": "FACS"
      }
  ]
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
    this.pesquisadoresFiltrados.forEach(pesquisador => {
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
    // console.log('dados por instituto', agrupadosPorInstituto)
    this.tipoVertice != null && this.tipoVertice == 'Pesquisador' ? this.montarGrafosPesquisadores(pesquisadoresMap) : this.montarGrafosInstitutos(agrupadosPorInstituto)
    // this.montarGrafos(agrupadosPorInstituto)

  }

  clear(){
    let svgElement = this.graphSvg.nativeElement;

    // Remover todos os filhos do elemento SVG
    while (svgElement.firstChild) {
      svgElement.removeChild(svgElement.firstChild);
    }
  }

  montarGrafos(objetos) {
    console.log('grafo instituição', objetos)
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

      if(this.toolTipsFiltros.includes("Livro Publicado")){
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

  montarGrafosInstitutos(objetos) {
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

    // console.log('Nodes', data.nodes)
    // console.log('links', data.links[1])
    const idsEncontrados = {};
    let filteredNodes = data.nodes.filter((item, index, array) => {
      return array.some((otherItem, otherIndex) => {
        return (otherIndex !== index && otherItem.id === item.id) || item.tipo === '1';
      });
    }).filter((item) => {
      if (idsEncontrados[item.id]) {
        // Se o ID já foi encontrado, retorna falso para remover o item
        return false;
      } else {
        // Se o ID não foi encontrado, marca-o como encontrado e retorna verdadeiro para manter o item
        idsEncontrados[item.id] = true;
        return true;
      }
    }).filter(link => {
      if(link.id != 'Flora da Bahia: Siphonocladaceae'){
        return link
      }
    });

    // Filtrar links que têm nós de destino filtrados

    let filteredLinks = data.links.filter((link) => {
      return filteredNodes.some((node) => {
        return node.id === link.target;
      });
    });

    filteredLinks = filteredLinks.filter(link => {
      // console.log('link map', link.target )
      if(link.target != 'Flora da Bahia: Siphonocladaceae'){
        return link
      }
    })
    // console.log('NodesF', filteredNodes)
    // console.log('linksF', filteredLinks)
    data.nodes = filteredNodes;
    data.links = filteredLinks;

    const radius = Math.min(width, height) * 0.2;
    const centerX = width;
    const centerY = height;

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

      graphWidth = nodeBoundingBox.width + linkBoundingBox.width + 500;
      graphHeight = nodeBoundingBox.height + linkBoundingBox.height + 500;

      if(this.toolTipsFiltros.includes("Livro Publicado")){
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

    const idsEncontrados = {};
    let filteredNodes = data.nodes.filter((item, index, array) => {
      return array.some((otherItem, otherIndex) => {
        return (otherIndex !== index && otherItem.id === item.id) || item.tipo === '1';
      });
    }).filter((item) => {
      if (idsEncontrados[item.id]) {
        // Se o ID já foi encontrado, retorna falso para remover o item
        return false;
      } else {
        // Se o ID não foi encontrado, marca-o como encontrado e retorna verdadeiro para manter o item
        idsEncontrados[item.id] = true;
        return true;
      }
    }).filter(link => {
      if(link.id != 'Flora da Bahia: Siphonocladaceae'){
        return link
      }
    });

    // Filtrar links que têm nós de destino filtrados

    let filteredLinks = data.links.filter((link) => {
      return filteredNodes.some((node) => {
        return node.id === link.target;
      });
    });

    filteredLinks = filteredLinks.filter(link => {
      // console.log('link map', link.target )
      if(link.target != 'Flora da Bahia: Siphonocladaceae'){
        return link
      }
    })
    console.log('NodesF', filteredNodes)
    console.log('linksF', filteredLinks)
    data.nodes = filteredNodes;
    data.links = filteredLinks;

    // console.log('data', data);
    let radius = Math.min(width, height) * 0.2;
    let centerX = width * 2;
    let centerY = height * 2;

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
     graphWidth = nodeBoundingBox.width + linkBoundingBox.width + 500;
     graphHeight = nodeBoundingBox.height + linkBoundingBox.height + 500;

      if(this.toolTipsFiltros.includes("Livro Publicado")){
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
    if(this.toolTipsFiltrosInstitutos.length == 0) this.pesquisasFiltradas = [];

    console.log('pesquisas filtradas', this.pesquisasFiltradas)
    let item = this.toolTipsFiltrosInstitutos.indexOf(event.target.value)
    if(item == -1){
      this.toolTipsFiltros.push(event.target.value)
      this.associarPesquisas(event.target.value)
    }
  }

  changeSelectPesquisador(event){
    if(this.toolTipsFiltrosPesquisadores.length == 0){
      this.pesquisadoresFiltrados = []
    }
    console.log('chande Selec pesquisador', event.target.value)
    let item = this.toolTipsFiltrosPesquisadores.indexOf(event.target.value)
    console.log('item', item)
    if(item == -1){
      this.toolTipsFiltrosPesquisadores.push(event.target.value)
      this.addPesquisadores(event.target.value)
      // this.associarPesquisas(event.target.value)
    }
  }

  removeTooTip(item){
    this.toolTipsFiltros = this.toolTipsFiltros.filter(tooltip => {
      return item != tooltip
    })
    this.removerPesquisas(item)
  }

  removeToolTipPesquisadores(item){
    this.toolTipsFiltrosPesquisadores = this.toolTipsFiltrosPesquisadores.filter(tooltip => {
      return item != tooltip
    })
  }

  addPesquisadores(item){
    let pesquisadoresF = this.pesquisadores.filter( pesquisador => {
      return pesquisador.nome == item
    })
    console.log('this.pesquisadores F', pesquisadoresF)
    this.pesquisadoresFiltrados.push(...pesquisadoresF)
    console.log('pesquisas filtradas', this.pesquisadoresFiltrados)
    this.associarPesquisas()
  }

  removePesquisadores(item){
    this.pesquisadoresFiltrados = this.pesquisadoresFiltrados.filter( pesquisa => {
      return pesquisa.tipo != item
    })
    if(this.toolTipsFiltrosPesquisadores.length < 1){
      this.pesquisadoresFiltrados = this.pesquisadores
    }
    console.log('pesquisadores filtradas', this.pesquisadoresFiltrados)
    this.associarPesquisas()
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicationService } from 'src/app/services/comunication.service';
import { InstitutoService } from 'src/app/services/instituto.service';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent implements OnInit {
  public pesquisas;
  public tipoProducoes = ["Artigo Publicado","Livro Publicado","Capítulo de Livro"]
  public dadosGerais;
  colorScheme = 'cool';
  view: [number, number] = [100, 350];
  viewPie: [number, number] = [200, 150];
  public pieChartData;
  public columnChartData = [];
  public institutos  = []
  public pesquisadores = []

  constructor(private service: InstitutoService, private comunication: ComunicationService, private router: Router) { }

  ngOnInit(): void {
    this.service.getPesquisas().subscribe(res => {
      this.pesquisas = res;
      this.montarDadosChartPie()
      this.montarDadosCollunChart()
      this.getPesquisadores()
      this.getInstitutos()
    },
    err => {
      console.log(err)
    })
  }

  getPesquisadores(){
    this.service.getPesquisadores().subscribe(
      res => {
        this.pesquisadores = res;
      }
    )
  }

  getInstitutos(){
    this.service.getInstitutos().subscribe(
      res => {
        this.institutos = res;
      }
    )
  }


  montarDadosCollunChart(){
    const categoriasPorAno = {};
    this.pesquisas.forEach(pesquisa => {
      const ano = pesquisa.ano;
      if (!categoriasPorAno[ano]) {
        categoriasPorAno[ano] = 1;
      } else {
        categoriasPorAno[ano]++;
      }
    })

    for (const key in categoriasPorAno) {
      let aux = {
        name: key,
        value: categoriasPorAno[key]
      }

      this.columnChartData.push(aux);
    }
    // console.log('cat',categoriasPorAno);
    console.log('cat',this.columnChartData);
  }


  montarDadosChartPie(){
    let qtdArtigoP = 0;
    let qtdLp = 0;
    let capL = 0;

    this.pesquisas.forEach(pesquisa => {
      if(pesquisa.tipo.includes('Artigo Publicado')){
        qtdArtigoP++;
      }
      if(pesquisa.tipo.includes('Livro Publicado')){
        qtdLp++
      }
      if(pesquisa.tipo.includes('Capítulo de Livro')){
        capL++
      }
    })

    this.pieChartData = [
      {
        name:'Artigo Publicado',
        value:qtdArtigoP
      },
      {
        name:'Livro Publicado',
        value:qtdLp
      },
      {
        name:'Capítulo de Livro',
        value:capL
      }
    ]
  }

  // columnChartData=  [
  //   {
  //     name: 'Categoria 1',
  //     value: 10
  //   },
  //   {
  //     name: 'Categoria 2',
  //     value: 20
  //   },
  //   // Adicione mais dados aqui
  // ];

  onBarClick(event: any) {
    console.log(event)
    this.comunication.setAno(event.name)
    this.comunication.setTipo(null)
    this.router.navigate(['/producoes'])
  }

  onSliceClick(event: any) {
    console.log(event)
    this.comunication.setAno('2023')
    this.comunication.setTipo(event.name)
    this.router.navigate(['/producoes'])
    // Redirecione para outra página com filtro selecionado
    // Use o Angular Router para navegar para a página desejada
  }

  atualizarLista(event){
    console.log('event', event)
  }

}

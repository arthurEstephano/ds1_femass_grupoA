import { Component, OnInit } from '@angular/core';
import { IPesquisa } from 'src/app/models/pesquisas.model';
import { InstitutoService } from 'src/app/services/instituto.service';

@Component({
  selector: 'app-grafo-index',
  templateUrl: './grafo-index.component.html',
  styleUrls: ['./grafo-index.component.scss'],
})
export class GrafoIndexComponent  implements OnInit {
  public listaDePesquisa: any[] = [];
  constructor(private service: InstitutoService) { }

  ngOnInit() {
    this.service.getPesquisas().subscribe(res => {
      this.listaDePesquisa = res;
    },
    err => {
      console.log(err)
    })
  }

  converterLista(listaPEsquisa: IPesquisa[]){
    let listaAtualizada = listaPEsquisa.map(pesquisa => {
      return{
        Tipo: pesquisa.tipo,
        Pesquisador:pesquisa.pesquisadores,
        Detalhamento:`${pesquisa.nome}, v. ${pesquisa.volume}, p.${pesquisa.paginaInicial} - ${pesquisa.paginaFinal}, ${pesquisa.ano}`
      }
    })

    this.listaDePesquisa = listaAtualizada;
  }

  atualizarLista(lista:any){
    this.converterLista(lista)
    // this.listaDePesquisa = lista
  }
}

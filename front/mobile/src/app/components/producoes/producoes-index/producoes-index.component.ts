import { Component, OnInit } from '@angular/core';
import { IPesquisa } from 'src/app/models/pesquisas.model';
import { InstitutoService } from 'src/app/services/instituto.service';

const pesquisasMock = [
  {
    tipo:'Artigo Publicado',
    detalhamento:'Pinel, Roque Elias Assumpção; do Carmo, Filipe Braida; Monteiro, Rodrigo Salvador;Zimbrão, Geraldo - Improving tests infrastructure through a model-based approach, 2011'
  },
  {
    tipo:'Artigo Publicado',
    detalhamento:'Pinel, Roque Elias Assumpção; do Carmo, Filipe Braida; Monteiro, Rodrigo Salvador;Zimbrão, Geraldo - Improving tests infrastructure through a model-based approach, 2011'
  },
  {
    tipo:'Artigo Publicado',
    detalhamento:'Pinel, Roque Elias Assumpção; do Carmo, Filipe Braida; Monteiro, Rodrigo Salvador;Zimbrão, Geraldo - Improving tests infrastructure through a model-based approach, 2011'
  },
  {
    tipo:'Artigo Publicado',
    detalhamento:'Pinel, Roque Elias Assumpção; do Carmo, Filipe Braida; Monteiro, Rodrigo Salvador;Zimbrão, Geraldo - Improving tests infrastructure through a model-based approach, 2011'
  },
  {
    tipo:'Artigo Publicado',
    detalhamento:'Pinel, Roque Elias Assumpção; do Carmo, Filipe Braida; Monteiro, Rodrigo Salvador;Zimbrão, Geraldo - Improving tests infrastructure through a model-based approach, 2011'
  },
  {
    tipo:'Artigo Publicado',
    detalhamento:'Pinel, Roque Elias Assumpção; do Carmo, Filipe Braida; Monteiro, Rodrigo Salvador;Zimbrão, Geraldo - Improving tests infrastructure through a model-based approach, 2011'
  },
]

@Component({
  selector: 'app-producoes-index',
  templateUrl: './producoes-index.component.html',
  styleUrls: ['./producoes-index.component.scss']
})

export class ProducoesIndexComponent implements OnInit {

  public openModal: boolean = false;
  public listaDePesquisa: any[] = [];

  constructor(private service: InstitutoService) { }


  ngOnInit(): void {
    // this.listaDePesquisa = JSON.parse(sessionStorage.getItem('pesquisas'))
    // //console.log('lista', this.listaDePesquisa)
    this.service.getPesquisas().subscribe(res => {
      this.listaDePesquisa = res;
    },
    err => {
      console.log(err)
    })
  }

  loadPesquisas(){
    this.listaDePesquisa[0]
  }

  openCloseModal(){
    this.openModal = !this.openModal;
  }

  abrirConfirmacao(item:any){
    // this.itemEmDestaque = item;
    // this.textoConfirmacao = `Deseja mesmo excluir o pesquisador ${item.nome}?`
    // this.openModalConfirmacao = true;
    // this.acaoEmDestaque = 1;
  }

  serchFunction(item:any){
    //console.log('item search', item);
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

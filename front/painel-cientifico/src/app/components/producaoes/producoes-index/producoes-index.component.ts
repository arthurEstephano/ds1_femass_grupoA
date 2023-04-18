import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./producoes-index.component.css']
})

export class ProducoesIndexComponent implements OnInit {

  public openModal: boolean = false;
  public listaDePesquisa = pesquisasMock;
  public camposPesquisa = ['Institudo', 'Pesquisador', 'Tipos Produção']

  constructor() { }

  ngOnInit(): void {
    // this.listaDePesquisa = JSON.parse(sessionStorage.getItem('pesquisas'))
    // console.log('lista', this.listaDePesquisa)
  }

  loadPesquisas(){
    this.listaDePesquisa[0]
  }

  openCloseModal(){
    this.openModal = !this.openModal;
  }

  abrirConfirmacao(item){
    // this.itemEmDestaque = item;
    // this.textoConfirmacao = `Deseja mesmo excluir o pesquisador ${item.nome}?`
    // this.openModalConfirmacao = true;
    // this.acaoEmDestaque = 1;
  }

  serchFunction(item){
    console.log('item search', item);
  }

}

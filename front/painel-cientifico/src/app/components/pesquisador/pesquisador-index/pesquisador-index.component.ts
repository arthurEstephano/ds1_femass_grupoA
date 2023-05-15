import { Component, OnInit } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstitutoService } from 'src/app/services/instituto.service';
import { IPesquisador } from 'src/app/models/pesquisador.model';



const MockPesquisadores: any[] =[
  {
    nome: "Jose Silva Lima",
    instituto: 'Unidade 1'
  },
  {
    nome: "Raimundo Silva Lima",
    instituto: 'Unidade 2'
  },
  {
    nome: "Fulano Silva Lima",
    instituto: 'Unidade 3'
  },
]

const MockInstitutos: IInstituto[] =[
  {
    nome: "Unidade 1",
    acronimo: 'XPTO'
  },
  {
    nome: "Unidade 2",
    acronimo: 'XPTOX'
  },
  {
    nome: "Unidade 3",
    acronimo: 'XPTON'
  },
]

@Component({
  selector: 'app-pesquisador-index',
  templateUrl: './pesquisador-index.component.html',
  styleUrls: ['./pesquisador-index.component.css']
})
export class PesquisadorIndexComponent implements OnInit {
  // public camposPesquisa = ['Nome','Instituto','LATTES']
  public camposPesquisa = ['Nome']
  public pesquisadoresList: any[] = [];
  public pesquisadoresListfiltered: any[] = [];
  public openModal: boolean = false;
  public openModalConfirmacao: boolean = false;
  public modalAdd: boolean = false;
  public textoConfirmacao: string;
  public itemEmDestaque:any;
  public institutoList: IInstituto[] = [];
  public acaoEmDestaque: number = 0;


  constructor(private _http: HttpClient, private service: InstitutoService) { }

  ngOnInit(): void {
    // this.loadXML('0023809873085852')
    this.getInstitutoList();
    this.loadPesquisadores()
  }

  getInstitutoList(){
    this.service.getInstitutos().subscribe((res: IInstituto[]) => {
      this.institutoList = res;
    },
    err => {
      //console.log('err', err)
    })
  }


  addPesquisador(obj){
    // let obj = this.itemEmDestaque;
    let body = {
      'identificador_lattes':obj[0].lates,
      nome:obj[0].nome,
      instituto:obj[1].nome,
      // pesquisa:obj[0].pesquisas
    }

    this.service.addPesquisador(body).subscribe(res=>{
      this.service.addPesquisas(obj[0].pesquisas).subscribe( sucesso => {
        this.loadPesquisadores();
      },
      erro => {
        console.log("erro", erro)
      }
      )

    },
    err => {
      //console.log("eer", err)
    })
  }

  loadPesquisadores(){
    this.service.getPesquisadores().subscribe(
      res => {
        this.pesquisadoresList = res;
        this.pesquisadoresListfiltered = res.map((pesquisador: IPesquisador) => {
          let obj = {
            id: pesquisador.id,
            'identificador_lattes':pesquisador.identificador_lattes,
            instituto:pesquisador.instituto,
            nome: pesquisador.nome
          }

          return obj
        });
      },
      err => {
        alert(err)
      }
    )
  }

  confirmacaoModalAdd(obj){
    this.textoConfirmacao = `Deseja mesmo incluir o Lattes ${obj[0].lates} de ${obj[0].nome} na ${obj[1].nome}`
    this.itemEmDestaque = obj;
    this.acaoEmDestaque = 2
    this.openCloseModal()
    this.openModalConfirmacao = true;
    // this.addPesquisador(obj)
  }

  confirmacaoModalDelete(item){
    this.acaoEmDestaque = 1;
    this.itemEmDestaque = item;
    this.textoConfirmacao = `Deseja mesmo excluir o pesquisador ${item.nome}?`
    this.openCloseModal();
    this.openModalConfirmacao = true;
  }

  openCloseModal(){
    this.openModal = !this.openModal;
    // //console.log( 'open close modal', this.openModal)
    // this.acaoEmDestaque = 2;
  }

  openModalAdd(){
    this.modalAdd = true
  }

  abrirConfirmacao(item){
    this.itemEmDestaque = item;
    this.textoConfirmacao = `Deseja mesmo excluir o pesquisador ${item.nome}?`
    this.openModalConfirmacao = true;
    this.acaoEmDestaque = 1;
  }


  deletar(){

    // this.pesquisadoresListfiltered = this.pesquisadoresListfiltered.filter(pesquisador => {
    //   return !pesquisador.nome.toUpperCase().includes(this.itemEmDestaque.nome.toUpperCase())
    // })

    //console.log( 'pesquisador para deletar', this.itemEmDestaque)

    this.service.deletePesquisador(this.itemEmDestaque.id).subscribe(
      res => {
        this.loadPesquisadores()
      },
      err => {
        alert(err);
      }
    )

    this.openModalConfirmacao = false;

  }

  acaoModalConfirmacao(){
    if(this.acaoEmDestaque == 1){
      this.deletar();
    }else if(this.acaoEmDestaque == 2){
      this.addPesquisador(this.itemEmDestaque)
    }

    this.openModalConfirmacao = false
  }

  serchFunction(searchTerms){
    if(searchTerms.termo === ""){
      this.loadPesquisadores()
    }else{
      this.service.getPesquisadorFiltrado(searchTerms.termo, 'name').subscribe(
        res => {
          //console.log('res', res)
          this.pesquisadoresListfiltered = res
        },
        err => {
          //console.log(err)
        }
      )
    }



  }
}

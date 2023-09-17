import { Component, OnInit } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';
// import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPesquisador } from 'src/app/models/pesquisador.model';
import { InstitutoService } from 'src/app/services/instituto.service';


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
  selector: 'app-pesquisador',
  templateUrl: './pesquisador.component.html',
  styleUrls: ['./pesquisador.component.scss'],
})
export class PesquisadorComponent  implements OnInit {
  public camposPesquisa = ['Nome']
  public pesquisadoresList: any[] = [];
  public pesquisadoresListfiltered: any[] = MockPesquisadores;
  public openModal: boolean = false;
  public openModalConfirmacao: boolean = false;
  public modalAdd: boolean = false;
  public textoConfirmacao: string = '';
  public itemEmDestaque:any;
  public institutoList: IInstituto[] = MockInstitutos;
  public acaoEmDestaque: number = 0;
  public listParaEdicao: any[] | null = null;
  public alerta = false


  constructor(public service: InstitutoService) { }

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


  addPesquisador(obj:any){
    console.log("obs", obj)
    console.log('pesquisadores', this.pesquisadoresList)
    // let obj = this.itemEmDestaque;
    let existe = this.pesquisadoresList.find(pesquisador => {
      return pesquisador['identificador_lattes'] === obj[0].lates
    })
    console.log('existe', existe)

    if(existe.lenght === 0){
      let body = {
        'identificador_lattes':obj[0].lates,
        nome:obj[0].nome,
        instituto:obj[1].nome,
        // pesquisa:obj[0].pesquisas
      }

      // this.service.addPesquisador(body).subscribe(res=>{
      //   this.service.addPesquisas(obj[0].pesquisas).subscribe( sucesso => {
      //     alert('Pesquisador adcionado com Sucesso!');
      //     this.loadPesquisadores();
      //   },
      //   erro => {
      //     console.log("erro", erro)
      //   }
      //   )

      // },
      // err => {
      //   //console.log("eer", err)
      // })

    }else{
      // debugger
      this.textoConfirmacao = `O pesquisador ${obj[0].nome} com o Lattes ${obj[0].lates} já existe em nossa base de pesquisa.`
      this.alerta = true
      this.openModalConfirmacao = true;
    }
  }

  editarPesquisador(obj:any){
    console.log('obj', obj)
    // console.log('instituto', obj.instituto[0])
    this.textoConfirmacao = `Deseja mesmo editar o Lattes ${obj.lattes} de ${obj.nome} - ${obj.instituto[0].nome}`
    this.itemEmDestaque = obj;
    this.acaoEmDestaque = 3
    this.openCloseModal()
    this.alerta = false
    this.openModalConfirmacao = true;
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

  confirmacaoModalAdd(obj:any){
    this.textoConfirmacao = `Deseja mesmo incluir o Lattes ${obj[0].lates} de ${obj[0].nome} na ${obj[1].nome}`
    this.itemEmDestaque = obj;
    this.acaoEmDestaque = 2
    this.openCloseModal()
    this.alerta = false
    this.openModalConfirmacao = true;
    // this.addPesquisador(obj)
  }

  confirmacaoModalDelete(item:any){
    this.acaoEmDestaque = 1;
    this.itemEmDestaque = item;
    this.textoConfirmacao = `Deseja mesmo excluir o pesquisador ${item.nome}?`
    this.openCloseModal();
    this.alerta = false
    this.openModalConfirmacao = true;
  }

  openCloseModal(list?:any){
    this.openModal = !this.openModal;
    if(list) {
      console.log('list', list)
      this.listParaEdicao = list
    }else{
      this.listParaEdicao = null
    }
    // //console.log( 'open close modal', this.openModal)
    // this.acaoEmDestaque = 2;
  }

  openModalAdd(){
    this.modalAdd = true
  }

  abrirConfirmacao(item:any){
    this.itemEmDestaque = item;
    this.textoConfirmacao = `Deseja mesmo excluir o pesquisador ${item.nome}?`
    this.alerta = false
    this.openModalConfirmacao = true;
    this.acaoEmDestaque = 1;
  }


  deletar(){

    this.pesquisadoresListfiltered = this.pesquisadoresListfiltered.filter(pesquisador => {
      return !pesquisador.nome.toUpperCase().includes(this.itemEmDestaque.nome.toUpperCase())
    })

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
    this.openModalConfirmacao = false
    if(this.acaoEmDestaque == 1){
      this.deletar();
    }else if(this.acaoEmDestaque == 2){
      this.addPesquisador(this.itemEmDestaque)
    }else if(this.acaoEmDestaque == 3){
      //Add chamada ao endpoint aqui!
      this.textoConfirmacao = `Pesquisador Editado com Sucesso!`
      this.alerta = true
      this.openModalConfirmacao = true;
    }

  }

  serchFunction(searchTerms:any){
    if(searchTerms.termo === ""){
      this.loadPesquisadores()
    }else{
      // this.service.getPesquisadorFiltrado(searchTerms.termo, 'name').subscribe(
      //   res => {
      //     //console.log('res', res)
      //     this.pesquisadoresListfiltered = res
      //   },
      //   err => {
      //     //console.log(err)
      //   }
      // )
    }



  }

}

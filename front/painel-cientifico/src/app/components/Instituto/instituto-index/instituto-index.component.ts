import { Component, OnInit } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';
import { InstitutoService } from 'src/app/services/instituto.service';


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
  selector: 'app-instituto-index',
  templateUrl: './instituto-index.component.html',
  styleUrls: ['./instituto-index.component.css']
})
export class InstitutoIndexComponent implements OnInit {
  // public institutoList: IInstituto[] = MockInstitutos;
  // public institutoListfiltered: IInstituto[] = MockInstitutos;
  public institutoList: IInstituto[] = [];
  public institutoListfiltered: IInstituto[] = [];
  public openModal: boolean = false;
  public camposPesquisa = ['Nome','Acrônimo']

  constructor(private service: InstitutoService) { }

  ngOnInit(): void {
    // this.institutoListfiltered = this.institutoList;
    this.getInstitutoList()
  }

  getInstitutoList(){
    this.service.getInstitutos().subscribe((res: IInstituto[]) => {
      this.institutoList = res;
      this.institutoListfiltered = res;
    },
    err => {
      //console.log('err', err)
    })
  }


  serchFunction(searchTerms){
    // //console.log('searchTerms', searchTerms)
    if(searchTerms.termo === ""){
      this.getInstitutoList()
    }else{
      this.service.getInstitutoFiltrado(searchTerms.termo, searchTerms.campo.toLowerCase()).subscribe(
        res => {
          //console.log('res', res)
          this.institutoListfiltered = res
        },
        err => {
          //console.log(err)
        }
      )
    }

    // if(searchTerms.campo.toUpperCase() === 'TODOS'){
    //   this.institutoListfiltered = this.institutoList.filter(instituto => {
    //     return instituto.nome.toUpperCase().includes(searchTerms.termo.toUpperCase()) || instituto.acronimo.toUpperCase().includes(searchTerms.termo.toUpperCase())
    //   })

    // }else if(searchTerms.campo.toUpperCase() === 'NOME'){
    //   this.institutoListfiltered = this.institutoList.filter(instituto => {
    //     return instituto.nome.toUpperCase().includes(searchTerms.termo.toUpperCase())
    //   })

    // }else if(searchTerms.campo.toUpperCase() === 'ACRONIMO'){
    //   this.institutoListfiltered = this.institutoList.filter(instituto => {
    //     return instituto.acronimo.toUpperCase().includes(searchTerms.termo.toUpperCase())
    //   })

    // }else{
    //   alert('termo não encontrado');
    // }

  }

  addInstituto(instituto: IInstituto){
    // this.institutoList.push(instituto);
    // this.institutoListfiltered.push(instituto);
    this.openCloseModal();
    this.service.addInstitutos(instituto).subscribe(res => {
      this.getInstitutoList();
    },
    err => {
      //console.log('err', err);
    })

  }

  removeInstituto(id:string){
    this.service.deleteInstituto(id).subscribe(
      res => {
        //console.log('res')
        this.getInstitutoList()
      },
      err => {
        //console.log("err", err)
      }
    )
    // this.institutoListfiltered = this.institutoList.filter(instituto => {
    //   return !instituto.nome.toUpperCase().includes(nome.toUpperCase())
    // })
  }

  openCloseModal(){
    this.openModal = !this.openModal;
  }
}

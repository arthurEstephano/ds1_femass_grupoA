import { Component, OnInit } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';


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
  public institutoList: IInstituto[] = MockInstitutos;
  public institutoListfiltered: IInstituto[] = MockInstitutos;
  public openModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.institutoListfiltered = this.institutoList;
  }

  serchFunction(searchTerms){
    console.log('searchTerms', searchTerms)

    if(searchTerms.campo.toUpperCase() === 'TODOS'){
      this.institutoListfiltered = this.institutoList.filter(instituto => {
        return instituto.nome.toUpperCase().includes(searchTerms.termo.toUpperCase()) || instituto.acronimo.toUpperCase().includes(searchTerms.termo.toUpperCase())
      })

    }else if(searchTerms.campo.toUpperCase() === 'NOME'){
      this.institutoListfiltered = this.institutoList.filter(instituto => {
        return instituto.nome.toUpperCase().includes(searchTerms.termo.toUpperCase())
      })

    }else if(searchTerms.campo.toUpperCase() === 'ACRONIMO'){
      this.institutoListfiltered = this.institutoList.filter(instituto => {
        return instituto.acronimo.toUpperCase().includes(searchTerms.termo.toUpperCase())
      })

    }else{
      alert('termo não encontrado');
    }

  }

  addInstituto(instituto: IInstituto){
    this.institutoList.push(instituto);
    this.institutoListfiltered.push(instituto);
    this.openCloseModal();
  }

  removeInstituto(nome:string){
    this.institutoListfiltered = this.institutoList.filter(instituto => {
      return !instituto.nome.toUpperCase().includes(nome.toUpperCase())
    })
  }

  openCloseModal(){
    this.openModal = !this.openModal;
  }
}

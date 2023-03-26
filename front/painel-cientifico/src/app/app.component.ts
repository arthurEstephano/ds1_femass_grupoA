import { Component } from '@angular/core';
import { IInstituto } from './models/instituto.models';


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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public  title = 'painel-cientifico';

  public menusSelecionados = {
    home: true,
    institutos: false,
    pesquisador:false,
    producao:false
  }

  selecionar(menu:string){
   for (const key in this.menusSelecionados) {
    this.menusSelecionados[key] = false
   }


   this.menusSelecionados[menu] = true
  }
}

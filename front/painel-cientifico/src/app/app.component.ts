import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'painel-cientifico';

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

   console.log("key", menu)

   this.menusSelecionados[menu] = true
   console.log(this.menusSelecionados)
  }
}

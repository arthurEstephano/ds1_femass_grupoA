import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal-configuracao',
  templateUrl: './modal-configuracao.component.html',
  styleUrls: ['./modal-configuracao.component.scss'],
})
export class ModalConfiguracaoComponent  implements OnInit {

  public valoresVerde: number[] = [0,1]
  public valoresVermelho: number[] = [2,3];
  public valoresAzul: number[] = [4,5];
  public show : boolean[] = [true, true]
  constructor() { }

  ngOnInit() {

  }

  aplicarFiltro(){

  }

  changeSelectValorVerde(event: any, posicao: number) {
    if(posicao == 0){
      this.valoresVerde[0] = Number(event.target.value);
      this.valoresVerde[1] = this.valoresVerde[0] + 1
    }else{
      Number(event.target.value) > this.valoresVerde[0]
      ?[
        this.valoresVerde[1] = Number(event.target.value),
        this.valoresVermelho[0] = this.valoresVerde[1] + 1,
        this.valoresVermelho[1] = this.valoresVerde[1] + 2,
        this.valoresAzul[0] = this.valoresVermelho[1] + 1,
        this.valoresAzul[1] = this.valoresVermelho[1] + 2,
      ]
      :[
        alert('Valor não poder ser menor que ' + Number(this.valoresVerde[0] + 1)),
        this.valoresVerde[1] =  this.valoresVerde[0] + 1,
      ]

    }
  }

  changeSelectValorVermelho(event: any, posicao: number) {
    if(posicao == 0){
      this.valoresVermelho[0] <= this.valoresVerde[1]
      ?[alert('Valor não poder ser menor que ' + Number(this.valoresVerde[1] + 1)),
      this.valoresVermelho[0] =  this.valoresVerde[1] + 1]
      :[
        this.valoresVermelho[0] = Number(event.target.value),
        this.valoresVermelho[1] = this.valoresVermelho[0] + 1
      ]

    }else{
      Number(event.target.value) > this.valoresVermelho[0]
      ?[
        this.valoresVermelho[1] = Number(event.target.value),
        this.valoresAzul[0] = this.valoresVermelho[1] + 1,
        this.valoresAzul[1] = this.valoresVermelho[1] + 2,
      ]
      :[alert('Valor não poder ser menor que ' + Number(this.valoresVermelho[0] + 1)),
      this.valoresVermelho[1] =  this.valoresVermelho[0] + 1]

    }
  }

  changeSelectValorAzul(event: any, posicao: number) {
    if(posicao == 0){
      this.valoresAzul[0] <= this.valoresVermelho[1]
      ?[alert('Valor não poder ser menor que ' + Number(this.valoresVermelho[1] + 1)),
      this.valoresAzul[0] =  this.valoresVermelho[1] + 1]
      :[this.valoresAzul[0] = Number(event.target.value),
      this.valoresAzul[1] = this.valoresAzul[0] + 1]
    }else{
      Number(event.target.value) > this.valoresAzul[0]
      ?this.valoresAzul[1] = Number(event.target.value)
      :[alert('Valor não poder ser menor que ' + Number(this.valoresAzul[0] + 1)),
      this.valoresAzul[1] =  this.valoresAzul[0] + 1]

    }
  }
}

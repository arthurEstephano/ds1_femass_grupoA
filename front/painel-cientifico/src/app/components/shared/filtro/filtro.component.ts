import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
})

export class FiltroComponent implements OnInit {

  // @ViewChild(termText);

  public selectField: string = 'Todos';
  public quantidadeDeCampos: number[] = [1];

  @Input() composta ?: boolean = false;
  @Input() campos: string[] = []
  @Output() search = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  changeSelect(event:any){
    this.selectField = event.target.value;
  }

  // buildTermos(nome:string){
  buildTermos(){
    // console.log('termos', this.termText.termText)
    // console.log(`nome: ${nome}, campo: ${this.selectField}`)
    // let fields = {
    //   termo:nome,
    //   campo:this.selectField
    // }
    // this.search.emit(fields)
    let fields = {};
    for(let i = 0; i < this.quantidadeDeCampos.length; i++){
      console.log('termos', document.querySelectorAll('.termArea input')[i])
      // let termo = document.querySelectorAll('.termArea input')[i].value;
      // let campo = document.querySelectorAll('.selectArea select')[i].value;
      // fields[i] = { termo, campo };
    }
    this.search.emit(fields);
  }

  addBarraDeBusca(){
    if(this.quantidadeDeCampos.length < this.campos.length)
      this.quantidadeDeCampos.push(1);
  }

}

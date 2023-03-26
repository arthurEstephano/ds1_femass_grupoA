import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  public selectField: string = 'Todos';

  @Input() campos: string[] = []
  @Output() search = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  changeSelect(event:any){
    this.selectField = event.target.value;
  }

  buildTermos(nome:string){
    // console.log(`nome: ${nome}, campo: ${this.selectField}`)
    let fields = {
      termo:nome,
      campo:this.selectField
    }
    this.search.emit(fields)
  }

}

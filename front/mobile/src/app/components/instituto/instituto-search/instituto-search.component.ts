import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-instituto-search',
  templateUrl: './instituto-search.component.html',
  styleUrls: ['./instituto-search.component.css']
})
export class InstitutoSearchComponent implements OnInit {
  public selectField: string = 'Todos';

  @Output() search = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  changeSelect(event:any){
    this.selectField = event.target.value;
  }

  buildTermos(nome:string){
    // //console.log(`nome: ${nome}, campo: ${this.selectField}`)
    let fields = {
      termo:nome,
      campo:this.selectField
    }
    this.search.emit(fields)
  }

}

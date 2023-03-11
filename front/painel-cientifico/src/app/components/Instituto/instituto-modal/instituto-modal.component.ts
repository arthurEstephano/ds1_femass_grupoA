import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';

@Component({
  selector: 'app-instituto-modal',
  templateUrl: './instituto-modal.component.html',
  styleUrls: ['./instituto-modal.component.css']
})
export class InstitutoModalComponent implements OnInit {

  @Output() add = new EventEmitter<IInstituto>()
  @Output() close = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }

  buildTermos(nome:string, acronimo:string){
    let item = {
      nome: nome,
      acronimo: acronimo
    }


    this.add.emit(item)
  }

  closeModal(){
    this.close.emit(false);
  }

}

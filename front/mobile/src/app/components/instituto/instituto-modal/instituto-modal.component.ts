import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';

@Component({
  selector: 'app-instituto-modal',
  templateUrl: './instituto-modal.component.html',
  styleUrls: ['./instituto-modal.component.scss']
})
export class InstitutoModalComponent implements OnInit {

  @Output() add = new EventEmitter<IInstituto>()
  @Output() close = new EventEmitter<boolean>()
  @Output() editar = new EventEmitter<any>()
  @Input() institutoParaEdicao : IInstituto | null = null

  public openModalAlert : boolean = false;
  constructor() { }

  ngOnInit(): void {
    console.log('instituto', this.institutoParaEdicao)
  }

  buildTermos(nome:string, acronimo:string){
    if(nome !== '' && acronimo !== ''){
      let item = {
        nome: nome,
        acronimo: acronimo
      }

      if(this.institutoParaEdicao !== null){
        item = {...item, ...{id: this.institutoParaEdicao.id}}
        this.editar.emit(item);
      }else{
        this.add.emit(item)
      }
    }else{
      this.openModalAlert = true
    }
  }

  closeModal(){
    this.institutoParaEdicao = null;
    this.close.emit(false);
  }

}

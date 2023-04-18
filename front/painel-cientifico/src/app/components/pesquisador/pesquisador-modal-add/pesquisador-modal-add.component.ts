import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';
import xml2js from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pesquisador-modal-add',
  templateUrl: './pesquisador-modal-add.component.html',
  styleUrls: ['./pesquisador-modal-add.component.css']
})
export class PesquisadorModalAddComponent implements OnInit {
  public selectField: string = 'Todos';
  public itemSelecionado = "Selecione um instituto"
  public xmlItems: any = null;
  public pesquisadorNaoEncontrado = false;

  @Input() institutos: IInstituto[];
  @Input() institutosFiltrados: IInstituto[];
  @Output() positivo = new EventEmitter()
  @Output() close = new EventEmitter()
  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.institutosFiltrados = this.institutos
  }

  pesquisar(lates:string){
    this.loadXML(lates)
  }

  loadXML(codigo){
    this._http.get(`../../../../assets/Curriculos_XML/${codigo}.xml`,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe(
        (data) => {
          this.parseXML(data)
            .then((data) => {
              console.log('data', data)
              this.xmlItems = data;
              this.pesquisadorNaoEncontrado = false;
            });
        },
        err=>{
          this.xmlItems = null;
          this.pesquisadorNaoEncontrado = true
        }
      );
  }

  parseXML(data) {
    return new Promise(resolve => {
      var k: string | number,
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        // console.log('result', result)
        let resutado = {
          lates:result['CURRICULO-VITAE']['$']['NUMERO-IDENTIFICADOR'],
          nome:result['CURRICULO-VITAE']['DADOS-GERAIS'][0]['$']['NOME-COMPLETO'],
          pesquisas:result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA']
        }
        // sessionStorage.setItem('pesquisas',JSON.stringify(resutado.pesquisas))
        resolve(resutado)
        // this.pesquisador = resutado;
      });
    });
  }

  filtrar(termo:string){
    // console.log('termo', termo == ' ')
    this.itemSelecionado = '';
    if(termo = ''){
      this.institutosFiltrados = this.institutos;
      return
    }
    this.institutosFiltrados = this.institutos.filter(
      instituto => {
        return instituto.nome.toUpperCase().includes(termo.toUpperCase())
      }
    )
    console.log('intituto nome', this.institutosFiltrados)
    this.institutosFiltrados.length == 0
    ?this.itemSelecionado = "Instituto não encontrado"
    :this.itemSelecionado = this.institutosFiltrados[0].nome
  }

  changeSelect(event:any){
    this.itemSelecionado = event.target.value;
    // console.log('evento', this.itemSelecionado)
  }

  closeModal(){
    this.close.emit(false);
  }

  confirmacao(){
    let institutoSelecionado = this.institutos.filter(instituto => {
      return instituto.id.toString() == this.itemSelecionado
    })
    // console.log('insti', institutoSelecionado)
    let item = [this.xmlItems, institutoSelecionado[0]]
    this.positivo.emit(item)
  }

}

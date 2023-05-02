import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInstituto } from 'src/app/models/instituto.models';
import { IPesquisador } from 'src/app/models/pesquisador.model';
import { IPesquisa } from 'src/app/models/pesquisas.model';
import { InstitutoService } from 'src/app/services/instituto.service';

@Component({
  selector: 'app-producoes-filtro',
  templateUrl: './producoes-filtro.component.html',
  styleUrls: ['./producoes-filtro.component.css']
})
export class ProducoesFiltroComponent implements OnInit {

  public selectField: string = 'Todos';
  public pesquisadoresList: IPesquisador[] = [];
  public pesquisadoresListfiltered: IPesquisador[] = [];
  public pesquisadorSelecionado: string = 'Todos';
  public institutoSelecionado: string;
  public institutoList: IInstituto[] = [];
  public institutoListfiltered: IInstituto[] = [];
  public tipoProducoes = ["Artigo Publicado","Livro Publicado","Capítulo de Livro"]
  public anoInicio: number = 0;
  public anoFim: number = 2023;
  public disabledCampos = true;
  public disabledPesquisador = true;
  public lista : IPesquisa[]= []
  public listaEmitida : IPesquisa[]= []
  public tipoProd = 'Todos';

  @Output() listaAtualizada = new EventEmitter();



  constructor(private service: InstitutoService) { }

  ngOnInit(): void {
    this.loadPesquisadores()
    this.getInstitutoList()
  }

  changeSelect(event?:any){
    if(event)
      this.selectField = event.target.value;
    this.pesquisadorSelecionado = 'todos'
    let body = {
      anoInicio: this.anoInicio,
      anoFim: this.anoFim,
      instituto: this.selectField.replace(/ /g, '%20')
    }

    if(this.selectField === 'Todos'){
      if(this.tipoProd == 'Todos'){
        this.listaAtualizada.emit(this.lista)
      }else{
        this.listaAtualizada.emit(this.filtrarPorTipoDeProducao())

      }
      // this.tipoProd == 'Todos'
      //   ?this.listaAtualizada.emit(this.lista)
      //   :this.listaAtualizada.emit(this.filtrarPorTipoDeProducao())
      // this.listaAtualizada.emit(this.lista)
    }else{

      this.service.pesquisasPorInstituto(body).subscribe( res => {
        // console.log('res pesquisa por instituiçao', res)
        if(this.tipoProd == 'Todos'){
          this.listaAtualizada.emit(res)
        }else{
          this.listaAtualizada.emit(this.filtrarPorTipoDeProducao(res))

        }

        // this.listaAtualizada.emit(res);

      },
      err => {
        console.log('erro pesquisa por ano', err)
      })
    }

  }

  changeSelectProd(event:any){
    this.tipoProd = event.target.value;

    console.log("lista emitida", this.listaEmitida)
    if(this.selectField.toLocaleUpperCase() !== 'TODOS'){
      this.changeSelect();
    }else if(this.pesquisadorSelecionado.toLocaleUpperCase() !== 'TODOS'){
      this.changeSelectPesquisador();
    }else{

      let listaFiltrada = this.lista.filter(pesquisa => {
        return pesquisa.tipo.includes(this.tipoProd)
      })

      this.listaAtualizada.emit(listaFiltrada);
    }

    // console.log('lista filtrada', listaFiltrada)
  }

  filtrarPorTipoDeProducao(lista?:IPesquisa[]){
    if(lista){
      this.listaEmitida =  lista.filter(pesquisa => {
        return pesquisa.tipo.includes(this.tipoProd)
      })
    }else{
      this.listaEmitida = this.lista.filter(pesquisa => {
        return pesquisa.tipo.includes(this.tipoProd)
      })
    }

    return this.listaEmitida;
  }
  changeSelectAno(event:any){
    this.anoInicio = event.target.value;
  }
  changeSelectAnoFim(event:any){
    this.anoFim = event.target.value;
  }

  changeSelectPesquisador(event?:any){
    if(event)
      this.pesquisadorSelecionado = event.target.value;
    this.selectField = 'todos'

      let body = {
      anoInicio: this.anoInicio,
      anoFim: this.anoFim,
      pesquisador: this.pesquisadorSelecionado.replace(/ /g, '%20')
    }

    if(this.pesquisadorSelecionado === 'todos'){
      if(this.tipoProd == 'Todos'){
        this.listaEmitida = this.lista
        this.listaAtualizada.emit(this.lista)
      }else{
        this.listaAtualizada.emit(this.filtrarPorTipoDeProducao())

      }
      // this.tipoProd == 'Todos'
      // ?this.listaAtualizada.emit(this.lista)
      // :this.listaAtualizada.emit(this.filtrarPorTipoDeProducao())
      // console.log('todos', this.lista)

    }else{
      this.service.pesquisasPorPesquisador(body).subscribe(res =>{
        if(this.tipoProd == 'Todos'){
          this.listaAtualizada.emit(res)
        }else{
          this.listaAtualizada.emit(this.filtrarPorTipoDeProducao(res))

        }

        // this.listaAtualizada.emit(res)
      },
      erro => {
        console.log('err', erro)
      })
    }



  }

  changeSelectInstitutos(event:any){
    this.institutoSelecionado = event.target.value;
  }

  loadPesquisadores(){
    this.service.getPesquisadores().subscribe(
      res => {
        this.pesquisadoresList = res;
        this.pesquisadoresListfiltered = res;
      },
      err => {
        alert(err)
      }
      )
  }

  getInstitutoList(){
      this.service.getInstitutos().subscribe((res: IInstituto[]) => {

      this.institutoList = res;
      // this.institutoListfiltered = res;
    },
    err => {
      //console.log('err', err)
    })
  }

  buscaPorAno(){
    let body = {
      anoInicio: this.anoInicio,
      anoFim: this.anoFim
    }

    this.service.pesquisasPorAno(body).subscribe( res => {
      console.log('res pesquisa por ano', res)
      this.lista = res;
      this.listaAtualizada.emit(this.lista);
      let institutosPesquisa = []
      let pesquisadoresPesquisa = []

      res.forEach(item => {
        // institutosPesquisa.push(item.pesquisadores[0])
        pesquisadoresPesquisa.push(item.pesquisadores[0])
      });

      institutosPesquisa = [...new Set(institutosPesquisa)]
      let x = this.pesquisadoresList.filter( pesquisador => {
        return pesquisadoresPesquisa.includes(pesquisador.nome)
      }).map(pesquisador => {
        return pesquisador.instituto
      })


      // console.log('pesquisadores', x)

      institutosPesquisa = x;
      // x.forEach(x => {
      //  institutosPesquisa.push(x.instituto)
      // });

      this.institutoListfiltered = [...new Set(institutosPesquisa)]
      this.pesquisadoresListfiltered = [...new Set(pesquisadoresPesquisa)]


      // console.log('pesquisadores pesqusia', this.institutoListfiltered);
      // console.log(x)

      this.disabledCampos = false;

    },
    err => {
      console.log('erro pesquisa por ano', err)
    })

    console.log('body', body)
  }

  // buildTermos(nome:string){
  // buildTermos(){
  //   // //console.log('termos', this.termText.termText)
  //   // //console.log(`nome: ${nome}, campo: ${this.selectField}`)
  //   // let fields = {
  //   //   termo:nome,
  //   //   campo:this.selectField
  //   // }
  //   // this.search.emit(fields)
  //   let fields = {};
  //   for(let i = 0; i < this.quantidadeDeCampos.length; i++){
  //     //console.log('termos', document.querySelectorAll('.termArea input')[i])
  //     // let termo = document.querySelectorAll('.termArea input')[i].value;
  //     // let campo = document.querySelectorAll('.selectArea select')[i].value;
  //     // fields[i] = { termo, campo };
  //   }
  //   this.search.emit(fields);
  // }

}

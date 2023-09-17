import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IInstituto } from 'src/app/models/instituto.models';
import * as xml2js from 'xml2js';
// import * as teste from '../../../assets/Curriculos_XML/'

@Component({
  selector: 'app-pesquisador-modal-add',
  templateUrl: './pesquisador-modal-add.component.html',
  styleUrls: ['./pesquisador-modal-add.component.scss'],
})
export class PesquisadorModalAddComponent  implements OnInit {

  public selectField: string = 'Todos';
  public itemSelecionado = "Selecione um instituto"
  public xmlItems: any = null;
  public pesquisadorNaoEncontrado = false;
  public codPesquisador = ''
  public form !: FormGroup;

  @Input() institutos: IInstituto[] = [];
  @Input() list: any | null = null;
  @Input() institutosFiltrados: IInstituto[] = [];
  @Input() editando: boolean = false;
  @Output() positivo = new EventEmitter()
  @Output() editar = new EventEmitter()
  @Output() close = new EventEmitter()
  constructor(private http: HttpClient,     private fb: UntypedFormBuilder ) { }

  ngOnInit(): void {
    this.createForm();
    this.institutosFiltrados = this.institutos
    if(this.list !== null) {
      this.itemSelecionado = this.list?.instituto
    }
    console.log('dentro de modal add', this.list)
  }

  pesquisar(lates:string){
    // console.log('cod lates', )
    this.loadXML(this.form.controls['codLates'].value)
  }

  createForm() {
    this.form = this.fb.group({
      codLates: [''],
      nome: [this.list !== null? this.list.nome :""],
    });

  }

  loadXML(codigo:any){
    // this.http.get(`../../../assets/Curriculos_XML/${codigo}.xml`,
    this.http.get(`../../../assets/Curriculos_XML/${codigo}.xml`,
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
          // console.log('data', data)
          this.parseXML(data)
            .then((data) => {
              // console.log('data', data)
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




  parseXML(data:any) {
    let pesquisas: any = []
    return new Promise(resolve => {
      var k: string | number,
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true,
          });
      parser.parseString(data, function (err:any, result:any) {
        // console.log('result', result)
        // console.log('err', err)

        //Carga de artigos
        let artigos = null
        if(result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA']){

          if(result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0]['ARTIGOS-PUBLICADOS']){
            artigos = result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0]['ARTIGOS-PUBLICADOS'][0]['ARTIGO-PUBLICADO']
          }
          if(artigos != undefined){
            if (!Array.isArray(artigos)) artigos = [artigos]
            for (let i = 0; i < artigos.length; i++) {
                let novoArtigo = {
                    "tipo": "Artigo Publicado",
                    "nome": artigos[i]['DADOS-BASICOS-DO-ARTIGO'][0]['$']['TITULO-DO-ARTIGO'],
                    "ano": parseInt(artigos[i]['DADOS-BASICOS-DO-ARTIGO'][0]['$']['ANO-DO-ARTIGO']),
                    "periodico": artigos[i]['DETALHAMENTO-DO-ARTIGO'][0]['$']['TITULO-DO-PERIODICO-OU-REVISTA'],
                    "volume": parseInt(artigos[i]['DETALHAMENTO-DO-ARTIGO'][0]['$']['VOLUME']),
                    "paginaInicial": parseInt(artigos[i]['DETALHAMENTO-DO-ARTIGO'][0]['$']['PAGINA-INICIAL']),
                    "paginaFinal": parseInt(artigos[i]['DETALHAMENTO-DO-ARTIGO'][0]['$']['PAGINA-FINAL']),
                    "pesquisadores":[result['CURRICULO-VITAE']['$']['NUMERO-IDENTIFICADOR']]
                }

                pesquisas.push(novoArtigo)
            }
          }

          //Carga de livros
          let livros = null;
          let capitulos = null;
          if(result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0]['LIVROS-E-CAPITULOS']){
            livros = result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0]['LIVROS-E-CAPITULOS'][0]['LIVROS-PUBLICADOS-OU-ORGANIZADOS'];

            if(result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0]['LIVROS-E-CAPITULOS'][0]['CAPITULOS-DE-LIVROS-PUBLICADOS'])
              capitulos = result['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA'][0]['LIVROS-E-CAPITULOS'][0]['CAPITULOS-DE-LIVROS-PUBLICADOS'][0]['CAPITULO-DE-LIVRO-PUBLICADO']
          }
          if(livros != undefined){
              if (!Array.isArray(livros)) livros = [livros]
              for (let i = 0; i < livros.length; i++) {
                  let novoLivro = {
                      "tipo": "Livro Publicado",
                      "nome": livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO'][0]['DADOS-BASICOS-DO-LIVRO'][0]['$']['TITULO-DO-LIVRO'],
                      "ano": parseInt(livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO'][0]['DADOS-BASICOS-DO-LIVRO'][0]['$']['ANO']),
                      "periodico": livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO'][0]['DETALHAMENTO-DO-LIVRO'][0]['$']['NOME-DA-EDITORA'],
                      "volume": null,
                      "paginaInicial": 0,
                      "paginaFinal": parseInt(livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO'][0]['DETALHAMENTO-DO-LIVRO'][0]['$']['NUMERO-DE-PAGINAS']),
                      "pesquisadores":[result['CURRICULO-VITAE']['$']['NUMERO-IDENTIFICADOR']]
                  }

                  pesquisas.push(novoLivro)
              }
          }

          //Carga de capítulos

          if(capitulos != undefined){
              if (!Array.isArray(capitulos)) capitulos = [capitulos]
              for (let i = 0; i < capitulos.length; i++) {
                  let novoCapitulo = {
                      "tipo": "Capítulo de Livro",
                      "nome": capitulos[i]['DADOS-BASICOS-DO-CAPITULO'][0]['$']['TITULO-DO-CAPITULO-DO-LIVRO'],
                      "ano": parseInt(capitulos[i]['DADOS-BASICOS-DO-CAPITULO'][0]['$']['ANO']),
                      "periodico": capitulos[i]['DETALHAMENTO-DO-CAPITULO'][0]['$']['TITULO-DO-LIVRO'],
                      "volume": parseInt(capitulos[i]['DETALHAMENTO-DO-CAPITULO'][0]['$']['NUMERO-DE-VOLUMES']),
                      "paginaInicial": parseInt(capitulos[i]['DETALHAMENTO-DO-CAPITULO'][0]['$']['PAGINA-INICIAL']),
                      "paginaFinal": parseInt(capitulos[i]['DETALHAMENTO-DO-CAPITULO'][0]['$']['PAGINA-FINAL']),
                      "pesquisadores":[result['CURRICULO-VITAE']['$']['NUMERO-IDENTIFICADOR']]
                  }

                  pesquisas.push(novoCapitulo)
              }
          }
        }

        let resutado = {
          lates:result['CURRICULO-VITAE']['$']['NUMERO-IDENTIFICADOR'],
          nome:result['CURRICULO-VITAE']['DADOS-GERAIS'][0]['$']['NOME-COMPLETO'],
          pesquisas:pesquisas
        }

        // //console.log('artigos', pesquisas)
        // sessionStorage.setItem('pesquisas',JSON.stringify(resutado.pesquisas))
        resolve(resutado)
        // this.pesquisador = resutado;
      });
    });
  }

  filtrar(termo:string){
    // //console.log('termo', termo == ' ')
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
    // //console.log('intituto nome', this.institutosFiltrados)
    this.institutosFiltrados.length == 0
    ?this.itemSelecionado = "Instituto não encontrado"
    :this.itemSelecionado = this.institutosFiltrados[0].nome
  }

  changeSelect(event:any){
    this.itemSelecionado = event.target.value;
    console.log('evento', this.itemSelecionado)
  }

  closeModal(){
    this.close.emit(false);
  }

  confirmacao(){
    // console.log('institutos', this.institutos)
    let institutoSelecionado = this.institutos.filter(instituto => {
      return instituto?.id?.toString() == this.itemSelecionado
    })
    //console.log('insti', institutoSelecionado)
    let item = [this.xmlItems, institutoSelecionado[0]]
    if(this.list !== null){
      let itemEdicao = {
        id: this.list.id,
        lattes: this.list.identificador_lattes,
        instituto:institutoSelecionado,
        nome: this.form.controls['nome'].value
      }
      this.editar.emit(itemEdicao)
      // console.log('list', itemEdicao)
    }else{
      this.positivo.emit(item)
    }
  }


}

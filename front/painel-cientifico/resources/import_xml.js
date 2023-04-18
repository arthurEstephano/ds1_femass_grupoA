const { XMLParser, XMLValidator } = require("fast-xml-parser")
// const fs = require("fs")
const fs = require("file-system")

function pegarInfoPesquisador(codigo) {

    const path = `outros\\Curriculos_XML\\${codigo}.xml`
    let data

    if (fs.existsSync(path)) {
        try {
            data = fs.readFileSync(path, 'latin1')
        } catch (err) {
            data = err
            return data
        }
    }

    const options = {
        ignoreAttributes: false,
        attrNodeName: "attr",
        attrNamePrefix: "@_",
        trimValures: true
    }

    const parser = new XMLParser(options)
    let jsonObj = parser.parse(data)

    let pesquisas = []

    //Carga de artigos
    let artigos = jsonObj['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA']['ARTIGOS-PUBLICADOS']['ARTIGO-PUBLICADO']
    if(artigos != undefined){
        if (!Array.isArray(artigos)) artigos = [artigos]
        for (let i = 0; i < artigos.length; i++) {
            let novoArtigo = {
                "tipo": "Artigo Publicado",
                "nome": artigos[i]['DADOS-BASICOS-DO-ARTIGO']['@_TITULO-DO-ARTIGO'],
                "ano": parseInt(artigos[i]['DADOS-BASICOS-DO-ARTIGO']['@_ANO-DO-ARTIGO']),
                "periodico": artigos[i]['DETALHAMENTO-DO-ARTIGO']['@_TITULO-DO-PERIODICO-OU-REVISTA'],
                "volume": parseInt(artigos[i]['DETALHAMENTO-DO-ARTIGO']['@_VOLUME']),
                "paginaInicial": parseInt(artigos[i]['DETALHAMENTO-DO-ARTIGO']['@_PAGINA-INICIAL']),
                "paginaFinal": parseInt(artigos[i]['DETALHAMENTO-DO-ARTIGO']['@_PAGINA-FINAL'])
            }
    
            pesquisas.push(novoArtigo)
        }
    }

    //Carga de livros
    let livros = jsonObj['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA']['LIVROS-E-CAPITULOS']['LIVROS-PUBLICADOS-OU-ORGANIZADOS']
    if(livros != undefined){
        if (!Array.isArray(livros)) livros = [livros]
        for (let i = 0; i < livros.length; i++) {
            let novoLivro = {
                "tipo": "Livro Publicado",
                "nome": livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO']['DADOS-BASICOS-DO-LIVRO']['@_TITULO-DO-LIVRO'],
                "ano": parseInt(livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO']['DADOS-BASICOS-DO-LIVRO']['@_ANO']),
                "periodico": livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO']['DETALHAMENTO-DO-LIVRO']['@_NOME-DA-EDITORA'],
                "volume": null,
                "paginaInicial": 0,
                "paginaFinal": parseInt(livros[i]['LIVRO-PUBLICADO-OU-ORGANIZADO']['DETALHAMENTO-DO-LIVRO']['@_NUMERO-DE-PAGINAS'])
            }
    
            pesquisas.push(novoLivro)
        }
    }

    //Carga de capítulos
    let capitulos = jsonObj['CURRICULO-VITAE']['PRODUCAO-BIBLIOGRAFICA']['LIVROS-E-CAPITULOS']['CAPITULOS-DE-LIVROS-PUBLICADOS']['CAPITULO-DE-LIVRO-PUBLICADO']
    if(capitulos != undefined){
        if (!Array.isArray(capitulos)) capitulos = [capitulos]
        for (let i = 0; i < capitulos.length; i++) {
            let novoCapitulo = {
                "tipo": "Capítulo de Livro",
                "nome": capitulos[i]['DADOS-BASICOS-DO-CAPITULO']['@_TITULO-DO-CAPITULO-DO-LIVRO'],
                "ano": parseInt(capitulos[i]['DADOS-BASICOS-DO-CAPITULO']['@_ANO']),
                "periodico": capitulos[i]['DETALHAMENTO-DO-CAPITULO']['@_TITULO-DO-LIVRO'],
                "volume": parseInt(capitulos[i]['DETALHAMENTO-DO-CAPITULO']['@_NUMERO-DE-VOLUMES']),
                "paginaInicial": parseInt(capitulos[i]['DETALHAMENTO-DO-CAPITULO']['@_PAGINA-INICIAL']),
                "paginaFinal": parseInt(capitulos[i]['DETALHAMENTO-DO-CAPITULO']['@_PAGINA-FINAL'])
            }
    
            pesquisas.push(novoCapitulo)
        }
    }

    let pesquisador = {
        "identificador_lattes": jsonObj['CURRICULO-VITAE']['@_NUMERO-IDENTIFICADOR'],
        "nome": jsonObj['CURRICULO-VITAE']['DADOS-GERAIS']['@_NOME-COMPLETO'],
        "pesquisas": pesquisas
    }

    console.log(pesquisador)

    return pesquisador
}

pegarInfoPesquisador('0348923590713594')

//module.exports = { pegarInfoPesquisador }

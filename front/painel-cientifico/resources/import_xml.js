const { XMLParser, XMLValidator } = require("fast-xml-parser")
const fs = require("fs")

function pegarInfoPesquisador(codigo){

    const path = `outros\\Curriculos_XML\\${codigo}.xml`
    let data

    if(fs.existsSync(path)){
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

    let pesquisador = {
        "identificador_lattes": jsonObj['CURRICULO-VITAE']['@_NUMERO-IDENTIFICADOR'],
        "nome": jsonObj['CURRICULO-VITAE']['DADOS-GERAIS']['@_NOME-COMPLETO']
    }

    return pesquisador
}

module.exports = { pegarInfoPesquisador }
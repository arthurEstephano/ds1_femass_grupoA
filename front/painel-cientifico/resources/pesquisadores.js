const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

const pastaPesquisadores = '../../../../outros/Curriculos_XML'; // Substitua pelo caminho da sua pasta de pesquisadores

const lerInfoTodosPesquisadores = () => {
	let pesquisador;
	let pesquisas;
    fs.readdirSync(pastaPesquisadores).forEach(arquivo => {
        // Verifica se o arquivo é um arquivo XML
        if (path.extname(arquivo) === '.xml') {
            // Lê o conteúdo do arquivo
            const xml = fs.readFileSync(path.join(pastaPesquisadores, arquivo), 'utf-8');

            // Parseia o XML para um objeto JavaScript
            xml2js.parseString(xml, (err, result) => {
                if (err) {
                    console.error('Erro ao parsear o arquivo XML:', err);
                    return;
                }

                const pesquisadores = result.PESQUISADORES.PESQUISADOR;

                // Itera sobre os pesquisadores e extrai as informações
                pesquisadores.forEach(pesquisador => {
                    const codigo = pesquisador['@_CODIGO'];
                    const nome = pesquisador.NOME[0];
                    const artigos = pesquisador.ARTIGOS[0].ARTIGO;

                    //console.log('Código do pesquisador:', codigo);
                    //console.log('Nome do pesquisador:', nome);
                    //console.log('Artigos publicados:');

                    // Itera sobre os artigos do pesquisador
                    artigos.forEach(artigo => {
                        const titulo = artigo.TITULO[0];
                        const ano = parseInt(artigo['@_ANO']);
                        const conferencia = artigo.CONFERENCIA[0];
                        const paginaInicial = parseInt(artigo['@_PAGINA-INICIAL']);
                        const paginaFinal = parseInt(artigo['@_PAGINA-FINAL']);

                        //console.log('Título:', titulo);
                        //console.log('Ano:', ano);
                        //console.log('Conferência:', conferencia);
                        //console.log('Página Inicial:', paginaInicial);
                        //console.log('Página Final:', paginaFinal);
                        //console.log('---');
                    });
                });
            });
        }
    });

};

// Chamada da função
lerInfoTodosPesquisadores();

const args = new URLSearchParams(window.location.search);
const idEstacao = args.get('idEstacao');

getEstacao(idEstacao)
.then((estacao) => {
    console.log(estacao);
    document.title = estacao.nome;
    document.getElementById("estacao_nome").innerText = estacao.nome;
    document.getElementById("estacao_localizacao").innerText = estacao.localizacao;
});

getUltimasLeituras(idEstacao, 10)
.then((leituras) => {
    console.log(leituras);
    let tabela = document.getElementById("ultimas_leituras");
    tabela.innerHTML += 
        leituras.leituras
        .map((leitura) => {
            return `
                    <tr>
                        <td>${leitura.id}</td>
                        <td>${leitura.umidade_ar}</td>
                        <td>${leitura.temperatura}</td>
                        <td>${leitura.umidade_solo}</td>
                        <td>${leitura.pluv_indice}</td>
                        <td>${leitura.horario}</td>
                    </tr>
                `;
            })
        .join("");
});

let idUltimaMsg = 0;
async function atualizarCliLog(nMinMsgCount = 1, nMaxTentativas = 30) {

    const txtArea = document.getElementById("cli_log");
    
    for (let i = 0, nTentativas = 0; 
        i < nMinMsgCount && nTentativas < nMaxTentativas;
        nTentativas++) {
    
        const tp1 = performance.now();
    
        let json = await getCliLog(idEstacao, idUltimaMsg);
    
        if (json.mensagens.length > 0) {
            
            txtArea.value += json.mensagens.map((el) => el.msg).join("\n") + "\n";
            txtArea.scrollTop = txtArea.scrollHeight;
            
            idUltimaMsg = json.mensagens.at(-1).id;
            i += json.mensagens.length;
            nTentativas = -1;
        }
        else if (json.erros.length !== 0) {
    
            txtArea.value = json.erros.join(";\n");
            break;
        }
    
        const tp2 = performance.now();

        const periodoAtualizacaoMs = 500 + 200 * nTentativas;
        await new Promise((r) => setTimeout(r, max(0, periodoAtualizacaoMs - (tp2 - tp1))));
    }
}
atualizarCliLog();

function onBtnEnviarComando() {
    const tfComando = document.getElementById("comando");
    addCliEntrada(idEstacao, tfComando.value);
    tfComando.value = "";
    //esperar pelo menos duas mensagens: o comando enviado e a resposta do esp
    atualizarCliLog(2, 5);
}

function max(a, b) {
    return a > b ? a : b;
}
const args = new URLSearchParams(window.location.search);
const idEstacao = args.get('idEstacao');

getEstacao(idEstacao)
    .then((estacao) => {
        console.log(estacao);
        document.title = estacao.nome;
        document.getElementById("estacao_nome").innerText = estacao.nome;
        document.getElementById("estacao_localizacao").innerText = estacao.localizacao;

        getUltimasLeituras(idEstacao, 10).then((leituras) => {
            console.log(leituras);
            let tabela = document.getElementById("ultimas_leituras");
            tabela.innerHTML += leituras.leituras
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
    })
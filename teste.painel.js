function onBtnAdicionarEstacao() {
  let id_estacao = document.getElementById("add_estacao_id").value;
  addEstacao(id_estacao).then(() => updateEstacoes());
}
function onBtnCriarEstacao() {
  let nome = document.getElementById("criar_estacao_nome").value;
  let localizacao = document.getElementById("criar_estacao_localizacao").value;
  criarEstacao(nome, localizacao).then(() => updateEstacoes());
}
function updateEstacoes() {
  getEstacoes(5).then((json) => {
    let tabela = document.getElementById("estacoes");
    tabela.innerHTML = json.estacoes.map((estacao) => {
      return `
        <a href="teste.estacao.html?idEstacao=${encodeURIComponent(estacao.id)}">
          <li>
            ID: ${estacao.id}; 
            Nome: ${estacao.nome}; 
            Localização: ${estacao.localizacao}
          </li>
        </a>
        `;
    });
  });
}
updateEstacoes();



//Retorna uma lista de erros. Caso vazia, o login foi um sucesso.
//{erro: string}[]
function entrar(username, password, criar = false) {
  return fetch(`php/webApi/${criar ? "signup.php" : "login.php"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`,
  }).then((response) => response.json());
}

/*
  {
    id: number, 
    id_estacao: string, 
    umidade_ar: number, 
    temperatura: number, 
    umidade_solo: number, 
    pluv_indice: number, 
    horario: string(H:i:s d-m-y)
  }[]
*/
function getUltimasLeituras(id_estacao, limite = 1) {
  return fetch(
    `php/webApi/get_ultimas_leituras.php?limite=${encodeURIComponent(
      limite.toString()
    )}&id_estacao=${encodeURIComponent(id_estacao)}`
  ).then((response) => response.json());
}

//estacoes: {id: string, nome: string, localizacao: string}[]
function getEstacoes(limite = 10) {
  return fetch(
    `php/webApi/get_estacoes.php?limite=${encodeURIComponent(
      limite.toString()
    )}`
  ).then((response) => response.json());
}

//retorna a estação adicionada
//{erros: string[], id: string, nome: string, localizacao: string}
function getEstacao(id_estacao) {
  return fetch(
    `php/webApi/get_estacao.php/?id_estacao=${encodeURIComponent(id_estacao)}`
  ).then((response) => response.json());
}

//retorna a estação adicionada
//{erros: string[], id: string, nome: string, localizacao: string}
function addEstacao(id_estacao) {
  return fetch(
    `php/webApi/add_estacao.php/?id_estacao=${encodeURIComponent(id_estacao)}`
  ).then((response) => response.json());
}


//retorna a estação adicionada
//{erros: string[], id: string, nome: string, localizacao: string}
function criarEstacao(nome, localizacao) {
  return fetch(
    `php/webApi/criar_estacao.php/?nome=${encodeURIComponent(nome)}&localizacao=${encodeURIComponent(localizacao)}`
  ).then((response) => response.json());
}
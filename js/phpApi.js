
function entrar(criar = false) {
  let tfUsername = document.getElementById("username");
  let pfPassword = document.getElementById("password");

  fetch(`php/webApi/${criar ? "signup.php" : "login.php"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${tfUsername.value}&password=${pfPassword.value}`,
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.erros.length == 0) {
        window.location.replace("painel.html");
      } else {
        //limpar senha
        pfPassword.value = "";

        //listar erros
        document.getElementById("erros").innerHTML = json.erros
          .map((erro) => `<li>${erro}</li>`)
          .join("");
      }
    });
}

function get_user_id() {}

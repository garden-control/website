import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getDatabase, update, onValue, ref } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyCPDc7vDgHwq4ELUj8285P0l3FmmDy8sNY",
    authDomain: "gardening-control.firebaseapp.com",
    projectId: "gardening-control",
    storageBucket: "gardening-control.appspot.com",
    messagingSenderId: "477980400673",
    appId: "1:477980400673:web:c07c2affcd94170e59d760",
    databaseURL: "https://gardening-control-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
let dbCaminhoEstacao = null;

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user != null)
    {
        const urlParams = new URLSearchParams(window.location.search);
        const idEstacao = urlParams.get("idEstacao");
        dbCaminhoEstacao = `usuarios/${user.uid}/estacoes/${idEstacao}`;

        onValue(ref(db, dbCaminhoEstacao + "/variaveis/controlador/bomba"), (snapshot) => {
            const bombaLigada = snapshot.val();
            document.getElementById("ligarBtn").disabled = bombaLigada;
            document.getElementById("desligarBtn").disabled = !bombaLigada;
        });

        onValue(ref(db, dbCaminhoEstacao + "/variaveis/controlador/ativo"), (snapshot) => {
            document.getElementById("toggleUmidadeBtn").innerText = 
                snapshot.val() 
                    ? "Pausar Controle de Umidade"
                    : "Iniciar Controle de Umidade"
        });

        onValue(ref(db, dbCaminhoEstacao + "/variaveis/controlador/umidade_max"), (snapshot) => {
            document.getElementById("umidadeMaxima").value = snapshot.val();
        });


        onValue(ref(db, dbCaminhoEstacao + "/variaveis/controlador/umidade_min"), (snapshot) => {
            document.getElementById("umidadeMinima").value = snapshot.val();
        });

        onValue(ref(db, dbCaminhoEstacao + "/variaveis/leituras/intervalo_s"), (snapshot) => {
            document.getElementById("inputNumberIntervaloLeituras").value = snapshot.val();
        });
    }
    else
    {
        window.location.href = "login.html";
    }
});

document.getElementById("ligarBtn").addEventListener("click", () => {
    const updates = {};
    updates["variaveis/controlador/bomba"] = true;
    update(ref(db, dbCaminhoEstacao), updates)
    .then(() => console.log("Bomba ligada"))
    .catch(erro => console.error("Erro ao ligar a bomba: " + erro));
});

document.getElementById("desligarBtn").addEventListener("click", () => {
    const updates = {};
    updates["variaveis/controlador/bomba"] = false;
    update(ref(db, dbCaminhoEstacao), updates)
    .then(() => console.log("Bomba desligada"))
    .catch(erro => console.error("Erro ao desligar a bomba: " + erro));
});

document.getElementById('toggleUmidadeBtn').addEventListener('click', function() {
    let btn = this;
    if (dbCaminhoEstacao !== null)
    {
        const updates = {};
        updates["variaveis/controlador/ativo"] = (btn.textContent === 'Iniciar Controle de Umidade');
        update(ref(db, dbCaminhoEstacao), updates)
        .then(() => console.log("Controlador ligado/desligado com sucesso"))
        .catch(erro => console.error("Falha ao salvar: " + erro))
    }
});

document.getElementById('configuracaoUmidadeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let umidadeMinima = Number(document.getElementById('umidadeMinima').value);
    let umidadeMaxima = Number(document.getElementById('umidadeMaxima').value);

    // Código para salvar a configuração de umidade
    const updates = {};

    updates["variaveis/controlador/umidade_min"] = umidadeMinima;
    updates["variaveis/controlador/umidade_max"] = umidadeMaxima;

    update(ref(db, dbCaminhoEstacao), updates)
    .then(() => alert(`Configurações salvas com sucesso!\nUmidade Mínima: ${umidadeMinima}, Umidade Máxima: ${umidadeMaxima}`))
    .catch(erro => alert("Erro ao salvar: " + erro))

});

document.getElementById("configuracaoIntervaloLeituras").addEventListener("submit", (event) => {
    event.preventDefault();
    const intervalo = Number(document.getElementById("inputNumberIntervaloLeituras").value);

    const updates = {};
    updates["/variaveis/leituras/intervalo_s"] = intervalo;
    update(ref(db, dbCaminhoEstacao), updates)
    .then(() => alert(`Configurações salvas com sucesso!\nIntervalo: ${intervalo} segundos`))
    .catch(erro => alert("Erro ao salvar: " + erro));
})

/* indisponivel
document.getElementById('configuracaoHorarioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let horarioPermitido = document.getElementById('horarioPermitido').value;
    let horarioNaoPermitido = document.getElementById('horarioNaoPermitido').value;
    // Código para salvar a configuração de horários
    alert(`Horário Permitido: ${horarioPermitido}, Horário Não Permitido: ${horarioNaoPermitido}`);
});

document.getElementById('executarComandoBtn').addEventListener('click', function() {
    let comando = document.getElementById('comandoInterface').value;
    // Código para executar o comando
    alert(`Comando executado: ${comando}`);
});
*/
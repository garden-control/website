import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

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

import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
const auth = getAuth(app);

import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        console.log(user.uid);
        const db = getDatabase(app);
        const dbRef = ref(db);

        //pegar nome de usuario
        get(child(dbRef, `usuarios/${user.uid}`))
        .then((snapshot) => {
            console.log(snapshot.val());
            document.getElementById("ola").innerText = "Bem vindo, " + snapshot.val().nome;
        })
        .catch((error) => {
            console.error(error);
        })

        //listar estacoes
        get(child(dbRef, `usuarios/${user.uid}/estacoes`))
        .then((snapshot) => {
            console.log(snapshot.val());

            document.getElementById("lsEstacoes").innerHTML = snapshot.val().map((estacao, idx) => {
                return `
                    <a href="estacao_grafico.html?idEstacao=${idx}">
                        <li class="li-estacao">
                            <div class="li-estacao-infos">
                                <h3>${estacao.nome}</h3>
                                <h4>${estacao.localizacao}</h4>
                            </div>
                            <h2>=></h2>
                        </li>
                    </a>
                `;
            }).join("");

        })
        .catch((error) => console.log(error))
    }
    else {
        window.location.href = "login.html";
    }
});

document.getElementById("btnLogout").addEventListener("click", () => {
    signOut(auth)
        .catch((error) => {
            console.log(error);
        })
})
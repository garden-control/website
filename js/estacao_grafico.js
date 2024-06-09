import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
import { getDatabase, query, onValue, ref, limitToLast } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'

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

const auth = getAuth(app);


const urlParams = new URLSearchParams(window.location.search);
const idEstacao = urlParams.get("idEstacao");

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        const db = getDatabase(app);

        onValue(query(ref(db, `usuarios/${user.uid}/estacoes/${idEstacao}/leituras`), limitToLast(5)), (snapshot) => {
            console.log(Object.entries(snapshot.val()));
            document.getElementById("tbLeituras").innerHTML =
                `<tr>
                    <th>ID</th>
                    <th>Temperatura (°C)</th>
                    <th>Umidade do Ar (%)</th>
                    <th>Umidade do Solo (%)</th>
                    <th>Índice pluviométrico (mm)</th>
                </tr>` +
                Object.entries(snapshot.val()).map((leitura) => {
                    return `
                    <tr>
                        <td>${leitura[1].count}</td>
                        <td>${leitura[1].temperatura}</td>
                        <td>${leitura[1].umidade_ar}</td>
                        <td>${leitura[1].umidade_solo}</td>
                        <td>${leitura[1].pluviometro}</td>
                    </tr>
                    `;
                }).join("");
        }, {
            onlyOnce: false
        });

        onValue(ref(db, `usuarios/${user.uid}/estacoes/${idEstacao}/variaveis/reserv_nivel`), (snapshot) => {
            const nivel = snapshot.val() / 4 * 100;
            document.getElementById("labelProgReservatorio").innerText = `Reservatório (${nivel}%)`;
            document.getElementById("progReservatorio").value = nivel;
        })
    }
    else {
        window.location.href = "login.html"
    }
})
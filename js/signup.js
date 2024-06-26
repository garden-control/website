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


import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
const auth = getAuth(app);

import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'

document.getElementById("btnCriar").addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user.uid);

            const db = getDatabase(app);
            set(ref(db, `usuarios/${user.uid}`), {
                nome: username,
                estacoes: [
                    {
                        leituras: [
                            {
                                pluviometro: 0,
                                temperatura: 0,
                                umidade_ar: 0,
                                umidade_solo: 0
                            }
                        ],
                        status: {
                            ctrl: false,
                            bomba: false,
                            reserv: 0,
                            ram: 0
                        },
                        localizacao: "Bragança Pta",
                        nome: "Estação 1"
                    }
                ]
            });
            set(ref(db, `usuarios/${user.uid}/estacoes/0/usuarios/${user.uid}`), {
                cli: {
                    cmd: "",
                    log: [
                        "> comando",
                        "resposta"
                    ]
                },
                permissao: 2
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
        });

})

onAuthStateChanged(auth, (user) => {
    if (user != null) {
        window.location.href = "painel.html";
    }
})
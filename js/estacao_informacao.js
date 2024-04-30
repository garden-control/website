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

import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user != null)
    {
        const urlParams = new URLSearchParams(window.location.search);
        const idEstacao = urlParams.get("idEstacao");
        document.getElementById("idEstacao").innerText = `${user.uid}/estacoes/${idEstacao}`;
    }
    else
    {
        window.location.href = "login.html";
    }
})
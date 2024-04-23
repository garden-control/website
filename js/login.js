import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

const firebaseConfig = {

    apiKey: "AIzaSyCPDc7vDgHwq4ELUj8285P0l3FmmDy8sNY",

    authDomain: "gardening-control.firebaseapp.com",

    projectId: "gardening-control",

    storageBucket: "gardening-control.appspot.com",

    messagingSenderId: "477980400673",

    appId: "1:477980400673:web:c07c2affcd94170e59d760"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

const auth = getAuth(app);

document.getElementById("btnEntrar").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });

})
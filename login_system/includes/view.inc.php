<?php

declare(strict_types=1);

function signup_inputs() {
    //echo username input
    if (isset($_SESSION["signup_data"]) &&
        !isset($_SESSION["signup_errors"]["username_taken"])) {
        echo '<input type="text" name="username" placeholder="Nome de Usuário" value="'.$_SESSION["signup_data"]["username"].'"/>';
    }
    else {
        echo '<input type="text" name="username" placeholder="Nome de Usuário"/>';
    }

    //echo password input
    echo '<input type="password" name="password" placeholder="Senha"/>';
}

function signup_errors() {
    if (isset($_SESSION["signup_errors"])) {
        $errors = $_SESSION["signup_errors"];

        echo '<br>';

        foreach ($errors as $error) {
            echo '<p class="form-error">'.$error.'</p>';
        }

        unset($_SESSION["signup_errors"]);
    }
}

function login_inputs() {
    //echo username input
    if (isset($_SESSION["login_data"]) &&
        !isset($_SESSION["login_errors"]["username_nonexistent"])) {
        echo '<input type="text" name="username" placeholder="Nome de Usuário" value="'.$_SESSION["login_data"]["username"].'"/>';
    }
    else {
        echo '<input type="text" name="username" placeholder="Nome de Usuário"/>';
    }

    //echo password input
    echo '<input type="password" name="password" placeholder="Senha"/>';
}

function login_errors() {
    if (isset($_SESSION["login_errors"])) {
        $errors = $_SESSION["login_errors"];

        echo '<br>';

        foreach ($errors as $error) {
            echo '<p class="form-error">'.$error.'</p>';
        }

        unset($_SESSION["login_errors"]);
    }
}
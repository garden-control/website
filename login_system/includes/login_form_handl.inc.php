<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $username = $_POST["username"];
    $password = $_POST["password"];

    $login_data = [
        "username" => $username,
        "password" => $password
    ];
    $_SESSION["login_data"] = $login_data;

    require_once "../../includes/dbh.inc.php";
    require_once "model.inc.php";
    require_once "ctrl.inc.php";
    
    $errors = [];
    
    $control = new Control($conn, $username, $password);

    if ($control->is_input_empty()) {
        $errors["empty_input"] = "Preencha todos os campos";
    }
    if ($control->is_username_nonexistent()) {
        $errors["username_nonexistent"] = "Usuário não existe";
    }
    else if ($control->is_password_incorret()) {
        $errors["incorret_password"] = "Senha incorreta";
    }


    if ($errors) {
        $_SESSION["login_errors"] = $errors;
        header("Location: ../login.php");
        die();
    }

    $control->login_user();

    unset($_SESSION["login_data"]);

    header("Location: ../../dashboard/dashboard.php");

    $conn = null;
    
    die();
}
?>
<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_start();
    $username = $_POST["username"];
    $password = $_POST["password"];

    $signup_data = [
        "username" => $username,
        "password" => $password
    ];
    $_SESSION["signup_data"] = $signup_data;

    require_once "../../includes/dbh.inc.php";
    require_once "model.inc.php";
    require_once "ctrl.inc.php";
    
    $errors = [];
    
    $control = new Control($conn, $username, $password);

    if ($control->is_input_empty()) {
        $errors["empty_input"] = "Preencha todos os campos";
    }
    if ($control->is_username_taken()) {
        $errors["username_taken"] = "Usuário já cadastrado";
    }
    if ($control->is_password_invalid()) {
        $errors["invalid_password"] = "A senha deve ter no mínimo " . $control->min_password_len() . " caracteres";
    }


    if ($errors) {
        $_SESSION["signup_errors"] = $errors;
        header("Location: ../signup.php");
        die();
    }

    $control->create_user();
    $control->login_user();

    unset($_SESSION["signup_data"]);

    header("Location: ../../dashboard/dashboard.php");

    $conn = null;
    
    die();
}
?>
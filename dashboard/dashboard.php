<?php
    require "../includes/environments.inc.php";
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Dashboard</h1>
    <hr>
    <span>O ID do usuário é <?php echo $_SESSION[SESSION_KEY_USER_ID] ?></span>
</body>
</html>
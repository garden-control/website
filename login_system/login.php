
<?php
  session_start();
  require_once "includes/view.inc.php";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login</title>

    <link rel="stylesheet" href="../style.css" />

  </head>
  <body>
    <div class="container">
      <form action="includes/login_form_handl.inc.php" method="post">
        <h1>Login</h1>
        <?php login_inputs() ?>
        <button type="submit">Entrar</button>
        <span>ou </span><a href="signup.php">crie uma conta</a>
        <?php login_errors() ?>
      </form>
    </div>
  </body>
</html>

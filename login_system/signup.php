
<?php
  session_start();
  require_once "includes/view.inc.php";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup</title>

    <link rel="stylesheet" href="../style.css" />
    
  </head>
  <body>
    <div class="container">
      <form action="includes/signup_form_handl.inc.php" method="post">
        <h1>Signup</h1>
        <?php signup_inputs() ?>
        <button type="submit">Criar</button>
        <span>ou </span>
        <a href="login.php">entre com sua conta</a>
        <?php signup_errors() ?>
      </form>
    </div>
  </body>
</html>

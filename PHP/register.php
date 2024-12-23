<?php
require("start.php");
 //require("ajax_check_user.php");


 if (isset($_SESSION['user']) ) {
  header("Location: friends.php");
  exit();
}

$error = "";
$success = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $username = trim($_POST['username'] ?? '');
  $password = $_POST['password'] ?? '';
  $confirmPassword = $_POST['confirm_password'] ?? '';


  if (empty($username) || strlen($username) < 3) {
      $error = "Username must be at least 3 characters long.";
      
  } elseif ($service->userExists($username)) {
    $error = "Der Benutzername ist bereits vergeben.";
  } elseif (empty($password) || strlen($password) < 8) {
       $error = "Password must be at least 8 characters long.";
      
   } elseif ($password !== $confirmPassword) {
      $error = "Passwords do not match.";
      
   } else {

    $registered = $service->register($username, $password);

       if ($registered) {

        $_SESSION['user'] = $username;
         header("Location: friends.php");
        exit();
    } else {
         $error = "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.";
     }

   }
  }

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="../CSS/style2.css" />
    <link rel="stylesheet" href="../CSS/style.css">
    <title>Registrieren</title>
  </head>
  <body style="background-color: #f8f9fa;">
    <img src="user.png" alt="" width="40px" height="40px" />

  <div class="container d-flex justify-content-center align-items-center" >
  <div class="card shadow p-4" style="width: 350px; border-radius: 8px; margin-top:10px;">

    <h4 class="text-center mb-3">  Register yourself</h4>

    <form id="registerForm" method="POST" action="register.php" onsubmit="return validateForm(event)">
    
    <?php if (!empty($error)): ?>
        <h4 style="color:red; font-size: 15px"><?php echo htmlspecialchars($error); ?></h4>
        <?php endif; ?>
       
        <div class="mb-3" style ="margin-left: 30px !important;  ">
          <input type="text" name="username"  id="regUsername" class="form-control " placeholder="Username" name="username" required style="width:80%"  onkeyup="pruefe(this)">
        </div>
        <div class='valid-feedback'>
            Valid Feedback-Message
        </div>
       

        <div class="mb-3 " style ="margin-left: 30px !important;  ">
          <input type="Password" name="password"  id="regPassword" class="form-control" name="password" placeholder="Password" required style="width:80%"  onkeyup="pruefePassword(this)">
        </div>
 
        <div class="mb-3 " style ="margin-left: 30px !important;  ">
          <input type="Password" name="confirm_password" id="confirmPassword" class="form-control" name="password"  placeholder=" Confirm Password" required style="width:80%" onkeyup="pruefeConfirmPassword(this)">
        </div>


      

        <div class="btn-group  registerBtnGroup " role="group" aria-label="Basic example" >
        <a  href="login.php" class="btn btn-secondary "   >Cancle</a>
        <button type="submit" class="btn btn-primary " >Create Account</button>
 
</div>

    </form>
    </div>
    </div>
   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../JS/register.js"></script>
  </body>
   
</html>

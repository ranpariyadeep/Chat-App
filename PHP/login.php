<?php
require("start.php");
//require("BackendService.php");

if (isset($_SESSION['user'])){
    header("Location: friends.php");
    exit();
}

// Handle POST form submission
$error = ""; // Store error messages
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

  //  Validate input
    if (empty($username) || strlen($username) < 3) {
        $error = "Username must be at least 3 characters.";
    } else if (empty($password)) {
        $error = "Password cannot be empty.";
    } else {
        try {
           // Attempt to login using BackendService
            if ($service->login($username, $password)) {
                $_SESSION['user'] = $username; // Save username in session
                header("Location: friends.php");
                exit();
            } else {
                $error = "Invalid username or password.";
            }
        } catch (Exception $e) {
            $error = "An error occurred: " . $e->getMessage();
        }
    }
}

?> 


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="../CSS/style.css">
    <title>Login</title>
</head>




<body style="background-color: #f8f9fa;">
<img src="chat.png" alt="Loggedout img" width="40px" height="40px"><br>
  <!-- Centered Container -->

  <div class="container d-flex justify-content-center align-items-center" >
  

      <!-- Logo -->
      
      <div class="card shadow p-4" style="width: 350px; border-radius: 8px;">
     
      <!-- Form Section -->
      <h4 class="text-center mb-3">Please sign in</h4>
      <form   method="POST" action="login.php" >
        <!-- Username Input -->

        <?php if (!empty($error)): ?>
        <h4 style="color:red; font-size: 15px; margin:auto;"><?php echo htmlspecialchars($error); ?></h4>
        <?php endif; ?>

        <div class="mb-3" style ="margin-left: 30px !important;  ">
          <input type="text"  id="username" class="form-control" placeholder="Username" name="username" required style="width:80%">
        </div>

        <!-- Password Input -->
        <div class="mb-3 " style ="margin-left: 30px !important;  ">
          <input type="password" id="password" class="form-control" name="password" placeholder="Password" required style="width:80%">
        </div>

        <!-- Buttons -->
        
        <div class="btn-group loginBtnGroup" role="group" aria-label="Basic example" style="margin-left: 32px; width:74%" >
        <a href="register.php" class="btn btn-secondary">Register</a>
        <button type="submit" class="btn btn-primary" style="width:60%">Login</button>
 
</div>
      </form>

    </div>
  </div>

  <!-- Bootstrap JS -->
 

  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
       
</body>
</html>
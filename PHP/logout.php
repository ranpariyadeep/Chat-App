<?php
require("start.php");

session_unset();


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <title>Logout</title>
</head>
<body>
<body style="background-color: #f8f9fa;">
    <img src="logout.png" alt="Loggedout img" width="40px" height="40px"><br>

    <!-- <h1>Logged out...</h1>
    

      <p> See u!</p>
   

  
    <a href="Login.php" id="further_link"> Login again</a> -->

    <div class="container d-flex justify-content-center align-items-center" >
  

      <!-- Logo -->
      
      <div class="card shadow p-4" style="width: 350px; border-radius: 8px;">
     
      <!-- Form Section -->
      <h4 class="text-center mb-3">Logged out...</h4>
      <p class="text-center mb-3"> See u!</p>
        <!-- Username Input -->

        <!-- Buttons -->
        
        <div class="btn-group" role="group" aria-label="Basic example" style="margin-left: 32px; width:74%" >
        <a href="Login.php" class="btn btn-secondary"> Login again</a>
       
</div>
      

    </div>
  </div>

</body>
</html>
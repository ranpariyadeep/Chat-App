<?php
use Model\Friend;

require("start.php");


if(!isset($_SESSION["user"])){
    header("Location: login.php");
    exit();
}

if(isset($_GET["removeFriends"])){
    $service->removeFriend($_GET["removeFriends"]);
    header("Location: friends.php");
    die();
}

if(isset($_POST["friendRequestName"])){

    if($_POST["friendRequestName"] === $_SESSION["user"]){
        echo "User already logged in";
    }
    elseif ($service->userExists($_POST["friendRequestName"])){
        $tfa = array("username" => $_POST["friendRequestName"]);
        echo $service->friendRequest($tfa);
    }
    else{
        echo "User doesn't exist!";
    }
}

if(isset($_GET["accept"])){
    $service->friendAccept($_GET["accept"]);

}

if(isset($_GET["deny"])){
    $service->friendDismiss($_GET["deny"]);
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Latest compiled and minified CSS -->
   
    
   
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="../CSS/style.css">
    <title>Freundsliste</title>
</head>

<body style="background-color: #f8f9fa;" onload = "loadFriends(),onFriendsLoad()">
<div class="container-sm">
<form action="" method="POST">
<div  id="title" >
   <h1   > <caption >Friends</caption></h1>
   </div>
  


<div class="btn-group " id="FriendsBtn" role="group" aria-label="Basic example" >
        <a  href="logout.php" class="btn btn-secondary " id="further_link"  >&#60; Logout</a>
        <a href="settings.php" class="btn btn-secondary "  id="further_link" >Settings</a>
 
</div>


   <hr>

   <ul id="chat_list" class="list-group mb-4">
 
       <!-- <li><a href="chat.php">Tom<span class="count">3</span></a></li>
       <li><a href="chat.php">Marvin<span class="count">1</span></a></li>
       <li><a href="chat.php">Tick</a></li>
       <li><a href="chat.php">Trick</a></li> -->
      
   </ul>
   
   <hr>

   <div id="title">
   
   <ul id="freind_req_accept" >

    <!-- 
   <li>
    <form action="" method="GET">
   <p id="freind_req_list"> 1. Friend request from <span id="ask_p">Track</span> 
   <a href=""><button type="button"  class="but_new_req_1" >Accept</button></a>
  <a href=""><button type="reset"  class="but_new_req_2">Reject</button></a>  </p> 
</form>
</li>
  -->
  
  </ul>
  <!-- <ul id="freind_req_accept" class="list-group">
      <li class="list-group-item">
        <a href="#" onclick="openModal('John Doe')">John Doe</a>
      </li>
    </ul> -->


  </div>
  <div class="modal fade" id="friendRequestModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLabel">Friend Request from <span id="modalFriendName"></span></h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

      </div>
      <div class="modal-body">
        <p id="modalText">Accept freind request?</p>
      </div>
      <div class="modal-footer">
        <form id="modalForm" method="GET" action="">
        <button type="submit" id="denyRequestUser" name="deny" class="btn btn-secondary " >Dismiss</button>

          <button type="submit" name="accept" id="friendRequestUser"  class="btn btn-primary ">Accept</button>

        </form>
      </div>
    </div>
  </div>
</div>




   <hr>
<div id="add_list">
   <!-- <input id="search_enter-text" type="text" placeholder="Add Friend to List" required>
   <button id="but_add" class="but_style">Add</button> -->
   <form action="friends.php" method="post" class="buttonContainer">
   <div class="input-group mb-3">
   <input 
           type = "text"
           placeholder="Add Friend to List" 
             class="form-control "
            name="friendRequestName"
           id="friend-request-name" 
           list="friend-selector"
           aria-label="Add Friend"
           oninput="onFriendInput()"
           style="width:60%"
           aria-describedby="button-addon2">

<datalist id= "friend-selector">




<!-- <option>Tom</option>
<option>Jerry</option> -->    

<!-- weitere Einträge -->

</datalist>

<!-- <input type="button" value="Add" class="friendListAddButton but_style" id="but_add"/> -->
<button type="submit" id="but" class="btn  btn-primary " style=" width: 10%;" >Add</button>
</div>
<!-- <button type=
"button" id="but_add" class="but_style" >Add</button> -->
</form>

</div>
</div>
</form>

  <!-- Latest compiled and minified JavaScript -->
  <script src="../JS/friends.js"> </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


 

 
  <script>
 
        window.sessionStorage.setItem("currentlyLoggedInUser", "<?php echo $_SESSION["user"] ?>");
    </script>


</body>
</html>


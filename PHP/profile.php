<?php
require("start.php");

if (!isset($_SESSION['userObj']) || empty($_SESSION['userObj'])) {
    header("Location: login.php");
    exit(); // Wichtig, um sicherzustellen, dass der Code danach nicht weiter ausgeführt wird
}
// $user = $_SESSION['user'];
$chatPartner = $service->loadUser($_SESSION['chatPartnerName']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/style.css">

    <title>Profile</title>
</head>
<body>

    <div  id="title" >
    <h1>Profile of <?php echo $chatPartner->getUsername() ?> </h1>

<div>
    <a href="chat.php" id="further_link" >&#60; Back to Chat</a> |
    <a href="friends.php?removeFriends=<?= urlencode($chatPartner->getUsername()) ?>" id="back_link">Remove Freind</a><br>
</div>
</div>

 

<div id="maincontaner">
    <div><img src="profile.png" alt="" id="profile_img"></div>



<div id="profile_text" >  



  

    <!-- <p id="ask_p"> Username:  </p>
    <p> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; ?></p>

   <p id="ask_p">Coffee or Tea? </p>

   <p> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp; </p> -->
<p>
   <div id="ask">

   <p id="ask_p"> Username: </p>
   <p> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<?php echo $chatPartner->getUsername() ?> </p>
   <p id="ask_p">Coffee or Tea? </p>
   <p> &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;<?php echo $chatPartner->getFavDrink() ?></p>

          
   </div>
   
   </P>
   

   <p > 
    <dl><?php echo $chatPartner->getDescription() ?></dl>
</p>

</div>



    

</body>
</html>
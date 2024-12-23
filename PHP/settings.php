<?php
require("start.php");

$user = $service->loadUser($_SESSION['userObj']->getUsername());


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/style.css">

    <title>Settings</title>
</head>
<body>
<div  id="title">
    <h1 >Profile Settings</h1>
</div>
    
    <form  action="" method="post">
        <div >
            <fieldset  id="setting_box" >
          <legend> <caption>Base Data</caption></legend>
          <div id="base_data_box">
            <label for="Firstname">First Name</label>
            <input id="Firstname" name="firstName" placeholder="Your name " value=<?php echo $user->getFirstName() ?> > <br>
          </div>
           <div id="base_data_box">
            <label for="lastname">Last Name</label>
            <input id="lastname" placeholder="Your surname" name="lastName" value=<?php echo $user->getLastName() ?> ><br>
           </div>


           <div id="base_data_box">
            <label for="COT"  >Coffe or Tea?</label>
            <select id="COT" name="favDrink" name="COT">Coffe or Tea?
            <option value="Neither nor" <?php if ($user->getFavDrink() == 'Neither nor')echo "selected" ?> >Neither nor</option>
                <option value="Coffe" <?php if ($user->getFavDrink() == 'Coffe')echo "selected" ?> >Coffe</option>
                <option value="Tea"  <?php if ($user->getFavDrink() == 'Tea')echo "selected" ?>>Tea</option>
                
            </select>
           </div>
        </fieldset>
        </div>
       
        <div>
        <fieldset id="setting_box">
       
        <legend><caption>Tell Something About You</caption></legend> 
        <textarea   name="description" id="comment" placeholder="Leave a comment here">
            <?php echo $user->getDescription() ?>
        </textarea>
     
    </fieldset>
</div>

       <div id="layout">
        <fieldset id="setting_box">
      <legend><caption>Pfrefered chat Layout</caption></legend> 

        <input type="radio" name="chatLayout" id="Layout" value="oneLine" <?php if ($user->getChatLayout() == 'oneLine')echo "checked" ?>>
        <label for="Layout" required>Username and message in one line</label><br>

        <input type="radio" name="chatLayout" id="Layout" value="seperatedLines" <?php if ($user->getChatLayout() == 'seperatedLines')echo "checked" ?> >
        <label for="Layout" required >Username and message in separated lines</label>
        </fieldset>
       </div>
        


       <div id="but_con">
      <!-- <a href="friends.php"> <button type="submit" id="but_gray" formaction="friends.php" >Cancle</button></a>
        <button type="submit"  >Save</button> -->
        <input type="submit" formaction="friends.php" value="Cancel"  id="but_gray" class="button grayButton">
            <input type="submit" value="Save" >

    </div>

        </form>
         
        <?php if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if (!empty($_POST['firstName'])) {
            $user->setFirstName($_POST['firstName']);
        }
        if (!empty($_POST['lastName'])) {
            $user->setLastName($_POST['lastName']);
        }
        if (!empty($_POST['description'])) {
            $user->setDescription($_POST['description']);
        }
        if (!empty($_POST['favDrink'])) {
            $user->setFavDrink($_POST['favDrink']);
        }
        if (!empty($_POST['chatLayout'])) {
            $user->setChatLayout($_POST['chatLayout']);
        }
        $service->saveUser($user);
        header("Location: " . $_SERVER['PHP_SELF']); //seite neu laden um neue info anzuzeigen
        exit(); 
    }
    

    ?>
        
    
</body>
</html>
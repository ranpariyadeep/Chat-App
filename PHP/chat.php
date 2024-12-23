<?php
session_start();

require_once 'start.php';

if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
    header("Location: login.php");
    exit();
}

if (isset($_GET['to'])) {
    $to = $_GET['to'];
    $messages = $service->loadMessages($to);

    if (!$messages) {
        $messages = [];
    } else {
        $messages = array_map(function ($msg) {
            return [
                "from" => $msg["from"] ?? $msg["sender"] ?? "Unknown",
                "message" => $msg["message"] ?? $msg["content"] ?? ""
            ];
        }, $messages);
    }

    header('Content-Type: application/json');
    echo json_encode($messages);
    exit();
}

if (!isset($_GET['friend']) || empty($_GET['friend'])) {
    header("Location: friends.php");
    exit();
}

$chatPartner = htmlspecialchars($_GET['friend']);
$_SESSION['chatPartnerName'] = $chatPartner;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../CSS/style.css">
    <title>Chat mit <?= $chatPartner ?></title>
</head>
<body>
<div class="container mt-5">
    <!-- Chat Header -->
    <!-- <div id="title" class="mb-3">
        
        <a href="friends.php" id="chatbtnnew" class="btn btn-secondary" style=" border-radius: 0 !important; margin-right: 0;">&lt; Back</a>
        <a href="profile.php" class="btn btn-secondary">Profil</a>
     
    </div> -->
    <h1 id="chatHeader">Chat mit <?= $chatPartner ?></h1>
    <div class="btn-group " id="FriendsBtn" role="group" aria-label="Basic example" >
 
        <a  href="friends.php" class="btn btn-secondary " id="further_link"  style="color: white !important;" >&lt; Back</a>
        <a href="profile.php" class="btn btn-secondary "  id="further_link" style="color: white !important;"> Show Profil</a>
        <a class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#removeFriendModal">Remove Friend</a>
</div>
    <hr>

    <!-- Chat Messages Box -->
    <div id="box" class="border rounded p-3" style="height: 300px; overflow-y: auto; background-color: #f8f9fa;">
        <!-- Messages will load here dynamically -->
    </div>
    <hr>

    <!-- Send Message Form -->
   
    <form id="sendMessageForm">
        <div id="add_list" class="input-group mb-3">
            <input type="text" id="search_enter-text" name="message" class="form-control" placeholder="New Message" required>
            <button type="button" id="but_send" class="btn btn-primary" style=" width: 10%;" onclick="sendMessages()">Send</button>
        </div>
    </form>

    
   
  

</div>

<!-- Modal for Confirming Friend Removal -->
<div class="modal fade" id="removeFriendModal" tabindex="-1" aria-labelledby="removeFriendModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="removeFriendModalLabel">Remove <strong><?= $chatPartner ?></strong> From Friendslist </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Do you really want to end your <strong><?= $chatPartner ?></strong> friendship?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="width:80px">Cancle</button>
                <a href="friends.php?removeFriends=<?= urlencode($chatPartner) ?>" class="btn btn-primary" style="text-decoration: none;">Yes, Of Course!</a>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script src="../JS/chat.js"></script>
<script>
            const chatPartner = <?= json_encode($chatPartner) ?>;
        </script>
</body>
</html>
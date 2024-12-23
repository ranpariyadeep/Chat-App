<?php
require("start.php");

use Utils\BackendService;

// Service initialisieren
$service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
var_dump($service->test());


// // Test des Logins
echo "<h2>Login-Test</h2>";
if ($service->login("Tom", "12345678")) {
    echo "Login erfolgreich!";
} else {
    echo "Login fehlgeschlagen!";
}

// // Test des Ladens der Benutzer
echo "<h2>Benutzerliste</h2>";
$users = $service->loadUsers();
if ($users) {
    echo "<pre>" . print_r($users, true) . "</pre>";
} else {
    echo "Benutzer konnten nicht geladen werden!";
}

// // Test des Freundeladens
echo "<h2>Freundesliste</h2>";
$friends = $service->loadFriends();
if ($friends) {
    foreach ($friends as $friend) {
        echo "Freund: " . $friend->getUsername() . " - Status: " . $friend->getStatus() . "<br>";
    }
} else {
    echo "Keine Freunde gefunden!";
}

echo "<br>";
var_dump($service->loadUser("Tom"));
var_dump($service->getUnread());
?>


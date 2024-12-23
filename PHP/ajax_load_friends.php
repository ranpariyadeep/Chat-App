 <?php
//require "start.php";

// if (!isset($_SESSION['user'])) {
//     http_response_code(401); // not authorized
//     return;
// }

// Backend aufrufen
// $friends = $service->loadFriends();
// if ($friends) {
//     // erhaltene Friend-Objekte im JSON-Format senden 
//     echo json_encode($friends);
// }
/* http status code setzen
 * - 200 Friends gesendet
 * - 404 Fehler
 */
// http_response_code($friends ? 200 : 404);
 ?> 
<?php
require "start.php";

if (!isset($_SESSION['user'])) {
    http_response_code(401); // Unauthorized
    exit();
}

try {
    // Call the backend service to fetch the friend list
    $friends = $service->loadFriends();
   
    if ($friends) {
        // Send the JSON-encoded friend data
        echo json_encode($friends);
        http_response_code(200);
    } else {
        // No friends found
        http_response_code(404);
    }
} catch (Exception $e) {
    // Handle any exceptions during backend communication
    error_log($e->getMessage());
    http_response_code(500); // Internal Server Error
}
?>

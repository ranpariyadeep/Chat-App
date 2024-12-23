<?php
// Autoload-Funktion für Klassen
spl_autoload_register(function($class) {
    include str_replace('\\', '/', $class) . '.php';
});

// Sitzung starten
session_start();

// Konstanten für den Chat-Server
define('CHAT_SERVER_URL', 'https://online-lectures-cs.thi.de/chat/');
define('CHAT_SERVER_ID', 'd9b941eb-3d65-418d-bc00-e3f73ea0b291'); // Ihre Collection-ID

$service = new Utils\BackendService(CHAT_SERVER_URL, CHAT_SERVER_ID);
?>

<?php
require("../start.php");

// Test der User-Klasse
$user = new Model\User("TestUser");
$json = json_encode($user);
echo "User JSON: " . $json . "<br>";

$newUser = Model\User::fromJson(json_decode($json));
var_dump($newUser);

// Test der Friend-Klasse
$friend = new Model\Friend("FriendUser", "pending");
$friend->accept();
$jsonFriend = json_encode($friend);
echo "Friend JSON: " . $jsonFriend . "<br>";

$newFriend = Model\Friend::fromJson(json_decode($jsonFriend));
var_dump($newFriend);
?>

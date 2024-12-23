<?php
require "start.php";
$allusers = $service->loadUsers();
if($allusers){
	echo json_encode($allusers);
}
http_response_code($allusers ? 200 : 404);

?>
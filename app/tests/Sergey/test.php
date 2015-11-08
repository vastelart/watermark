<?php

if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action']) {
	echo "ПРИВЕТ";
}
else {
	echo "ПОКА";
}

?>
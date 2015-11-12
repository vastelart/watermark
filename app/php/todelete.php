<?php
	if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['todelete'])) {

		$filetodelete = $_POST['todelete'];
		$actionplace = $_POST['actionplace'];

		switch ($actionplace) {
			case 'single':
			    $destroyer = unlink("files/watermarked/" . $filetodelete);
			    break;
			case 'tile':
			    $destroyer = unlink("files/watermarkedtile/" . $filetodelete);
			    break;
			}

		if($destroyer) {
			header ('HTTP/1.1 200 OK');
			echo "IT'S OK. " . $filetodelete . " BEEN REMOVED";
		}
		else {
			header("HTTP/1.0 404 Not Found");
			echo "FILE " .$filetodelete. " NOT FOUND";
		}
	}
	else {
		die('FAIL TO ACCESS');
	}
?>
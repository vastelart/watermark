<?php
	session_start();

	$message = null;

	if(isset($_SESSION['message'])){
	    $message = $_SESSION['message'];
	    echo $message;

	    header('Content-Description: File Transfer');
	    header('Content-Type: application/octet-stream');
	    header('Content-Disposition: attachment; filename='.basename($message));
	    header('Content-Transfer-Encoding: binary');
	    header('Expires: 0');
	    header('Cache-Control: must-revalidate');
	    header('Pragma: public');
	    header('Content-Length: ' . filesize($message));
	    ob_clean();
	    flush();
	    readfile($message);
	    unset($_SESSION['message']);
	    echo 'ЗВЕНИТ ЯНВАРСКАЯ ВЬЮГА';
	    exit;
	}
	else {
		die('NOTHING ELSE MATTERS');
	}

	//----------------------------

	//Всякие тестовые пробники
	//$img = imagecreate(300, 300) or die('FAIL TO CREATE IMAGE');
	//imagecolorallocate($img, 40, 20, 250);
	//imagepng($img, 'try.png');

	//$newimage = 'try.png';

	
?>
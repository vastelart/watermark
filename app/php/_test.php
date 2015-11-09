<?php
	session_start();

	$message = null;
	if(isset($_SESSION['message'])){
	    $message = $_SESSION['message'];
	    echo $message;

	    
	}

	unset($_SESSION['message']);

	//----------------------------

	$img = imagecreate(300, 300) or die('FAIL TO CREATE IMAGE');
	imagecolorallocate($img, 40, 20, 250);
	imagepng($img, 'try.png');

	$newimage = 'try.png';

	header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($newimage));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($newimage));
    ob_clean();
    flush();
    readfile($newimage);
    exit;
?>
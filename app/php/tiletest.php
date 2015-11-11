<?php

if ($_POST['placeaction'] == "tile" && isset($_POST['image']) && isset($_POST['watermark'])) {

	//Определяем папку для загрузки файлов
	$path = "files";
	$pathtosave = "files/watermarkedtile";
	//Если директории нет в дереве, запиливаем немедленно
	if (!file_exists($pathtosave)) {
		mkdir($pathtosave);
	}
	//Вроде файлы есть, плэйсим их в переменные
	$imname = $path.'/'.$_POST['image'];
	$patternname = $path.'/'.$_POST['watermark'];
	$opacity = $_POST['opacity'];

	//==========================================

	//...Function

	//==========================================

	//Проверяем основное изображение и делаем нужное сжатие
	if (preg_match('/[.](GIF)|(gif)$/', $imname)) {
		$srcimg = imagecreatefromgif($imname);
	}
	else if (preg_match('/[.](PNG)|(png)$/', $imname)) {
		$srcimg = imagecreatefrompng($imname);
	}
	else if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $imname)) {
		$srcimg = imagecreatefromjpeg($imname);
	}

	//Проверяем вотермарк по типу и делаем нужное сжатие
	if (preg_match('/[.](GIF)|(gif)$/', $patternname)) {
		$pattern = imagecreatefromgif($patternname);
	}
	else if (preg_match('/[.](PNG)|(png)$/', $patternname)) {
		$pattern = imagecreatefrompng($patternname);
	}
	else if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $patternname)) {
		$pattern = imagecreatefromjpeg($patternname);
	}

	//==========================================


	$srcWidth = imagesx($srcimg);
	$srcHeight = imagesy($srcimg);

	// 4. Create background pattern from image

	$patternWidth = imagesx($pattern);
	$patternHeight = imagesy($pattern);

	//======================================================================

	$im = imagecreatetruecolor($srcWidth, $srcHeight);
	$black = imagecolorallocate($im, 0, 0, 0);
    imagecolortransparent($im, $black);

	//======================================================================
	
	// 5. Repeatedly copy pattern to fill target image
    if($patternWidth<$srcWidth || $patternHeight<$srcHeight){
        for($patternX=0;$patternX<$srcWidth;$patternX+=$patternWidth){
            for($patternY=0;$patternY<$srcHeight;$patternY+=$patternHeight){
                imagecopy($im,$pattern,$patternX,$patternY,0,0,$patternWidth,$patternHeight);
            }
        }
    } else imagecopy($im,$pattern,0,0,0,0,$patternWidth,$patternHeight);
 
    // Сохранение замощенного прозрачного (пустого) изображения с размерами основного
    imagepng($im, 'smell.png');

    $tomerge = imagecreatefrompng('smell.png');
    imagealphablending($tomerge, false);
    imagesavealpha($tomerge, true);

    //Основной мерж картинок
    imagecopymerge($srcimg, $tomerge, 0, 0, 0, 0, $srcWidth, $srcHeight, $opacity);
    imagealphablending($srcimg, false);
    imagesavealpha($srcimg, true);

    //Сохранение файла
    $tofilename = $pathtosave.'/'.date('Ymd_his');
    imagepng($srcimg, $tofilename.'_spazm_tiled.png');
    $tobrowser = $tofilename.'_spazm.jpg';

    //=====================================================================

    //А вот и сама функция
    function file_force_download($file) {
		if (file_exists($file)) {
		// Cбрасываем буфер вывода PHP, чтобы избежать переполнения памяти, выделенной под скрипт. Если этого не сделать, файл будет читаться в память полностью
		if (ob_get_level()) {
		  ob_end_clean();
	}
		// Возвращаем файл и заголовки. XMLHttpResponse на клиенте выполнит сохранение файла
		header('Content-Description: File Transfer');
		header('Content-Type: image/jpeg');
		header('Content-Disposition: attachment; filename=' . basename($file));
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize($file));
		// читаем файл и отправляем его пользователю
		if ($fd = fopen($file, 'rb')) {
			while (!feof($fd)) {
				print fread($fd, 1024);
			}
			fclose($fd);
		}
			exit;
		}
	}

    //Модная функция пушинга файла в браузер. Туда придет бинарный blob, который форсом выдается в браузер-даунлоад через JS
	file_force_download($tobrowser);

    imagedestroy($im);
    imagedestroy($srcimg);
    imagedestroy($pattern);

	//======================================================================

}
else {
	header('Content-Disposition: attachment; filename=NOFILE.php');
	header("HTTP/1.0 404 Not Found");
	exit('NO FILES');
}

?>
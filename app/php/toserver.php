<?php

if (isset($_POST['image']) && isset($_POST['watermark'])) {

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
	$placeaction = $_POST['placeaction'];
	$indentX = $_POST['indentX'];
	$indentY = $_POST['indentY'];
	$tileIndentX = intval($_POST['tileIndentX']);
	$tileIndentY = intval($_POST['tileIndentY']);
	$towidth = intval($_POST['towidth']);
	$toheight = intval($_POST['toheight']);
	$tomainwidth = intval($_POST['tomainwidth']);
	$tomainheight = intval($_POST['tomainheight']);

	//==========================================

	//...Function

	//==========================================

	//Проверяем основное изображение и делаем нужное сжатие
	if (preg_match('/[.](GIF)|(gif)$/', $imname)) {
		$srcimg_src = imagecreatefromgif($imname);
		$width = imagesx($srcimg_src);
		$height = imagesy($srcimg_src);
		$srcimg = imagecreatetruecolor($tomainwidth, $tomainheight);
		imagecopyresized($srcimg, $srcimg_src, 0, 0, 0, 0, $tomainwidth, $tomainheight, $width, $height);
		imagedestroy($srcimg_src);
	}
	else if (preg_match('/[.](PNG)|(png)$/', $imname)) {
		$srcimg_src = imagecreatefrompng($imname);
		imagealphablending($srcimg_src, false);
    	imagesavealpha($srcimg_src, true);
		$width = imagesx($srcimg_src);
		$height = imagesy($srcimg_src);
		$srcimg = imagecreatetruecolor($tomainwidth, $tomainheight);
    	imagealphablending($srcimg, false);
    	imagesavealpha($srcimg, true);
		imagecopyresized($srcimg, $srcimg_src, 0, 0, 0, 0, $tomainwidth, $tomainheight, $width, $height);
    	//imagepng($srcimg, 'mim.png');
		imagedestroy($srcimg_src);
	}
	else if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $imname)) {
		$srcimg_src = imagecreatefromjpeg($imname);
		$width = imagesx($srcimg_src);
		$height = imagesy($srcimg_src);
		$srcimg = imagecreatetruecolor($tomainwidth, $tomainheight);
		imagecopyresized($srcimg, $srcimg_src, 0, 0, 0, 0, $tomainwidth, $tomainheight, $width, $height);
		imagedestroy($srcimg_src);
	}

	//Проверяем вотермарк по типу и делаем нужное сжатие
	if (preg_match('/[.](GIF)|(gif)$/', $patternname)) {
		$pattern_src = imagecreatefromgif($patternname);
		$width = imagesx($pattern_src);
		$height = imagesy($pattern_src);
		$pattern = imagecreatetruecolor($towidth, $toheight);
		imagecopyresized($pattern, $pattern_src, 0, 0, 0, 0, $towidth, $toheight, $width, $height);
		imagedestroy($pattern_src);
	}
	else if (preg_match('/[.](PNG)|(png)$/', $patternname)) {
		$pattern_src = imagecreatefrompng($patternname);
		imagealphablending($pattern_src, false);
    	imagesavealpha($pattern_src, true);
		$width = imagesx($pattern_src);
		$height = imagesy($pattern_src);
		$pattern = imagecreatetruecolor($towidth, $toheight);
		imagealphablending($pattern, false);
    	imagesavealpha($pattern, true);
		imagecopyresized($pattern, $pattern_src, 0, 0, 0, 0, $towidth, $toheight, $width, $height);
		imagedestroy($pattern_src);
	}
	else if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $patternname)) {
		$pattern_src = imagecreatefromjpeg($patternname);
		$width = imagesx($pattern_src);
		$height = imagesy($pattern_src);
		$pattern = imagecreatetruecolor($towidth, $toheight);
		imagecopyresized($pattern, $pattern_src, 0, 0, 0, 0, $towidth, $toheight, $width, $height);
		imagealphablending($pattern, false);
		imagedestroy($pattern_src);
	}

	//==========================================


	$srcWidth = imagesx($srcimg);
	$srcHeight = imagesy($srcimg);

	$patternWidth = imagesx($pattern);
	$patternHeight = imagesy($pattern);


	//======================================================================

	//Пустое увеличенное изображение под будущий мерж
	$im = imagecreatetruecolor($srcWidth*2, $srcHeight*2);
	//$black = imagecolorallocate($im, 0, 0, 0);
    //imagecolortransparent($im, $black);
	//imagealphablending($im, false);
    //imagesavealpha($im, true);
    //imagepng($im, 'smim.png');
    //ОК

	//======================================================================
	
	//Замостить
	if(isset($pattern) && $placeaction == 'tile') {
		if($patternWidth<$srcWidth || $patternHeight<$srcHeight){
        for($patternX=0;$patternX<$srcWidth*2;$patternX+=$patternWidth+$tileIndentX){
            for($patternY=0;$patternY<$srcHeight*2;$patternY+=$patternHeight+$tileIndentY){
                	imagecopy($im,$pattern,$patternX,$patternY,0,0,$patternWidth,$patternHeight);
            	}
        	}
    	} else imagecopy($im,$pattern,0,0,0,0,$patternWidth,$patternHeight);
	}
	else {
		//header('Content-Disposition: attachment; filename=NOFILE.php');
		//header("HTTP/1.0 404 Not Found");
		//exit('NO FILES');

		//Просто склеить картинки - пустую и не пустую
		imagecopy($im,$pattern,0,0,0,0,$patternWidth,$patternHeight);
    	imagepng($im, 'mumim.png');
    	//Здесь фон черный, изображения склеены
	}    
 
    // Сохранение замощенного прозрачного (пустого) изображения с размерами основного
    imagepng($im, 'smell.png');

    $tomerge = imagecreatefrompng('smell.png');
    imagealphablending($tomerge, false);
    imagesavealpha($tomerge, true);
    $blackd = imagecolorallocate($tomerge, 0, 0, 0);
    imagecolortransparent($tomerge, $blackd);
    imagepng($tomerge, 'simimimi.png');

    $mergeWidth = imagesx($tomerge);
    $mergeHeight = imagesy($tomerge);

    //Основной мерж картинок
    imagecopymerge($srcimg, $tomerge, intval($indentX), intval($indentY), 0, 0, $mergeWidth, $mergeHeight, $opacity);
    

    //Сохранение файла
    $tofilename = $pathtosave.'/'.date('Ymd_his');
    $tobrowser = $tofilename.'_spazm_tiled.png';
    imagepng($srcimg, $tobrowser);

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
		header('Content-Type: image/png');
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
    imagedestroy($tomerge);
    imagedestroy($pattern_src);
    imagedestroy($srcimg_src);

	//======================================================================

}
else {
	header('Content-Disposition: attachment; filename=NOFILE.php');
	header("HTTP/1.0 404 Not Found");
	exit('NO FILES');
}

?>;
	exit('NO FILES');
}

?>
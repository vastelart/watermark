<?php

if ($_POST['placeaction'] == "tile" && isset($_POST['image']) && isset($_POST['watermark']) { //Если метод наложения - замостить (tile)

//$filename = $_FILES['watermark']['name'];
//$source = $_FILES['watermark']['tmp_name'];
//move_uploaded_file($source,"$path/$filename");//загрузка оригинала в папку $path

//Проверяем основное изображение и делаем нужное сжатие
if (preg_match('/[.](GIF)|(gif)$/', $image)) {
	$im = imagecreatefromgif($path . "/" . $image);
}
else if (preg_match('/[.](PNG)|(png)$/', $image)) {
	$im = imagecreatefrompng($path . "" . $image);
}

else if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $image)) {
	$im = imagecreatefromjpeg($path . "/" . $image);
}

//Проверяем вотермарк по типу и делаем нужное сжатие
if (preg_match('/[.](GIF)|(gif)$/', $waterimage)) {
	$pattern = imagecreatefromgif($path . "/" . $waterimage);
}
else if (preg_match('/[.](PNG)|(png)$/', $waterimage)) {
	$pattern = imagecreatefrompng($path . "" . $waterimage);
}

else if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $waterimage)) {
	$pattern = imagecreatefromjpeg($path . "/" . $waterimage);
}

$imWidth = imagesx($im);
$imHeight = imagesy($im);

// 4. Create background pattern from image

$patternWidth = imagesx($pattern);
$patternHeight = imagesy($pattern);

// 5. Repeatedly copy pattern to fill target image
if ($patternWidth < $imWidth || $patternHeight < $imHeight) {
	for ($patternX = 0; $patternX < $imWidth; $patternX += $patternWidth) {
		for ($patternY = 0; $patternY < $imHeight; $patternY += $patternHeight) {
			imagecopymerge($im, $pattern, $patternX, $patternY, 30, 30, $patternWidth, $patternHeight, 60);
		}
	}
}

else imagecopymerge($im, $pattern, 0, 0, 0, 0, $patternWidth, $patternHeight, 60);

}

?>
<?php
session_start();
require_once "../../examples/plugins/autoload.php";

use \WideImage\WideImage as WideImage;

//Определяем папку для загрузки файлов
$path = "files";

//Если таковой нет в дереве, запиливаем немедленно
if(!file_exists($path)){
	mkdir($path);
}

//Проверяем, нужным ли запросом отправлена форма
if($_SERVER['REQUEST_METHOD'] == 'POST') {

	//Массив допустимых типов файлов
	$types = array("image/png", "image/jpeg", "image/jpg");

	//Функция для редиректа, еще понадобится
	function checkidizer($message) {
			$_SESSION['message'] = $message;
			header("HTTP/1.1 302 Moved Temporarily");
			header("Location: _failer.php");
	}

	//Вроде файлы есть, плэйсим их в переменные
	$image = $_FILES['image'];
	$waterimage = $_FILES['watermark'];

	//Если метод наложения - single (без замощения)
	if ($_REQUEST['placeaction'] == "single") {

		$image = WideImage::loadFromUpload('image');
		$watermark = WideImage::loadFromUpload('watermark');

		$water_height = round($image->getHeight() / 2, 0);
		$watermark = $watermark->resize(null, $water_height);
		$water_width = $watermark->getWidth();
		$dest_x = round(($image->getWidth() - $water_width) / 2, 0);
		$dest_y = round(($image->getHeight() - $water_height) / 2, 0);

		$x = array(100, 200);
		foreach ($x as $value) {
		   $merged = $image->merge($watermark, $x, $x, 50);
		}

		$merged->output('jpg');

	} elseif ($_REQUEST['placeaction'] == "tile") { //Если метод наложения - замостить (tile)

		$filename = basename($image['name']);
		if (move_uploaded_file($image['tmp_name'], "$path/$filename")) {
			list($width, $height) = getimagesize("$path/$filename");
			if (preg_match('/[.](GIF)|(gif)$/', $filename)) {
				$im = imagecreatefromgif("$path/$filename"); //если оригинал был в формате gif, то создаем изображение в этом же формате. Необходимо для последующего сжатия
			}
			if (preg_match('/[.](PNG)|(png)$/', $filename)) {
				$im = imagecreatefrompng("$path/$filename");//если оригинал был в формате png, то создаем изображение в этом же формате. Необходимо для последующего сжатия
			}

			if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $filename)) {
				$im = imagecreatefromjpeg("$path/$filename"); //если оригинал был в формате jpg, то создаем изображение в этом же формате. Необходимо для последующего сжатия
			}

		}


		$filename = $_FILES['watermark']['name'];
		$source = $_FILES['watermark']['tmp_name'];
		move_uploaded_file($source,"$path/$filename");//загрузка оригинала в папку $path

		if (preg_match('/[.](GIF)|(gif)$/', $filename)) {
			$pattern = imagecreatefromgif("$path/$filename"); //если оригинал был в формате gif, то создаем изображение в этом же формате. Необходимо для последующего сжатия
		}
		if (preg_match('/[.](PNG)|(png)$/', $filename)) {
			$pattern = imagecreatefrompng("$path/$filename");//если оригинал был в формате png, то создаем изображение в этом же формате. Необходимо для последующего сжатия
		}

		if (preg_match('/[.](JPG)|(jpg)|(jpeg)|(JPEG)$/', $filename)) {
			$pattern = imagecreatefromjpeg("$path/$filename"); //если оригинал был в формате jpg, то создаем изображение в этом же формате. Необходимо для последующего сжатия
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
		} else imagecopymerge($im, $pattern, 0, 0, 0, 0, $patternWidth, $patternHeight, 60);


		imagepng($im, 'wat.png');
		imagedestroy($im);
		//echo '<img src="http://watermark/app/tests/Sergey/wat.png">';

		}

}
else {
	die('FAIL TO ACTION');
}
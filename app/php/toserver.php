<?php
session_start();
require_once "../../examples/plugins/autoload.php";

use \WideImage\WideImage as WideImage;

//Определяем папку для загрузки файлов
$path = "files";
$pathtosave = "files/watermarked";

//Если таковой нет в дереве, запиливаем немедленно
if(!file_exists($path)){
	mkdir($path);
}
elseif (!file_exists($pathtosave)) {
	mkdir($pathtosave);
}

//Проверяем, нужным ли запросом отправлена форма
if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['image']) && isset($_POST['watermark'])) {

	//Массив допустимых типов файлов
	$types = array("image/png", "image/jpeg", "image/jpg");

	//Вроде файлы есть, плэйсим их в переменные
	$image = $_POST['image'];
	$waterimage = $_POST['watermark'];
	$opacity = $_POST['opacity'];
	$indentX = intval($_POST['indentX']);
	$indentY = intval($_POST['indentY']);

	//Если метод наложения - single (без замощения)
	if ($_REQUEST['placeaction'] == "single") {

		//Загружаем в обработку файлы из каталога, в который грузит jQueryFileUpload
		$image = WideImage::load($path.'/'.$image);
		$watermark = WideImage::load($path.'/'.$waterimage);

		//Склеиваем картинки
		$merged = $image->merge($watermark, 'left + '.$indentX, 'top + '.$indentY, $opacity);

		//Это - будущее имя сохраненного файла
		$tofilename = $pathtosave.'/'.date('Ymd_his');

		//А это - сохранение файла прямо в корень с php
		$merged->saveToFile($tofilename.'_spazm.jpg', 90);

		//А это чисто отладочная фича, для консоли браузера
		echo intval($indentX)." ".intval($indentY);

		//Теперь направляемся в файл с месседжем, в котором имя сохраненного файла, оттуда и скачаем директом в браузер
		//$_SESSION['message'] = $tofilename.'_spazm.jpg';
		//header("HTTP/1.1 302 Moved Temporarily");
		//header("Location: _test.php");


		//Плэйс в переменную полученных дел
		$tobrowser = $tofilename.'_spazm.jpg';

		//А вот и сама функция
	    function file_force_download($file) {
			if (file_exists($file)) {
			// сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
			// если этого не сделать файл будет читаться в память полностью!
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

		//Модная функция пушинга файла в браузер
		file_force_download($tobrowser);

		//=========================

	} elseif ($_REQUEST['placeaction'] == "tile" && isset($_POST['image']) && isset($_POST['watermark'])) { //Если метод наложения - замостить (tile)

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
	header("HTTP/1.0 404 Not Found");
	die('FAIL TO ACTION');
}
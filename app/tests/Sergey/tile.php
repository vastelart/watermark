<?php
session_start();
require_once "../../../examples/plugins/autoload.php";

use \WideImage\WideImage as WideImage;

// Cargar una imagen externa
$zend = imagecreatefrompng('image.png');
// Crear una imagen de 200x200
$im = imagecreatetruecolor(1600, 1600);
// Establecer la tesela
imagesettile($im, $zend);
// Hacer que la imagen se repita
imagefilledrectangle($im, 0, 0, 599, 599, IMG_COLOR_TILED);
// Imprimir
imagepng($im, "size.png");
?>

<html>
<head></head>
<body>
<img src="size.png">
</body>
</html>

?>





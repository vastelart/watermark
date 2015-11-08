<?php
session_start();
require_once "../../../examples/plugins/autoload.php";

use \WideImage\WideImage as WideImage;

if($_SERVER['REQUEST_METHOD'] == 'POST'){


    $types = array("image/png", "image/jpeg", "image/jpg");

    if(isset($_FILES['image'])){
        $image = $_FILES['image'];
    } elseif(isset($_FILES['watermark'])){
        $image = $_FILES['watermark'];
    }
    if($image['size'] == 0 || $image['size'] > 1024*1024*2) {
        $_SESSION['message'] = "Файл не выбран или превышает 2МБ";
        header("HTTP/1.1 302 Moved Temporarily");
        header("Location: index.php");
    }

    elseif (!in_array($image['type'], $types)){
        $_SESSION['message'] = "Файл не соответствует";
        header("HTTP/1.1 302 Moved Temporarily");
        header("Location: index.php");
    }


$image = WideImage::loadFromUpload('image');
$watermark = WideImage::loadFromUpload('watermark');

    $water_height = round($image->getHeight()/2,0);
    $watermark = $watermark->resize(null,$water_height);
    $water_width = $watermark->getWidth();
    $dest_x = round(($image->getWidth() - $water_width)/2,0);
    $dest_y = round(($image->getHeight() - $water_height)/2,0) ;

    $x = array(100,200);
        foreach ($x as $value) {
            $merged = $image->merge($watermark, $x, $x,  50);

    }


    $merged->output('jpg');

}


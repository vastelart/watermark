<?php
session_start();
require_once "../../../examples/plugins/autoload.php";

use \WideImage\WideImage as WideImage;

if($_SERVER['REQUEST_METHOD'] == 'POST'){

//
//    $types = array( ".png", ".jpeg");
//
//    if(isset($_FILES['image'])){
//        $image = $_FILES['image'];
//    } elseif(isset($_FILES['watermark'])){
//        $image = $_FILES['watermark'];
//    }
//    if($image['size'] == 0 || $image['size'] > 1024*1024*2) {
//        $_SESSION['message'] = "Файл не выбран или превышает 2МБ";
//        header("HTTP/1.1 302 Moved Temporarily");
//        header("Location: index.php");
//    }
//
//    elseif (!in_array($image['type'], $types)){
//        $_SESSION['message'] = "Файл не соответствует";
//        header("HTTP/1.1 302 Moved Temporarily");
//        header("Location: index.php");
//    }

        $image = $_FILES['image'];
        $watermark = $_FILES['watermark'];

$image = WideImage::loadFromUpload('image');
$watermark = WideImage::loadFromUpload('watermark');


    $merged = $image->merge($watermark, "right - 10", "bottom - 10", 150);
    $merged->output('jpg');

}





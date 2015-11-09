<?php
session_start();

$message = null;
if(isset($_SESSION['message'])){
    $message = $_SESSION['message'];
    echo $message;
}

unset($_SESSION['message']);
?>
<?php
session_start();

$message = null;
if(isset($_SESSION['message'])){
    $message = $_SESSION['message'];
}

unset($_SESSION['message']);
?>
<!doctype html>
<html lang="ru">
<body>

<form action="action.php" enctype="multipart/form-data" method="post">
    <input type="file" class="load-input" data-upload-type="watermark" name="watermark">
    <input type="file" class="load-input" data-upload-type="image" name="image">
    <input type="submit"/>
</form>


</body>
</html>

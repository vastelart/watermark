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

<link rel="stylesheet" href="File-Upload/css/jquery.fileupload.css">

<body>
<p class="upload-title"></p>
<div class="upload-img"></div>
<form action="action.php" enctype="multipart/form-data" method="post">
    <span class="btn btn-success fileinput-button">
        <i class="icon-plus icon-white"></i>
                    <span>Add files...</span>
    <input type="file" class="fileupload" data-upload-type="image" name="image" multiple>
         </span>
    <input type="file" class="fileupload" data-upload-type="watermark" name="watermark" multiple>
    <input type="radio" name="action" value="single">
    <input type="radio" name="action" value="tile">
    <button type="submit" class="btn btn-primary start">

    <input type="submit"/>
    <?php if($message): ?>
        <div class="alert alert-info">
            <?php echo $message; ?>
        </div>
    <?php endif; ?>

</form>





</body>
</html>

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
    <?php if($message): ?>
        <div class="alert alert-info">
            <?php echo $message; ?>
        </div>
    <?php endif; ?>

</form>
<!--<script src="http://code.jquery.com/jquery-1.8.3.js"></script>-->
<!--<script src="File-Upload/js/jquery.fileupload.js"></script>-->
<!--<script src="upload.js"></script>-->

</body>
</html>

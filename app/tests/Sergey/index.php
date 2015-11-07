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
    <button type="submit" class="btn btn-primary start">

    <input type="submit"/>
    <?php if($message): ?>
        <div class="alert alert-info">
            <?php echo $message; ?>
        </div>
    <?php endif; ?>

</form>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
<script src="File-Upload/js/vendor/jquery.ui.widget.js"></script>
<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
<script src="//blueimp.github.io/JavaScript-Load-Image/js/load-image.all.min.js"></script>
<!-- The Canvas to Blob plugin is included for image resizing functionality -->
<script src="//blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
<!-- Bootstrap JS is not required, but included for the responsive demo navigation -->
<script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
<script src="File-Upload/js/jquery.iframe-transport.js"></script>
<!-- The basic File Upload plugin -->
<script src="File-Upload/js/jquery.fileupload.js"></script>
<!-- The File Upload processing plugin -->
<script src="File-Upload/js/jquery.fileupload-process.js"></script>
<!-- The File Upload image preview & resize plugin -->
<script src="File-Upload/js/jquery.fileupload-image.js"></script>



</body>
</html>

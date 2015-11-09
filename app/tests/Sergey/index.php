<!doctype html>
<html lang="ru">
<head></head>

<body>
<p class="upload-title"></p>
<div class="upload-img"></div>
<form action="action.php" enctype="multipart/form-data" method="POST" id="theForm" name="theform">

    <input type="file" class="fileupload" data-upload-type="image" name="image">
    <input type="file" class="fileupload" data-upload-type="watermark" name="watermark">

    <input type="radio" name="placeaction" value="single">
    <input type="radio" name="placeaction" value="tile" checked>

    <!-- <button class="btn btn-primary start" id="submit">Отправить</button> -->
    <a href="#" id="submit">Отправить</a>

</form>



<script src="fetch.js" defer></script>
<script src="_xmlUpload.js" defer></script>
</body>
</html>

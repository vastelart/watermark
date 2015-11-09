//Spaghetti begins here. Let it be.
if (!isset($_FILES['image']) || !isset($_FILES['watermark'])) {
	$_SESSION['message'] = "Не выбран ни один файл";
	checkidizer($message);
} elseif ($_FILES['image']['size'] == 0 || $_FILES['image']['size'] > 1024 * 1024 * 2 ) {
	$_SESSION['message'] = "Основное изображение не выбрано или превышает 2МБ";
	checkidizer("Основное изображение не выбрано или превышает 2МБ");
} elseif ($_FILES['watermark']['size'] == 0 || $_FILES['watermark']['size'] > 1024 * 1024 * 2) {
	$_SESSION['message'] = "Водяной знак не выбран или превышает 2МБ";
	checkidizer($message);
} elseif (!in_array($_FILES['image']['type'], $types)) {
	$_SESSION['message'] = "Формат основного файла недопустим";
	checkidizer($message);
} elseif (!in_array($_FILES['image']['type'], $types)) {
	$_SESSION['message'] = "Формат водяного знака недопустим";
	checkidizer($message);
} else {}
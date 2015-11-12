var uploadModule = (function () {

	//Главный рычаг - инициализация модуля
	var init = _listener;

	//Теперь объявляем 'переменные среды'
	var mainImg = $('#baseImg', '.form-input'),
		waterMark = $('#watermark', '.form-input'),
		mainImgInsert = $('.main-img-inserted', '.watermark-left'),
		watermarkInsert = $('.water-img-inserted', '.watermark-left'),
		mainImgName = $('.form-input__fake-base-img', '.form-input'),
		waterMarkName = $('.form-input__fake-watermark', '.form-input');

	//Реджексп разрешенных файлов. Аплоадовский, из коробки, не работает. Разобраться.
	var imgregexp = /\.(gif|jpg|jpeg|png)$/i;

	//Слушаем страницу 
	function _listener() {

		//DOMTree, CSSOMTree, scripts и прочие left overs - все загружено
		$(window).load(function () {

			//Все ок
			console.log('UPLOAD MODULE');

			//Вешаем аплоад файлов на инпуты основной картинки и вотермарка
			_loadImage(mainImg, mainImgInsert, mainImgName);
			_loadImage(waterMark, watermarkInsert, waterMarkName);

		});
	}

	// Запускаем гигантскую функцию аплоада изображений
	function _loadImage(input, insert, nameInsert) {
		input.fileupload({
			url: '/php/',
			autoUpload: false,
			acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize: 999000,
			minFileSize: 1,
			maxNumberOfFiles: 1
		}).on('fileuploadadd', function (e, data) {
			$.each(data.files, function (index, file) {
				if(!imgregexp.test(file.name)) {
					return false;
				}
				else {
					data.submit();
				}
			});
		}).on('fileuploaddone', function (e, data) {
			$.each(data.files, function (index, file) {

				//Файл загружен
				console.log('LOAD');
				console.log(file);

				//Убираем disabled у инпута вотермарка
				waterMark.prop('disabled', false);
				waterMark.parent().removeClass('disabled');
				$('label[for=watermark]').removeClass('disabled');

				//Добавляем название файла в 'ложные инпуты'
				nameInsert.text(file.name);

				//Очищаем контейнер перед вставкой изображения
				var imgs = insert.find('img');
				imgs.remove();

				//Плэйс файла в нужный контейнер на странице. Помнишь, мы передавали в _loadImage второй параметр?
				insert.attr('src', '/php/files/' + file.name);

				//Инсерты были скрыты. Показываем
				insert.parent().fadeIn(500);

				//Если это - основное изображение, возвращаем ему свойство инлайн-блок
				if(insert.parent().attr('id') === 'mainImageInsert') {
					insert.parent().css({
						display: 'inline-block'
					});
				}
				//Здесь будет происходить масштабирование вотермарка
				else if(insert.parent().attr('id') === 'watermarkInsert') {
					
					//Убираем disabled у всех остальных элементов
					var disabled = $('.disabled', '.watermark-right');
					disabled.removeClass('disabled').removeAttr('disabled');
					console.log('WATER IS HERE');
				}
			});
		});
	} //Здесь этот кошмар заканчивается

	//Возвращаем рычаг
	return {
		init: init
	}

})();

//Запускаем рычаг
uploadModule.init();
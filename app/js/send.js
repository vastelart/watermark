var uploadModule = (function () {

	//Главный рычаг - инициализация модуля
	var init = _listener;

	//Слушаем страницу 
	function _listener() {

		//DOMTree, CSSOMTree, scripts и прочие left overs - все загружено
		$(window).load(function () {

			//Все ок
			console.log('UPLOAD MODULE');

			//Теперь объявляем 'переменные среды'
			var mainImg = $('#baseImg', '.form-input'),
				waterMark = $('#watermark', '.form-input'),
				mainImgInsert = $('.main-img-inserted', '.watermark-left'),
				watermarkInsert = $('.water-img-inserted', '.watermark-left'),
				mainImgName = $('.form-input__fake-base-img', '.form-input'),
				waterMarkName = $('.form-input__fake-watermark', '.form-input');

			var imgregexp = /\.(gif|jpg|jpeg|png)$/i;

			//Вешаем лоад файлов на инпуты основной картинки и вотермарка
			_loadImage(mainImg, mainImgInsert, mainImgName);
			_loadImage(waterMark, watermarkInsert, waterMarkName);

			// Initialize the jQuery File Upload widget:
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

	    				//Убираем disabled у инпута вотермарка
	    				waterMark.attr('disabled') ? waterMark.removeAttr('disabled') : waterMark.attr('disabled', 'disabled');
	    				var disabled = $('.disabled', '.watermark-right');
	    				disabled.removeClass('disabled');
	    				
	    				//Получаем модный JSON резалт загруженного файла, достаем ссылку на сам файл
	    				var bigData = JSON.parse(data.result);
	    				var bigDataUrl = bigData.files[index].url;

	    				//Добавляем название файла в 'ложные инпуты'
	    				nameInsert.text(file.name);

	    				//Обязательно ссылку в консоль, дочь самурая. Возьми себя в руки
	    				console.log(bigDataUrl);

	    				//Очищаем контейнер перед вставкой изображения
	    				var imgs = insert.find('img');
	    				imgs.remove();

	    				//Плэйс файла в нужный контейнер на странице. Помнишь, мы передавали в _loadImage второй параметр?
	    				//insert.append('<img class="main-img-inserted" src="' + bigDataUrl + '">');
	    				insert.attr('src', bigDataUrl);

	    				//Инсерты были скрыты. Показываем
	    				insert.parent().fadeIn(500);

	    				//Если это - основное изображение, возвращаем ему свойство инлайн-блок
	    				if(insert.parent().attr('id') === 'mainImageInsert') {
	    					insert.parent().css({
	    						display: 'inline-block'
	    					});
	    				}

	    				//Инит модуля позишена
	    				position.init();
    				});
	    		});
	    	}
		});
	}

	return {
		init: init
	}

})();

uploadModule.init();
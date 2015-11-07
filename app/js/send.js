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
				mainImgInsert = $('#mainImageInsert', '.watermark-left'),
				watermarkInsert = $('#watermarkInsert', '.watermark-left'),
				mainImgName = $('.form-input__fake-base-img', '.form-input'),
				waterMarkName = $('.form-input__fake-watermark', '.form-input');

			//Вешаем лоад файлов на инпуты основной картинки и вотермарка
			_loadImage(mainImg, mainImgInsert, mainImgName);
			_loadImage(waterMark, watermarkInsert, waterMarkName);

			// Initialize the jQuery File Upload widget:
		    function _loadImage(input, insert, nameInsert) {
		    	input.fileupload({
		    		url: '/php/',
		    		done: function (e, data) {
		    			$.each(data.files, function (index, file) {

		    				//Файл загружен
		    				console.log('LOAD');

		    				//Убираем disabled у инпута вотермарка
		    				waterMark.attr('disabled') ? waterMark.removeAttr('disabled') : waterMark.attr('disabled', 'disabled');
		    				
		    				//Получаем модный JSON резалт загруженного файла, достаем ссылку на сам файл
		    				var bigData = JSON.parse(data.result);
		    				var bigDataUrl = bigData.files[index].url;

		    				//Добавляем название файла в 'ложные инпуты'
		    				nameInsert.text(file.name);

		    				//Обязательно ссылку в консоль, дочь самурая. Возьми себя в руки
		    				console.log(bigDataUrl);

		    				//Плэйс файла в нужный контейнер на странице. Помнишь, мы передавали в _loadImage второй параметр?
		    				insert.append('<img src="' + bigDataUrl + '">');
	    				});
	    			}
	    		});
	    	}
		});
	}

	return {
		init: init
	}

})();

uploadModule.init();
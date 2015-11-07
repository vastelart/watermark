(function () {

	//Главный рычаг - инициализация модуля
	var init = _listener;

	//Слушаем страницу 
	function _listener() {

		//DOMTree, CSSOMTree, scripts и прочие left overs - все загружено
		$(window).load(function () {

			//Теперь объявляем 'переменные среды'
			var mainImg = $('#mainImg', '.btn'),
				waterMark = $('#waterMark', '.btn'),
				mainImgInsert = $('.mainImgInsert'),
				watermarkInsert = $('.watermarkInsert');

			//Вешаем лоад файлов на инпуты основной картинки и вотермарка
			_loadImage(mainImg, mainImgInsert);
			_loadImage(waterMark, watermarkInsert);

			// Initialize the jQuery File Upload widget:
		    function _loadImage(input, insert) {
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

})();
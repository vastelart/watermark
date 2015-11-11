(function () {

	//Переменные среды
	var form = document.getElementById('theForm');
	var submit = document.getElementById('submitBtn');
	var toserver = submit.getAttribute('data-server');
	var waterimg = document.getElementById('watermarkInsert');

	//Модуль вызова диалога сохранения файла - новый экземпляр

	//Реджексп для извлечения имени файла
	var nameRegexp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
	
	//Дико прослушиваем нужное событие - кто-то нажал 'Скачать'
	submit.addEventListener('click', _reliz, true);

	//Запускаем гигантскую функцию сбора информации и отправки ее на сервер
	function _reliz(event) {
		//Отменяем событие бай дефолт
		event.preventDefault();
		submit.classList = this.classList + ' disabled';

		//Достаем нужные значения
		var mainimage = document.querySelector('.form-input__fake-base-img').textContent;
		var watermark = document.querySelector('.form-input__fake-watermark').textContent;
		var opacity = document.getElementById('slider').getAttribute('data-value');
		var indentX = waterimg.style.left;
		var indentY = waterimg.style.top;

		//Пилим форм-дату
		var formData = new FormData(form);

		//Запиливаем все в форм-дату
		formData.append('placeaction', 'single');
		formData.append('image', mainimage);
		formData.append('watermark', watermark);
		formData.append('opacity', opacity);
		formData.append('indentX', indentX);
		formData.append('indentY', indentY);

		// Для разных браузеров, не заморачиваться
		var GLOBAL_URL = window.URL || window.webkitURL;

		//Отправляем
		var reliz = new XMLHttpRequest();
		
		reliz.open('POST', toserver, true);
		reliz.responseType = 'blob';

		reliz.onload = function(e) {
			if (this.status === 200 && this.readyState === 4) {
				//Отладочные сообщения в консоль
				console.log(this.response);
				console.log(this.getResponseHeader('Content-Disposition'));

				//Извлекаем название файла из заголовков, которые отправил PHP-обработчик
				var getHeaderResponse = this.getResponseHeader('Content-Disposition');
				var extractHeaderResponseArray = nameRegexp.exec(getHeaderResponse);
				var fileNameToSave = extractHeaderResponseArray[1];
				//Отладочное сообщение имени файла в консоль
				console.log(fileNameToSave);

				//Плэйс бинарного объекта в переменную
				var blob = this.response;
				var blobUrl = GLOBAL_URL.createObjectURL(blob);

				//Сохраняем файл через модный плагин FileSaver.js - установлен через bower
				saveAs(blob, fileNameToSave);

				//Посылаем запрос на удаление файла через новый XMLHttpRequest, естественно
				toDeleteFile(fileNameToSave);
			}
			else {
				console.log('НЕ ОК. ЧТО-ТО НЕ СРАБОТАЛО');
			}
		};

		reliz.send(formData);
	}

	//Функция удаления файла сразу же после скачивания
	function toDeleteFile(fileToDelete) {
		var destroyer = new XMLHttpRequest();
		var former = new FormData();

		former.append('todelete', fileToDelete);

		destroyer.open('POST', '/php/todelete.php', true);
		destroyer.onload = function() {
			if(this.status === 200 && this.readyState === 4) {
				console.log(this.response);
			}
			else {
				console.log('НИЧЕГО НЕ ВЫШЛО. ФАЙЛ ОСТАЛСЯ');
			}
		}

		destroyer.send(former);
	}

})();
(function () {

	//Переменные среды
	var form = document.getElementById('theForm');
	var submit = document.getElementById('submitBtn');
	var toserver = submit.getAttribute('data-server');
	var waterimg = document.getElementById('watermarkInsert');
	
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

		//Отправляем
		var reliz = new XMLHttpRequest();
		
		reliz.open('POST', toserver, true);
		reliz.responseType = 'blob';

		reliz.onload = function(e) {
			if (this.status === 200 && this.readyState === 4) {
				return reliz;
			}
			else {
				console.log('НЕ ОК');
			}
		};

		reliz.send(formData);
	}

})();
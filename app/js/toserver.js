(function () {

	//Переменные среды
	var form = document.getElementById('theForm');
	var submit = document.getElementById('submitBtn');
	var toserver = submit.getAttribute('data-server');
	
	//Дико прослушиваем нужное событие - кто-то нажал 'Скачать'
	submit.addEventListener('click', _reliz, true);
	//form.addEventListener('submit', _reliz, true);

	//Запускаем гигантскую функцию сбора информации и отправки ее на сервер
	function _reliz(event) {
		//Отменяем событие бай дефолт
		event.preventDefault();
		submit.disabled = 'disabled';

		//Достаем нужные значения
		var mainimage = document.querySelector('.form-input__fake-base-img').textContent;
		var watermark = document.querySelector('.form-input__fake-watermark').textContent;
		var opacity = document.getElementById('slider').getAttribute('data-value');
		var inputX = document.getElementById('inputX').getAttribute('aria-valuenow');
		var inputY = document.getElementById('inputY').getAttribute('aria-valuenow');

		//Пилим форм-дату
		var formData = new FormData(form);

		//Запиливаем все в форм-дату
		formData.append('placeaction', 'single');
		formData.append('image', mainimage);
		formData.append('watermark', watermark);
		formData.append('opacity', opacity);
		formData.append('indentX', inputX);
		formData.append('indentY', inputY);

		//Отправляем
		var reliz = new XMLHttpRequest();
		
		reliz.open('POST', toserver, true);
		reliz.send(formData);

		reliz.onreadystatechange = function () {
			if(reliz.readyState === 4 && reliz.status === 200) {
				console.log(reliz.responseText);
				submit.removeAttribute('disabled');
			}
		}
	}

})();
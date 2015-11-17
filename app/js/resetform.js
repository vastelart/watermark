var resetForm = (function () {

	//Рычаг
	var init = _setListeners;

	//Переменные среды
	var resetBtn = $('#restBtn', '.watermark-right');
	var _inputY = $('.number__input-y');
	var _inputX = $('.number__input-x');
	var watermark = $('#watermarkInsert', '.watermark-left');
	var sliderSpin = $('#slider', '.watermark-right');

	//Начинаем слушать события
	function _setListeners(forceReset) {

		//По клику на кнопку Сброс выполняем ряд процедур. Очень осторожно, чтобы не сбить настройки отправки данных на сервер
		resetBtn.on('click', _resetForm);

		//Если модуль вызвали в другом модуле, передав параметр TRUE, сбрасываем форму
		if(forceReset) {
			resetBtn.trigger('click');
		}

		//Модуль подключился. Если нет в консоли при рефреше страницы, занчит - нет
		console.log('RESET MODULE');
	}

	//Модная функция сброса формы и все, что она сбрасывает/восстанавливает
	function _resetForm(event) {
		event.preventDefault();

		//Да, мы действительно нажали Сброс
		console.log('RESET');

		//Устанавливаем в инпуты все по нулям
		_inputX.val(0);
		_inputY.val(0);

		//Вотермарку возвращаем все CSS-свойства, включая прозрачность
		watermark.css({
			left: 0,
			top: 0,
			opacity: 1
		});

		//Сбрасываем отступы у вотермарков
		var watermarkImages = $('#watermarkInsert').find('img');
		$.each(watermarkImages, function () {
			$(this).css({
				'margin-right' : 0,
				'margin-bottom' : 0,
				'left': 0,
				'top': 0
			});
		});

		//Сбрасываем спиннер прозрачности и ставим ему атрибут data-value 100, его значение отпарвляется на сервер
		sliderSpin.slider('value', 100);
		sliderSpin.attr('data-value', 100);
	}

	//Возвращаем рычаг
	return {
		init: init
	}
})();


//Если есть на странице нужный элемент, запускаем модуль
if($('#restBtn', '.watermark-right').length > 0) {
	resetForm.init();
}
var controlMargin = (function () {
	//Манифест
	console.log('POSITION UP DOWN BUTTONS SWITCHER');

	//Рычаг
	var init = _setListener;

	//Переменные среды
	var _inputY = $('.number__input-y'),
		_inputX = $('.number__input-x'),
		_btnXUp = $('#XMarginPlus'),
		_btnXDown = $('#XMarginMinus'),
		_btnYUp = $('#YMarginPlus'),
		_btnYDown = $('#YMarginMinus'),
		_btnXUp_position = $('#XUp'),
		_btnXDown_position = $('#XDown'),
		_btnYUp_position = $('#YUp'),
		_btnYDown_position = $('#YDown'),
		_posBtns = $('.sett-up, .sett-down'),
		_watermark = $('#watermarkInsert'),
		_watermarkImage = $('.water-img-inserted');

	//Слушатель
	function _setListener(destroy) {
		if(destroy === 'destroy') {
			console.log('СБРОС ЛОГИКИ КОНТРОЛЯ ПО СТРЕЛКАМ');
		}
		else if(destroy === 'tile') {
			console.log('УСТАНОВКА МАРДЖИНОВ ПО СТРЕЛКАМ ВКЛЮЧЕНА');
		}
		else if(destroy === 'single') {
			console.log('ВКЛЮЧЕН КОНТРОЛЬ КООРДИНАТ ПО СТРЕЛКАМ');
		}
		_setPositionByButton();

		//Отменяем событие бай дефолт при клике по button
		_posBtns.on('click', function (event) {
			event.preventDefault();
		});
	}

	//Смещение по клику на кнопки
	function _setPositionByButton() {

		_btnXUp_position.on('click', function() {_watermark.css({ left: _watermark.position().left + 2 }); _getNewCoordinates('posit'); });
		_btnXDown_position.on('click', function() {_watermark.css({ left: _watermark.position().left - 2 }); _getNewCoordinates('posit'); });
		_btnYUp_position.on('click', function() {_watermark.css({ top: _watermark.position().top + 2 }); _getNewCoordinates('posit'); });
		_btnYDown_position.on('click', function() {_watermark.css({ top: _watermark.position().top - 2 }); _getNewCoordinates('posit'); });

		_btnXUp.on('click', function() { _setMarginsToWatermark('right plus'); _getNewCoordinates('marg'); });
		_btnXDown.on('click', function() { _setMarginsToWatermark('right minus'); _getNewCoordinates('marg'); });
		_btnYUp.on('click', function() { _setMarginsToWatermark('bottom plus'); _getNewCoordinates('marg'); });
		_btnYDown.on('click', function() { _setMarginsToWatermark('bottom minus'); _getNewCoordinates('marg'); });

	}

	//Добавление отступов по клику на кнопки (button справа от инпутов с координатами)
	function _setMarginsToWatermark(oper) {
		//Определяем текущее значение марджинов у замощенного вотермарка
		var waterImgs = _watermark.find('img');
		var marginRight = parseInt(waterImgs.css('margin-right'));
		var marginBottom = parseInt(waterImgs.css('margin-bottom'));

		//Такая вот конструкция. Не знаю, как избежать здесь DRY. Времени нет подумать.
		//Если аргумент оператора равен 'plus', увеличиваем отступы у вотермарков
		//Если 'minus' - уменьшаем. Ничего не ограничиваем
		switch(oper) {
			case 'right plus':
				$.each(waterImgs, function () {
					$(this).css({
						'margin-right': marginRight + 1
					});
				});
				break;
			case 'right minus':
				if(marginRight === 0) {
					return false;
				}
				else {
					$.each(waterImgs, function () {
						$(this).css({
							'margin-right': marginRight - 1
						});
					});	
				}
				break;
			case 'bottom plus':
				$.each(waterImgs, function () {
					$(this).css({
						'margin-bottom' : marginBottom + 1
					});
				});
				break;
			case 'bottom minus':
				if (marginBottom === 0) {
					return false;
				}
				else {
					$.each(waterImgs, function () {
						$(this).css({
							'margin-bottom' : marginBottom - 1
						});
					});
				}
				break;
		}
	}

	//Установка координат в инпуты
	function _getNewCoordinates(method){
		if(method === 'posit') {//Режим СИНГЛ, цепляем свойства лефт и топ позишен у вотермарка
			var
				newY = _watermark.position().top,
				newX = _watermark.position().left;
		}
		else if(method === 'marg') {//Режим ТАЙЛ, цепляем значение марджинов у вотермарков - снизу и справа
			var
				newY = parseInt(_watermarkImage.css('margin-bottom')),
				newX = parseInt(_watermarkImage.css('margin-right'));
		}

			_inputY.val(Math.round(newY));
  			_inputX.val(Math.round(newX));
	}

	return {
		init: init
	}
})();

controlMargin.init();
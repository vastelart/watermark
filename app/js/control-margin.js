var controlMargin = (function () {
	//Манифест
	console.log('POSITION UP DOWN BUTTONS SWITCHER');

	//Рычаг
	var init = _setListener;

	//Переменные среды
	var _inputY = $('.number__input-y'),
		_inputX = $('.number__input-x'),
		_defY = $('.number__input-y').val(0),
		_defX = $('.number__input-x').val(0),
		_btnXUp = $('#XUp'),
		_btnXDown = $('#XDown'),
		_btnYUp = $('#YUp'),
		_btnYDown = $('#YDown'),
		_posBtns = $('.sett-up, .sett-down', '.position__adjust-sett'),
		_watermark = $('#watermarkInsert');

	//Слушатель
	function _setListener(destroy) {
		if(destroy === 'destroy') {
			console.log('СБРОС ЛОГИКИ КОНТРОЛЯ ПО СТРЕЛКАМ');
		}
		else if(destroy === 'tile') {
			console.log('УСТАНОВКА МАРДЖИНОВ ПО СТРЕЛКАМ ВКЛЮЧЕНА');
			_setPositionByButton(true);
		}
		else if(destroy === 'single') {
			console.log('ВКЛЮЧЕН КОНТРОЛЬ КООРДИНАТ ПО СТРЕЛКАМ');
			_setPositionByButton(false);
		}

		//Отменяем событие бай дефолт при клике по button
		_posBtns.on('click', function (event) {
			event.preventDefault();
		});
	}

	//Добавление отступов по клику на кнопки (button слева от инпутов с координатами)
	function _setMarginsToWatermark(oper, destroy) {

		if(destroy !== false) {
			var waterImgs = _watermark.find('img');
			var marginRight = waterImgs.css('margin-right');
			var indent = null;
			console.log(marginRight);

			switch(oper) {
				case 'plus':
					$.each(waterImgs, function () {
						$(this).css({
							'margin-right': parseInt(marginRight) + 1,
							'margin-bottom' : parseInt(marginRight) + 1
						});
					});
					break;
				case 'minus':
					$.each(waterImgs, function () {
						$(this).css({
							'margin-right': parseInt(marginRight) - 1,
							'margin-bottom' : parseInt(marginRight) - 1
						});
					});
					break;
				default:
					indent = '+'
					break;
			}

		}
		else {
			return;
		}
	}

	//Смещение по клику на кнопки
	function _setPositionByButton(destroy) {
		_btnXUp.on('click', function() {_watermark.css({ left: _watermark.position().left + 2 }); _getNewCoordinates(); _setMarginsToWatermark('plus', destroy); });
		_btnXDown.on('click', function() {_watermark.css({ left: _watermark.position().left - 2 }); _getNewCoordinates(); _setMarginsToWatermark('minus', destroy); });
		_btnYUp.on('click', function() {_watermark.css({ top: _watermark.position().top + 2 }); _getNewCoordinates(); _setMarginsToWatermark('plus', destroy); });
		_btnYDown.on('click', function() {_watermark.css({ top: _watermark.position().top - 2 }); _getNewCoordinates(); _setMarginsToWatermark('minus', destroy); });
		console.log('CHECKED TO SINGLE');
	}

	//Установка координат в инпуты
	function _getNewCoordinates(){
		var
			newY = _watermark.position().top,
			newX = _watermark.position().left;

			_inputY.val(Math.round(newY));
  			_inputX.val(Math.round(newX));
	}

	return {
		init: init
	}
})();
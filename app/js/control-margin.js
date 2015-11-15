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
			_unbindClick(_posBtns, destroy);
		}
		else if(destroy === 'single') {
			console.log('ВКЛЮЧЕН КОНТРОЛЬ КООРДИНАТ ПО СТРЕЛКАМ');
			_unbindClick(_posBtns, destroy);
		}

		//Отменяем событие бай дефолт при клике по button
		_posBtns.on('click', function (event) {
			event.preventDefault();
		});
	}

	//Смещение по клику на кнопки
	function _setPositionByButton(destroy) {

		if(destroy === 'single') {
			_btnXUp.on('click', function() {_watermark.css({ left: _watermark.position().left + 2 }); _getNewCoordinates(); });
			_btnXDown.on('click', function() {_watermark.css({ left: _watermark.position().left - 2 }); _getNewCoordinates(); });
			_btnYUp.on('click', function() {_watermark.css({ top: _watermark.position().top + 2 }); _getNewCoordinates(); });
			_btnYDown.on('click', function() {_watermark.css({ top: _watermark.position().top - 2 }); _getNewCoordinates(); });
			console.log('CHECKED TO SINGLE');
		}
		else if(destroy === 'tile') {
			_btnXUp.on('click', function() { _setMarginsToWatermark('right plus', destroy); });
			_btnXDown.on('click', function() { _setMarginsToWatermark('right minus', destroy); });
			_btnYUp.on('click', function() { _setMarginsToWatermark('bottom plus', destroy); });
			_btnYDown.on('click', function() { _setMarginsToWatermark('bottom minus', destroy); });
			console.log('CHECKED TO TILE');	
		}
	}

	//Добавление отступов по клику на кнопки (button справа от инпутов с координатами)
	function _setMarginsToWatermark(oper, destroy) {
		if(destroy === 'tile') {
			var waterImgs = _watermark.find('img');
			var marginRight = waterImgs.css('margin-right');
			var marginBottom = waterImgs.css('margin-bottom');
			marginRight = parseInt(marginRight);
			marginBottom = parseInt(marginBottom);

			//console.log(marginRight);

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
	}

	//Установка координат в инпуты
	function _getNewCoordinates(){
		var
			newY = _watermark.position().top,
			newX = _watermark.position().left;

			_inputY.val(Math.round(newY));
  			_inputX.val(Math.round(newX));
	}

	//Удаляем слушатель событий с кнопок и запускаем соответствующее позиционирование
	function _unbindClick (btns, destroy) {
		$.each(btns, function () {
			$(this).unbind('click');
		});

		_setPositionByButton(destroy);
	}

	return {
		init: init
	}
})();
var inputPosition = (function () {
	// Рычаг
	var init = _setListeners;

	//Переменные среды
	var _inputY = $('#inputYMargin');
	var _inputX = $('#inputXMargin');
	var watermarks = $('#watermarkInsert').find('img');

	//Слушатель
	function _setListeners (destroy) {
		_inputY.on('keyup', _setMargY);
		_inputX.on('keyup', _setMargX);
		console.log('INPUT SET MARGIN READY');
	}

	//Вертикальные (снизу) марджины - инит и установка
	function _setMargY () {
		var margY = _inputY.val();
		_setMargs('bottom', margY);

	}

	//Горизонтальные (справа) марджины - инит и установка
	function _setMargX () {
		var margX = _inputX.val();
		_setMargs('right', margX);
	}

	//Функция для перебора ичем по переданным элементам
	function _setMargs (styleName, val) {
		$.each(watermarks, function (styleName, val) {
			if(styleName === 'bottom' && val >= 0) {
				$(this).css({
					'margin-bottom': val +'px'
				});
			} else if(styleName === 'right' && val >= 0) {
				$(this).css({
					'margin-right': val +'px'
				});
			}
			else {
				return false;
			}
		});
	}

	return {
		init: init
	}
})();

//Запускаем рычаг, если есть, зачем
if($('#inputYMargin').length > 0) {
	inputPosition.init('single');
}
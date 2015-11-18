var inputMargin = (function () {
	// Рычаг
	var init = _setListeners;
	var watermarks = null;

	//Переменные среды
	var _inputY = $('#inputYMargin');
	var _inputX = $('#inputXMargin');

	//Слушатель
	function _setListeners (destroy) {
		_inputY.on('keyup', _setMargY);
		_inputX.on('keyup', _setMargX);
		console.log('INPUT SET MARGIN READY');

		watermarks = $('#watermarkInsert').find('img');
		return watermarks;
	}

	//Вертикальные (снизу) марджины - инит и установка
	function _setMargY () {
		var margY = _inputY.val();
		$.each(watermarks, function () {
			$(this).css({
				'margin-bottom': margY +'px'
			});
		});
	}

	//Горизонтальные (справа) марджины - инит и установка
	function _setMargX () {
		var margX = _inputX.val();
		$.each(watermarks, function () {
			$(this).css({
				'margin-right': margX +'px'
			});
		});
	}

	return {
		init: init
	}
})();
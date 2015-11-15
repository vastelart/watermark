var inputPosition = (function () {
	// Рычаг
	var init = _setListeners;

	//Переменные среды
	var _inputY = $('#inputY');
	var _inputX = $('#inputX');
	var watermarkWrapper = $('#watermarkInsert');

	//Слушатель
	function _setListeners () {
		_inputY.on('change', _setCoords('top'));
		_inputX.on('change', _setCoords('left'));
		console.log('INPUT SET POSITION READY');
	}

	function _setCoords (pos) {
		var coords = _inputY.val();
		console.log('ИНПУТЫ');
		watermarkWrapper.css({
			pos: coords
		});
	}

	return {
		init: init
	}
})();

//Вызывается в модуле position.js
//Инициализируем модуль ввода координат для вотермарка
inputPosition.init();
var inputPosition = (function () {
	// Рычаг
	var init = _setListeners;

	//Переменные среды
	var _inputY = $('#inputY');
	var _inputX = $('#inputX');
	var watermarkWrapper = $('#watermarkInsert');

	//Слушатель
	function _setListeners () {
		_inputY.on('keyup', _setCoordsY);
		_inputX.on('keyup', _setCoordsX);
		//console.log('INPUT SET POSITION READY');
	}

	function _setCoordsY () {
		var coordsY = _inputY.val();
		watermarkWrapper.css({
			'top': coordsY +'px'
		});

	}
	function _setCoordsX () {
		var coordsX = _inputX.val();
		watermarkWrapper.css({
			'left': coordsX +'px'
		});

	}
	return {
		init: init
	}
})();

//Вызывается в модуле position.js
//Инициализируем модуль ввода координат для вотермарка
inputPosition.init();
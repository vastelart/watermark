var inputPosition = (function () {
	// Рычаг
	var init = _setListeners;

	//Переменные среды
	var _inputY = $('#inputY');
	var _inputX = $('#inputX');
	var watermarkWrapper = $('#watermarkInsert');
	var maxX = $('.main-img-inserted').width();
	var maxY = $('.main-img-inserted').height();

	//Слушатель ввода значений в инпуты
	function _setListeners () {
		_inputY.on('keyup', _setCoordsY);
		_inputX.on('keyup', _setCoordsX);
		console.log('INPUT SET POSITION READY');
	}

	//Устанавливаем значение позишена по X
	function _setCoordsY () {
		var coordsY = _inputY.val();
		watermarkWrapper.css({
			'top': coordsY +'px'
		});
	}

	//Устанавливаем значение позишена по Y
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
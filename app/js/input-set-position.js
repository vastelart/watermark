
var inputPosition = (function () {
	// Рычаг
	var init = _setListeners;

	//Переменные среды
	var _inputY = $('#inputY');
	var _inputX = $('#inputX');
	var watermarkWrapper = $('#watermarkInsert');

	//Слушатель
	function _setListeners (destroy) {
		if(destroy === 'tile') {
			console.log('INPUT MARGINS CONTROL');
		}
		else {
			_inputY.on('keyup', _setCoordsY);
			_inputX.on('keyup', _setCoordsX);
			console.log('INPUT SET POSITION READY');
		}
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


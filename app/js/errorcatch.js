var errorCatch = (function () {
	//Рычаг
	var init = _listener;

	//Переменные среды
	var danger = $('.danger'),
		dangerText = $('.danger__text'),
		dangerClose = $('.danger__close');

	function _listener(argument) {
		_abortUpload(argument);
	}

	function _abortUpload (message) {
		dangerText.text(message);
		danger.fadeIn(300);
		return false;
	}

	return {
		init: init
	}
})();
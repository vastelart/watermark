var errorCatch = (function () {
	//Рычаг
	var init = _listener;

	//Переменные среды
	var danger = $('.danger'),
		dangerText = $('.danger__text'),
		dangerClose = $('.danger__close');

	//Слушатель и функция показа контейнера с текстом ошибки. Сюда передается текст
	function _listener(argument) {
		_abortUpload(argument);
	}

	//Показывает скрытый контейнер с текстом ошибки наверху страницы
	function _abortUpload (message) {
		dangerText.text(message);
		danger.fadeIn(300);
		return false;
	}

	return {
		init: init
	}
})();
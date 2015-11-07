var langModule = (function () {

	//Рубильник
	var init = _listener;

	//Переменные среды
	//...

	//Слушаем языки по методике Илоны Давыдовой
	function _listener() {
		$(window).load(_getLang);
	}

	function _getLang() {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'js/lang.json', true);
		xhr.send();

		if (xhr.status === 200) {
			// вывести результат
			console.log(xhr.responseText); // responseText -- текст ответа.
		} else {
			// обработать ошибку
			console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
		}
	}

	return {
		init: init
	}
})();

langModule.init();
var langModule = (function () {

	//Рубильник
	var init = _listener;

	//Переменные среды
	var rus = $('#rus', '.languages__list');
	var eng = $('#eng', '.languages__list');
	var langPath = './lang.json';

	//Слушаем языки по методике Илоны Давыдовой
	function _listener() {
		rus.on('click', _getLang);
		eng.on('click', _getLang);
	}

	function _getLang(event) {

		//Отменяем событие бай дефолт и вешаем активный класс
		event.preventDefault();
		$('.languages__link_active', '.languages__list').removeClass('languages__link_active');
		$(this).addClass('languages__link_active');

		//Новый, прекрасный нативный XMLHttpRequest
		var lang = new XMLHttpRequest();
		
		//Нужный нам язык
		var langToSet = $(this).attr('id');

		lang.open('GET', langPath, true);

		lang.send(null);

		lang.onreadystatechange = function () {
			if (lang.readyState === 4 && lang.status === 200) {
				// Сменить язык
				//console.log(lang.responseText);

				//Парсим модный JSON
				var langResponse = JSON.parse(lang.responseText);

				//Объявляем переменную языка - будущего номера объекта в массиве файла lang.json
				var langInFile;

				//Определяем номер объекта языка в массиве файла lang.json
				switch(langToSet) {
					case 'rus':
						langInFile = 0
						break
					case 'eng':
						langInFile = 1
						break
				}

				//Устанавливаем язык
				_setLang(langResponse[langInFile]);

			} else {
				// Выдать в консоль полный крах и молча наблюдать дальше
				console.log('FAIL'); //он все равно выводит в консоль FAIL, причем дважды. даже при удачном запросе. подумать.
			}
		}
	}

	function _setLang(langSet) {
		for(var lang in langSet) {
			var el = document.querySelector('.' + lang + '');
			el.textContent = langSet[lang];
		}
	}

	return {
		init: init
	}
})();

langModule.init();
var switchModeForcer = (function () {

	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var singleMode = $('.form__view-link_single');
	var tileMode = $('.form__view-link_tile');
	var viewMode = $('.form__view-link');
	var positionRadios = $('.position__adjust-radio');
	var labelX = $('.label-x', '.position__adjust-sett');
	var labelY = $('.label-y', '.position__adjust-sett');
	var _linePositions = $('.linePositions', '.watermark-right');

	function _listener(actionplace) {
		if(actionplace === 'single') {
			console.log('SINGLE MODE');
			_setSingleMode;
		}
		else if(actionplace === 'tile') {
			console.log('TILE MODE OR FIRST INIT');
			_setTileMode;
		}
		console.log('SWICTH MODE FORCER');
	}

	function _setSingleMode() {

		//Состояние модуля позиционирования ставим в режим СИНГЛ
		position.init('single');
		//Включаем нужный режим управления с помощью ввода значений в инпуты
		inputPosition.init('single');
		//Разблокировка позишена вотермарка по радиобаттонам
		positionRadios.removeClass('disabled');
		//Убираем ненужные CSS-стили
		labelX.removeClass('label-x_tile');
		labelY.removeClass('label-y_tile');
		//Эти красные линии поверх радиобаттонов - скрываем
		_linePositions.fadeOut(300);

	}

	function _setTileMode () {
		//Устанавливаем состояние блока позиционирования
		position.init('tile');
		//Включаем нужный режим управления с помощью ввода значений в инпуты
		inputPosition.init('tile');
		//Блокируем позишен по радиобаттонам
		positionRadios.addClass('disabled');
		//Добавляем нужные CSS-стили
		labelX.addClass('label-x_tile');
		labelY.addClass('label-y_tile');
		//Эти красные линии поверх радиобаттонов - показываем
		_linePositions.fadeIn(300);
	}

	return {
		init: init
	}
})();
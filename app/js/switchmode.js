var switchModeCatcher = (function () {
	console.log('SWICTH MODE CATCHER');

	//Рычаг
	var init = _listener;

	//Переменные среды
	var submit = $('#submitBtn', '.watermark-right');
	var singleMode = $('.form__view-link_single');
	var tileMode = $('.form__view-link_tile');
	var viewMode = $('.form__view-link');
	var positionRadios = $('.position__adjust-radio');
	var labelX = $('.label-x', '.position__adjust-sett');
	var labelY = $('.label-y', '.position__adjust-sett');
	var _linePositions = $('.linePositions', '.watermark-right');

	//Для переключения функций кнопок (позишен/марджин)
	var
		_btnXUp = $('#XMarginPlus'),
		_btnXDown = $('#XMarginMinus'),
		_btnYUp = $('#YMarginPlus'),
		_btnYDown = $('#YMarginMinus'),
		_btnXUp_position = $('#XUp'),
		_btnXDown_position = $('#XDown'),
		_btnYUp_position = $('#YUp'),
		_btnYDown_position = $('#YDown');

	var margins = [_btnXUp,_btnXDown,_btnYUp,_btnYDown];
	var positions = [_btnXUp_position,_btnXDown_position,_btnYUp_position,_btnYDown_position];

	//Переменные для операций с вотермарком
	var mainImageWrapper = $('.main-image-insert');
	var clone = null,
		waterMark = $('.water-img-inserted'),
		waterWrapper = $('.watermark-insert');

	//Для вкл/выкл нужных инпутов
	var _inputY = $('#inputY'),
		_inputX = $('#inputX');
	var _inputYMargin = $('#inputYMargin'),
		_inputXMargin = $('#inputXMargin');

	var inputMargins = [_inputYMargin,_inputXMargin];
	var inputPositions = [_inputY,_inputX];

	//Слушатель
	function _listener(actionplace) {
		singleMode.on('click', _setModeOptions);
		tileMode.on('click', _setModeOptions);
		if(actionplace === 'single') {
			console.log('SINGLE MODE');
		}
		else if(actionplace === 'tile') {
			console.log('TILE MODE OR FIRST INIT');
		}
	}

	//Подготавливаем воркплейс к переключению режима
	function _setModeOptions() {
		var serve = $(this).find('input[type=radio]').val();
		
		//Меняем стили у кнопок режимов
		$.each(viewMode, function (index, value) {
			$(value).removeClass('active');
		});
		$(this).addClass('active');

		//Инициализируем нужное состояние модуля позишена, меняем CSS-стили у элементов
		switch(serve) {
			case 'tile':
				//Скрываем кнопки позишена, показываем кнопки марджинов
				$.each(positions, function() {$(this).hide();});
				$.each(margins, function() {$(this).show(); $(this).css({'display':'block'});});
				//Скрываем инпуты позишена, показываем инпуты марджинов
				$.each(inputPositions, function() {$(this).hide();});
				$.each(inputMargins, function() {$(this).show();});
				//Устанавливаем состояние блока позиционирования
				position.init('tile');
				//Отменяем драггабл режима сингл
				waterWrapper.draggable('destroy');
				//Марджины
				inputPosition.init('tile');
				//Блокируем позишен по радиобаттонам
				positionRadios.addClass('disabled');
				//Добавляем нужные CSS-стили
				labelX.addClass('label-x_tile');
				labelY.addClass('label-y_tile');
				//Эти красные линии поверх радиобаттонов - показываем
				_linePositions.fadeIn(300);
				//Устанавливаем режим ТАЙЛ - замощение
				_setTileMode();
				break;
			case 'single':
				//Скрываем кнопки марджинов, показываем кнопки позишена
				$.each(positions, function() {$(this).show();});
				$.each(margins, function() {$(this).hide();})
				//Скрываем инпуты марджинов, показываем инпуты позишена
				$.each(inputPositions, function() {$(this).show();});
				$.each(inputMargins, function() {$(this).hide();});
				//Подгоняем контейнер под размер вотермарка, чтобы избежать багов при переключении режимов с ТАЙЛ на СИНГЛ
				waterWrapper.width(waterWrapper.find('img').width());
				waterWrapper.height(waterWrapper.find('img').height());
				//
				_btnXUp.removeClass('margin_left-plus');
				//Лефт/топ позишен
				inputPosition.init('single');
				//Разблокировка позишена вотермарка по радиобаттонам
				positionRadios.removeClass('disabled');
				//Убираем ненужные CSS-стили
				labelX.removeClass('label-x_tile');
				labelY.removeClass('label-y_tile');
				//Эти красные линии поверх радиобаттонов - скрываем
				_linePositions.fadeOut(300);
				//Устанавливаем режим СИНГЛ - один вотермарк
				_setSingleMode();
				break;
			}
	}

	//Устанавливаем замощение
	function _setTileMode () {
		
		//Цепляем нужные значения для того, чтобы замостить вотермарк
		var waterWrapperWidth = waterWrapper.width(),
			waterWrapperHeight = waterWrapper.height(),
			waterMarkWidth = waterMark.width(),
			waterMarkHeight = waterMark.height();

		//Удваиваем высоту и ширину контейнера вотермарка
		waterWrapper.width(mainImageWrapper.width() * 2);
		waterWrapper.height(mainImageWrapper.height() * 2);

		//А вот это вычисление ратио клонирования можно оставить
		var countX = Math.round(waterWrapperWidth / waterMarkWidth);
		var countY = Math.round(waterWrapperHeight / waterMarkHeight);

		for (var i = 0, l = countY * countX; i < l; i++) {
			clone = waterMark.clone();

			//Плэйсим клоны в увеличенный контейнер вотермарка
			waterWrapper.append(clone);
			//Устанавливаем контроль марджинов через инпуты
			inputMargin.init();
		}

		//Устанавливаем новый драггаббл на контейнер с замощением
		waterWrapper.draggable();

		//Сбрасываем позишен контейнера вотермарков
		waterWrapper.css({
			'left': 0,
			'top': 0
		});

		//Переключаем ввод значений в инпуты на марджины
		inputPosition.init('tile');

		//Сбрасываем марджины и позишен у самого вотермарка
		_waterCSSReset();

		//Сбрасываем форму
		resetForm.init(true);

	}

	function _setSingleMode () {

		//Определяем количество изображений в контейнере вотермарка
		var tiledImages = waterWrapper.find('img');

		//Сбрасываем позишен у контейнера вотермарка
		waterWrapper.css({ left: 0, top: 0 });

		//Сбрасываем марджины и позишен у самого вотермарка
		_waterCSSReset();

		//Чистим контейнер от лишних вотермарков
		if(tiledImages.length > 1) {
			var rememberHtml = tiledImages[0];

			for(var im = 1; im < tiledImages.length; im++ ) {
				tiledImages[im].remove();
			}

			//Подключаем дрэггабл на вотермарк
			waterWrapper.draggable({
				containment: mainImageWrapper,
				//Передаем значение координат в инпуты
				drag: function() {
					var position = $(this).position();
					var posX = position.left;
					var posY = position.top;
					_inputY.val(Math.round(posY));
					_inputX.val(Math.round(posX));
				}
			});
		}

		//Сбрасываем значения инпутов
		_inputY.val(0);
		_inputX.val(0);
		
	}

	function _waterCSSReset() {
		waterMark.css({
			'left': 0,
			'top': 0,
			'margin-right': 0,
			'margin-bottom': 0
		});
	}

	return {
		init: init
	}
})();

if($('.form__view-link_tile').length > 0) {
	switchModeCatcher.init();
}
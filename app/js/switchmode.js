var switchModeCatcher = (function () {
	console.log('SWICTH MODE CATCHER');

	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var singleMode = $('.form__view-link_single');
	var tileMode = $('.form__view-link_tile');
	var viewMode = $('.form__view-link');
	var positionRadios = $('.position__adjust-radio');
	var labelX = $('.label-x', '.position__adjust-sett');
	var labelY = $('.label-y', '.position__adjust-sett');
	var _linePositions = $('.linePositions', '.watermark-right');
	var watermarkInput = $('.form-input__watermark');

	//+++
	var mainImageWrapper = $('.main-image-insert', '.watermark-left');
	var clone = null,
		waterMark = $('.water-img-inserted'),
		waterWrapper = $('.watermark-insert');
	var _inputY = $('.number__input-y'),
		_inputX = $('.number__input-x');

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

	function _setModeOptions() {
		var serve = $(this).find('input[type=radio]').val();
		
		$.each(viewMode, function (index, value) {
			$(value).removeClass('active');
		});

		$(this).addClass('active');

		//Инициализируем нужное состояние модуля позишена, меняем CSS-стили у элементов
		switch(serve) {
			case 'tile':
				//Устанавливаем состояние блока позиционирования
				position.init('tile');

				//Отменяем драггабл режима сингл
				waterWrapper.draggable('destroy');
				//Марджины
				controlMargin.init('tile');
				//Блокируем позишен по радиобаттонам
				positionRadios.addClass('disabled');
				//Добавляем нужные CSS-стили
				labelX.addClass('label-x_tile');
				labelY.addClass('label-y_tile');
				//Эти красные линии поверх радиобаттонов - показываем
				_linePositions.fadeIn(300);
				_setTileMode();
				break;
			case 'single':
				//Подгоняем контейнер под размер вотермарка, чтобы избежать багов при переключении режимов с ТАЙЛ на СИНГЛ
				waterWrapper.width(waterWrapper.find('img').width());
				waterWrapper.height(waterWrapper.find('img').height());
				//Лефт/топ позишен
				controlMargin.init('single');
				inputPosition.init('single');
				//Разблокировка позишена вотермарка по радиобаттонам
				positionRadios.removeClass('disabled');
				//Убираем ненужные CSS-стили
				labelX.removeClass('label-x_tile');
				labelY.removeClass('label-y_tile');
				//Эти красные линии поверх радиобаттонов - скрываем
				_linePositions.fadeOut(300);
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
		}

		//Устанавливаем новый драггаббл на контейнер с замощением
		waterWrapper.draggable();

		//Сбрасываем позишен контейнера вотермарков
		waterWrapper.css({
			'left': 0,
			'top': 0
		});

		waterMark.css({
			'left': 0,
			'top': 0,
			'margin-right': 0,
			'margin-bottom': 0
		});

		//Сбрасываем форму
		resetForm.init(true);

	}

	function _setSingleMode () {

		//Определяем количество изображений в контейнере вотермарка
		var tiledImages = waterWrapper.find('img');

		//Масштабируем контейнер
		//waterWrapper.width(waterWrapper.find('img').width());
		//waterWrapper.height(waterWrapper.find('img').height());
		waterWrapper.css({ left: 0, top: 0 });

		if(tiledImages.length > 1) {
			var rememberHtml = tiledImages[0];

			for(var im = 1; im < tiledImages.length; im++ ) {
				tiledImages[im].remove();
			}

			
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

		_inputY.val(0);
		_inputX.val(0);
		
	}

	return {
		init: init
	}
})();

if($('.form__view-link_tile').length > 0) {
	switchModeCatcher.init();
}
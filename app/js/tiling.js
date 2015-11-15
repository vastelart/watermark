var tilingModule = (function () {

	//Рычаг
	var init = _setListener;

	//Переменные среды
	var tileMode = $('.form__view-link_tile', '.watermark-right');
	var singleMode = $('.form__view-link_single', '.watermark-right');

	var mainImageWrapper = $('.main-image-insert', '.watermark-left');

	var clone = null,
		waterMark = $('.water-img-inserted'),
		waterWrapper = $('.watermark-insert');

	var _inputY = $('.number__input-y'),
		_inputX = $('.number__input-x');

	//Слушатель - большой УХ
	function _setListener () {
		tileMode.on('click', _setTileMode);
		singleMode.on('click', _setSingleMode);
		console.log('READY TO SET TILING MODE');
	}

	//Устанавливаем замощение
	function _setTileMode () {

		//Меняем логику поведения стрелок-контроллеров
		//controlPosition.init('destroy');
		//controlMargin.init();
		
		var waterWrapperWidth = waterWrapper.width(),
			waterWrapperHeight = waterWrapper.height(),
			waterMarkWidth = waterMark.width(),
			waterMarkHeight = waterMark.height();

		//Отменяем драггабл режима сингл
		waterWrapper.draggable('destroy');

		//Мне не очень понравился подход к математике Сергея из модного видео, поэтому просто умножаем все на три
		waterWrapper.width(mainImageWrapper.width() * 2);
		waterWrapper.height(mainImageWrapper.height() * 2);

		//А вот это вычисление ратио клонирования можно оставить
		var countX = Math.round(waterWrapperWidth / waterMarkWidth);
		var countY = Math.round(waterWrapperHeight / waterMarkHeight);

		for (var i = 0, l = countY * countX; i < l; i++) {
			clone = waterMark.clone();

			//Плэйсим клонов в увеличенный контейнер вотермарка
			waterWrapper.append(clone);
		}

		//Устанавливаем новый драггаббл на контейнер с замощением
		waterWrapper.draggable({
			drag: function(){
	            var position = $(this).position();
	            var posX = position.left;
	            var posY = position.top;
	            Math.round(_inputY.val(posY));
	            Math.round(_inputX.val(posX));
        	}
		});

		//Сбрасываем позишен контейнера вотермарков
		waterWrapper.css({
			left: 0,
			top: 0
		});

		//Сбрасываем форму
		resetForm.init(true);

	}

	function _setSingleMode () {

		//Меняем логику поведения стрелок-контроллеров
		//controlPosition.init();
		//controlMargin.init('destroy');

		var tiledImages = waterWrapper.find('img');

		waterWrapper.width(waterWrapper.find('img').width());
		waterWrapper.height(waterWrapper.find('img').height());
		waterWrapper.css({ left: 0, top: 0 });

		if(tiledImages.length > 1) {
			var rememberHtml = tiledImages[0];

			for(var im = 1; im < tiledImages.length; im++ ) {
				tiledImages[im].remove();
			}

			//waterWrapper.html('<img src="' + rememberHtml.src + '" class="' + rememberHtml.class + '">');
			waterWrapper.draggable({
				containment: mainImageWrapper
			});
		}
		
	}

	return {
		init: init
	}
})();

tilingModule.init();
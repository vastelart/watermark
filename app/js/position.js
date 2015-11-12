var position = (function () {
		//определение переменных
		var
			_container = $('.main-img-inserted'),
			_watermark = $('#watermarkInsert'),
			_inputY = $('.number__input-y'),
			_inputX = $('.number__input-x'),
			_defY = $('.number__input-y').val(0),
			_defX = $('.number__input-x').val(0);
			
	//Рычаг
	var init = _setUpListners;

	 //слушатели событий

	function _setUpListners (actionplace) {
		$(document).ready(_Drag);
		//Сообщаем любителям смотреть в консоль, какой сейчас режим - сингл или тайл
		console.log('POSITION IS ' + actionplace);
		switch(actionplace) {
			case 'single':
				//Устанавливаем функционал кнопок позиционирования - смещение по вертикали/горизонтали
				_setPositionByButton;
				break;
			case 'tile':
				//Устанавливаем функционал кнопок позиционирования - добавление отступов замощенному вотермарку
				_setMarginsToWatermark;
		}
	}
	//инициализация драг метода и передача координат в инпуты
	function _Drag(){

		_watermark.draggable({
			containment: _container,

			drag: function(){
            var position = $(this).position();
            var posX = position.left;
            var posY = position.top;
            Math.round(_inputY.val(posY));
            Math.round(_inputX.val(posX));
        }
		});
		};
		//определение radio buttons
		var
			boxLabel = $('.position__box-label'),
			leftTop = boxLabel.eq(0);
			middleTop = boxLabel.eq(1),
			rightTop = boxLabel.eq(2),
			leftMiddle = boxLabel.eq(3),
			middleMiddle = boxLabel.eq(4),
			rightMiddle = boxLabel.eq(5),
			leftBottom = boxLabel.eq(6),
			middleBottom = boxLabel.eq(7),
			rightBottom = boxLabel.eq(8),
			contain = $(".main-image-insert");

	//Устанавливаем листенеры на радиобаттоны именно здесь
	//верхний левый
	_setPositionRadio(leftTop, "left top", "left top", contain);
	//верхний средний
	_setPositionRadio(middleTop, "center top", "center top", contain);
	//верхний правый
	_setPositionRadio(rightTop, "right top", "right top", contain);
	//левый средний
	_setPositionRadio(leftMiddle, "left center", "left center", contain);
	//средний средний
	_setPositionRadio(middleMiddle, "center center", "center center", contain);
	//правый средний
	_setPositionRadio(rightMiddle, "right center", "right center", contain);
	// левый нижний
	_setPositionRadio(leftBottom, "left bottom", "left bottom", contain);
	// средний нижний
	_setPositionRadio(middleBottom, "center bottom", "center bottom", contain);
	// правый нижний
	_setPositionRadio(rightBottom, "right bottom", "right bottom", contain);

	//Функция для позиционирования по радиобаттонам
	function _setPositionRadio(button, my, at, contain) {
		button.on('click', function() {
			_watermark.position({
				my: my,
  				at: at,
  				of: contain,
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	}

	//получение координат после нажатия на radiobutton и передача их в инпуты (button слева от инпутов с координатами)
	function _getNewCoordinates(){
		var
			newY = _watermark.position().top,
			newX = _watermark.position().left;

			Math.round(_inputY.val(newY));
  			Math.round(_inputX.val(newX));
	}

	//Смещение по клику на кнопки
	function _setPositionByButton() {
		console.log('СМЕЩЕНИЕ');
	}

	//Добавление отступов по клику на кнопки (button слева от инпутов с координатами)
	function _setMarginsToWatermark() {
		console.log('МАРДЖИНЫ');
	}


	return {
		init: init
	};

})();
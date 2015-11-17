var position = (function () {
		//определение переменных
		var
			_container = $('.main-img-inserted'),
			_watermark = $('.water-img-inserted'),
			_inputY = $('.number__input-y'),
			_inputX = $('.number__input-x'),
			_defY = $('.number__input-y').val(0),
			_defX = $('.number__input-x').val(0),
			_btnXUp = $('#XUp'),
			_btnXDown = $('#XDown'),
			_btnYUp = $('#YUp'),
			_btnYDown = $('#YDown'),
			_posBtns = $('.sett-up, .sett-down');
			
	//Рычаг
	var init = _setUpListners;

	 //слушатели событий

	function _setUpListners (actionplace) {
		$(document).ready(_Drag);
		//Сообщаем любителям смотреть в консоль, какой сейчас режим - сингл или тайл
		console.log('POSITION IS ' + actionplace);

		//Клик на кнопки позиционирования
		actionplace === 'single' ? controlMargin.init('single') : controlMargin.init('tile');

		//Отменяем событие бай дефолт при клике по button
		_posBtns.on('click', function (event) {
			event.preventDefault();
		});
	}
	//инициализация драг метода и передача координат в инпуты
	function _Drag(){

		_watermark.draggable({
			containment: _container,

				drag: function(){
	            var position = $(this).position();
	            var posX = position.left;
	            var posY = position.top;
	            _inputY.val(Math.round(posY));
	            _inputX.val(Math.round(posX));
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
			contain = $(".main-img-inserted");

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
			_doSmthSerious();
		});
	}

	
	//получение координат после нажатия на radiobutton и передача их в инпуты (button слева от инпутов с координатами)
	function _getNewCoordinates(){
		var
			newY = _watermark.position().top,
			newX = _watermark.position().left;

			_inputY.val(Math.round(newY));
  			_inputX.val(Math.round(newX) - 1);
	}

	function _doSmthSerious () {
		// body...
	}


	return {
		init: init
	};

})();
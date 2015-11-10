var position = (function () {
		//определение переменных
		var
			_container = $('.main-img-inserted'),
			_watermark = $('#watermarkInsert'),
			_inputY = $('.number__input-y'),
			_inputX = $('.number__input-x'),
			_defY = $('.number__input-y').val(0),
			_defX = $('.number__input-x').val(0);
			
	
	function init () {
		_setUpListners();
	}

	 //слушатели событий

	function _setUpListners () {
		_watermark.on('mouseover', _Drag);
		$(document).ready(_Drag);
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
			rightBottom = boxLabel.eq(8);
	//верхний левый
	leftTop.on('click', function() {
			_watermark.position({
				my: "left top",
  				at: "left top",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	//верхний средний
	middleTop.on('click', function() {
			_watermark.position({
				my: "center top",
  				at: "center top",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	//верхний правый
	rightTop.on('click', function() {
			_watermark.position({
				my: "right top",
  				at: "right top",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	//левый средний
	leftMiddle.on('click', function() {
			_watermark.position({
				my: "left center",
  				at: "left center",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	//средний средний
	middleMiddle.on('click', function() {
			_watermark.position({
				my: "center center",
  				at: "center center",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	//правый средний
	rightMiddle.on('click', function() {
			_watermark.position({
				my: "right center",
  				at: "right center",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	// левый нижний
	leftBottom.on('click', function() {
			_watermark.position({
				my: "left bottom",
  				at: "left bottom",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	// средний нижний
	middleBottom.on('click', function() {
			_watermark.position({
				my: "center bottom",
  				at: "center bottom",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	// правый нижний
	rightBottom.on('click', function() {
			_watermark.position({
				my: "right bottom",
  				at: "right bottom",
  				of: ".main-image-insert",
  				collision: "fit"
			});
			_getNewCoordinates();
		});
	//получение координат после нажатия на radiobutton и передача их в инпуты
	function _getNewCoordinates(){
		var
			newY = _watermark.position().top,
			newX = _watermark.position().left;

			Math.round(_inputY.val(newY));
  			Math.round(_inputX.val(newX));
	}
		//добавление стрелок виджетом spinner
		//задание мин. и макс. размеров контейнера, 
		//перемещение объекта стрелками, 
		//передача координат в инпуты,
		//ввод значения в инпут и перемещение объекта при потере фокуса
		var spinnerY = _inputY.spinner({
			max:_container.height() - _watermark.height(),
			min:0,
			change:function(ev, ui) {
					var cval = this.value;
					_watermark.css({
					top: cval + 'px'
				});
			},
			spin:function(e, ui) {
				var sval = ui.value;
				_watermark.css({
				top: sval + 'px'
				});
			}
		}),
			spinnerX = _inputX.spinner({
			max:_container.width()-_watermark.width(),
			min:0,
			change:function(ev, ui) {
					var cval = this.value;
					_watermark.css({
					left: cval + 'px'
				});
			},
			spin:function(event, ui) {
					var sval = ui.value;
					_watermark.css({
					left: sval + 'px'
				});
			}
		});
	
	return {
		init: init
	};

})();


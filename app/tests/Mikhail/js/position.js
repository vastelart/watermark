var position = (function () {

		var
			_watermark = $('.watermark__image'),
			_top = $('.button__up-y'),
			_bottom = $('.button__down-y'),
			_left = $('.button__up-x'),
			_right = $('.button__down-x'),
			_inputY = $('.number__input-y'),
			_inputX = $('.number__input-x');


	
	function init () {
		_setUpListners();
	}

	
	function _setUpListners () {
		_watermark.on('mouseover', _Drag);
		_watermark.on('dragMove', _getCoordinates );
		//_top.on('click', _changePositionYup );
		//_bottom.on('click', _changePositionYdown );
		//_left.on('click', _changePositionXup );
		//_right.on('click', _changePositionXdown );
	}

	var _Drag = function(){
		var
			$this = $(this);
		
		$this.draggabilly({
			containment: '.watermark__container'
			});
		};

	function _getCoordinates(y){
		var 
			drag = _watermark.data('draggabilly'),
			y = drag.position.y,
			x = drag.position.x;
  		
  		_inputY.val(y);
  		_inputX.val(x);

	}

	// function _changePositionYdown(y,x){
	// 	var
	// 		position = _watermark.position,
	// 		y = position.y+=10,
	// 		x = position.x;

	// 		console.log(y, x);


		// var 
		// 	watermark = $('.watermark__image');
		// 	draggie = watermark.data('draggabilly');
		// 	offset = draggie.position.y-=10;
		
		// $('.number__input-y').val(offset);
		//_getCoordinates(y,x);
	// }
	
	// function _changePositionYup (){
	// 	var
	// 		watermark = $('.watermark__image');
	// 		offset = watermark.offset();
	// 	watermark.animate({top:"-=10"});
	// 	$('.number__input-y').val(offset.top);
	// }
	// var _changePositionXup = function(){
	// 	var
	// 		watermark = $('.watermark__image');
	// 		offset = watermark.offset();
	// 	watermark.animate({left:"-=10"});
	// 	$('.number__input-x').val(offset.left);
	// }
	// var _changePositionXdown = function(){
	// 	var
	// 		watermark = $('.watermark__image');
	// 		offset = watermark.offset();
	// 	watermark.animate({left:"+=10"});
	// 	$('.number__input-x').val(offset.left);
	// }
	
	return {
		init: init
	};

})();


position.init();


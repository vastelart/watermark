var tile = (function () {
		//определение переменных	
	
	function init () {
		_setUpListners();
	}

	function _setUpListners () {
		$('.form__view-link').on('click', _changeView);		
	}

	function _changeView() {
		var index = $('.form__view-link').index(this);
			if (index == 1){
        		console.log("1rd element is checked!");
			}else{
				console.log("2rd element is checked!");
			}
	}
	
	return {
		init: init
	};

})();

tile.init();
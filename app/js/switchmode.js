var switchModeCatcher = (function () {
	console.log('SWICTH MODE CATCHER');

	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var singleMode = $('.form__view-link_single');
	var tileMode = $('.form__view-link_tile');
	var viewMode = $('.form__view-link');
	var positionRadios = $('.position__adjust-radio');

	function _listener(actionplace) {
		singleMode.on('click', _setServerData);
		tileMode.on('click', _setServerData);
		if(actionplace === 'single') {
			console.log('SINGLE MODE');
		}
		else {
			console.log('TILE MODE');
		}
	}

	function _setServerData() {
		var serve = $(this).find('input[type=radio]').val();
		
		$.each(viewMode, function (index, value) {
			$(value).removeClass('active');
		});

		$(this).addClass('active');

		//Инициализируем нужное состояние модуля позишена
		switch(serve) {
			case 'tile':
				position.init('tile');
				positionRadios.addClass('disabled');
				break;
			case 'single':
				position.init('single');
				positionRadios.removeClass('disabled');
				break;
			}
	}

	return {
		init: init
	}
})();

switchModeCatcher.init();
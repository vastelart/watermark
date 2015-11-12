var switchModeCatcher = (function () {
	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var viewMode = $('.form__view-link');

	function _listener(actionplace) {
		viewMode.on('click', _setServerData);
		if(actionplace === 'single') {
			console.log('SINGLE MODE');
		}
		else {
			console.log('TILE MODE');
		}
		console.log('SWICTH MODE CATCHER');
	}

	function _setServerData(actionplace) {
		var serve = $(this).find('input[type=radio]').val();
		
		$.each(viewMode, function (index, value) {
			$(value).removeClass('active');
		});

		$(this).addClass('active');

		//Инициализируем нужное состояние модуля позишена
		switch(serve) {
			case 'tile':
				position.init('tile');
				break;
			case 'single':
				position.init('single');
				break;
			}
	}

	return {
		init: init
	}
})();

switchModeCatcher.init();
var switchModeCatcher = (function () {
	var init = _listener;

	var submit = $('#submitBtn', '.watermark-right');
	var single = 'php/toserver.php';
	var tile = 'php/tiletest.php';
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

		//Устанавливаем нужный data-server атрибут кнопке Скачать
		switch(serve) {
			case 'tile':
				submit.attr('data-server', tile);
				position.init('tile');
				break;
			case 'single':
				submit.attr('data-server', single);
				position.init('single');
				break;
			}
	}

	return {
		init: init
	}
})();

switchModeCatcher.init();
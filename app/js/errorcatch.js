var errorCatch = (function () {
	
	var init = _listener;

	function _listener(argument) {
		console.log(argument);
	}

	return {
		init: init
	}
})();

if($('body').length > 0) {
	errorCatch.init('ГРАНУЛИРОВАННЫЙ КОФЕ');
}
(function () {

	var form = document.getElementById('theForm');
	var submit = document.getElementById('submit');
	var sends = new FormData(form);

	sends.append('placeaction', 'sing');

	submit.addEventListener('click', reliz, true);

	function reliz() {
		fetch('/action.php', {
			method: 'post',
			body: sends
		})
		.then(function(response) {
			console.log(response);
		});

		console.log(sends);
	}

})();
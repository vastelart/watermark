(function () {

	var form = document.getElementById('theForm');
	var submit = document.getElementById('submit');

	var formData = new FormData(form);
	
	submit.addEventListener('click', _reliz, true);

	function _reliz() {
		console.log(formData);
		var reliz = new XMLHttpRequest();
		
		reliz.open('POST', 'action.php', true);
		reliz.send(formData);

		reliz.onreadystatechange = function () {
			if(reliz.readyState === 4 && reliz.status === 200) {
				console.log(reliz.responseText);
			}
		}
	}

})();
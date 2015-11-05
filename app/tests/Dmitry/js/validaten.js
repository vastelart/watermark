// Объявление модуля
var valadationFileUpload = (function () {

	// Инициализирует наш модуль
	var init = function () {
		_setUpListners();
	};

	// Прослушивает события
	var _setUpListners = function () {
		$('form').on('keydown', '.error', _removeError);
		$('form').on('reset', _clearForm);
	};

	var _removeError = function () {
			$(this).removeClass('error');
		};

		var _clearForm = function (form) {
			var form = $(this);
			form.find('input, textarea, .input').trigger('hideTooltip');
			form.find('.error').removeClass('error');
		};



// =================== Создает тултипы ===================== //

	var _createQtip = function (element, position) {

			//позиция тултипа
			if(position === 'right'){
				position = {
					my: 'left center',
					at: 'right center'
				};
			}else{
				position = {
					my: 'right center',
					at: 'left center'
				};
			}

//================ инициализация тултипа =============== //

				element.qtip({
					content: {
						text: function () {
							return $(this).attr('qtip-content');
						}
					},
					show: {
						event: 'show'
					},
					hide: {
						event: 'keydown hideTooltip'
					},
					position: position,
					style: {
						classes: 'qtip-mystyle qtip-rounded',
						tip: {
							height: 10, // примерное значения
							width: 15 // примерное значение
						}
					}
				}).trigger('show');
	};

// ====================== Универсальня функция ======================= //

var validateForm = function (form) {


var elements = form.find('input').not('input[type="file"],input[type="submit"],input[type="reset"],input[type="hidden"]'),
	valid = true;

	// Пройдемся по всем элементам формы
	$.each(elements, function (index, val) {
		var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position'),

				// ЗАДАЕМ ПЕРЕМЕННУЮ ДЛЯ ПРОВЕРКИ ФАЙЛА
				isFile = element.attr('id') == 'filename';

				// ПИШЕМ УСЛОВИЕ ДЛЯ ПРОВЕРКИ ФАЙЛА
				if(isFile) {
					val = _isImg(val) ? val:'';
				}

				if (val.length === 0) {
					element.addClass('error');
					_createQtip(element, pos);
					valid = false;
				}


	});

	return valid;
},
			// ========= ПРОВЕРЯЕМ ЧТО ФАЙЛ КАРТИНКА ========== //
				_isImg = function (filename) {
			return /\.(jpeg|jpg|png|gif)$/i.test(filename);
		};


// Возвращаем объект (публичные методы)
	return {
		init: init,
		validateForm : validateForm
	};

})();

// Вызов модуля
valadationFileUpload.init();

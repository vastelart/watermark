
$(function () {
    'use strict';

    // Initialize the jQuery File Upload widget:
    $('#mainImg, #waterMark', '.btn').fileupload({  
        url: '/php/'
    });
});


//===========================================================Объявление модуля================================================
var myModale = (function () {

	// Инициализирует наш модуль
	var init = function () {
		_setUpListners();
	};

	// Прослушивает события
	var _setUpListners = function () {
		$('#filename').on('change', _changeFileUpload); // Добавление файла
		_uploadSrcImg();
	};



	var _uploadSrcImg = function () {
		   $('.form-input__origin-file').fileupload({
            url: "/upload.php",
            add: function (e, data) {

                var inputFake = $(this)
                    .closest('.form__upload')
                    .find('.form-input__fake');

                inputFake.val(data.files[0].name);

                var $this = $(this);
                var targetImg = null;
                var uploader = $this.closest('.form__upload');


                if (uploader.hasClass('form-input__origin')) {
                    targetImg = $('.workspace__src-img')[0];
                    $('#filename_watermark')
                        // .removeClass('disabled')
                        .find('.form-input__origin-file')
                        .removeAttr('disabled');

                } else if (uploader.hasClass('form__upload_watermark')) {
                    targetImg = $('.workspace__watermark-img')[0];
                }


                if (data.files && data.files[0]) {
                    var reader = new FileReader();
                    var img = new Image();

                    reader.onload = function (e) {
                        $(targetImg).attr('src', e.target.result)
                    };
                    reader.readAsDataURL(data.files[0]);


                }

            }

        });
	};

	var srcImg = $('.workspace__src-img');
    var srcImgHeight = srcImg.height();
    var srcImgWidth = srcImg.width();

    var ratio = srcImgWidth/srcImgHeight;
    // console.log(ratio);

    var previewWrap = $('.workspace__preview--wrap');
    var previewWrapHeight = previewWrap.height();
    var previewWrapWidth = previewWrap.width();


  // Изменяем файл аплоад
  var _changeFileUpload = function() {
    var    input = $(this), // type="file"
        filename = input.val(); // имя загруженного элемента
        filename = getNameFromPath(filename); // Передаем функции значения input

        // Получаем названия файла из пути
        function getNameFromPath () {
          return filename.replace(/\\/g, '/').replace(/.*\//, ''); // Получаем названия файла из пути
        }

        $('#filename')
          .val(filename)
          .trigger('hideTooltip')
          .removeClass('error');

  };

  //Добовляет проект
  var _addForm = function(ev) {
    console.log('добавление проекта');
    ev.preventDefault();

    //Объявляем переменные
    var form = $(this),
      url = 'add_project.php',
      defObj = _ajaxForm(form, url);

    if (defObj) {
      defObj.done(function(ans) {
        var successBox = form.find('.success-mes'),
          errorBox = form.find('.error-mes');

        if (ans.status === 'OK') {
          errorBox.hide();
          successBox.text(ans.text).show();
        } else {
          successBox.hide();
          errorBox.text(ans.text).show();
        }
      });
    }
  };

  //Универсальная функция
  //1.Собирает данные из формы
  //2.проверяет форму
  //3.Делает запрос на сервер и возвращает ответ с сервера

  var _ajaxForm = function(form, url) {

  if (!valadationFileUpload.validateForm(form)) return false;

  //1. собрать данные из формы
  //2. проверить форму
  //3. вернуть ответ с сервера
  // if(!valid) return false;

  data = form.serialize();

  var result = $.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: data,
  });
  return result;
};


	// Возвращаем объект (публичные методы)
	return {
		init: init
	};

})();

// Вызов модуля
myModale.init();



// ===========================================Объявление модуля=============================================
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
						classes: 'qtip-rounded',
						tip: {
							height: 10, // примерное значения
							width: 15 // примерное значение
						}
					}
				}).trigger('show');
	};

// ====================== Универсальня функция ======================= //

var validateForm = function (form) {


var elements = form.find('input').not('input[type="submit"],input[type="reset"],input[type="hidden"]'),
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

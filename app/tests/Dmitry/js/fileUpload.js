// Объявление модуля
var myModale = (function () {

	// Инициализирует наш модуль
	var init = function () {
		_setUpListners();
    _changeFileUpload();
	};

	// Прослушивает события
	var _setUpListners = function () {
		$('#fileUpload').fileupload('change', _changeFileUpload); // Добавление файла
	};


    $('#fileupload').fileupload({
        url: 'main_server/php/',
				add: function(e, data) {
            data('submit');
				},

				done: function(e, data) {

          var img = $('<img></img>'),
              uploadImg = data.result.files[0];

          img.attr('src', uploadImg.url);
          img.appendTo('.uploadfile-img');
				}
    });



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

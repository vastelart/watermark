   $(function () {
       'use strict';

     $('.fileupload').fileupload({
        url:'action.php',
         add: function (e, data) {
             data.sibmit();
             consol.log('data');
         },

             done: function(e, data){

                 var img = $('<img></img>'),
                     uploadImg = data.result.files[0];

                 $('.upload-title').text(uploadImg.name);
                 img.attr('src',uploadImg.url);
                 img.appendTo('.upload-img');
                 consol.log('data2');
             }
             //$.each(data.result.files, function (index, file) {
             //    $('<p/>').text(file.name).appendTo(document.body);

     });
 });
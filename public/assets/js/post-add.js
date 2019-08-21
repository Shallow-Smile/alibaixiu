//向服务器发送请求
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    var html = template('categoryTpl', { data: response });
    $('#category').html(html)
  }
});

$('#feature','#features').on('change', function () {
  var file = this.files[0];
  var formData = new FormData();
  formData.append('cover', file);
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (res) {
      console.log(res);
      $('#thumbnail').val(res[0].cover);
    }
  });
});

$('#addForm').on('submit', function () {
  var formData = $(this).serialize();

  $.ajax({
    type: 'post',
    url: '/posts',
    data: formData,
    success: function (res) {
      location.href = "/admin/posts.html"
      console.log(res);
      
    }
  });
  return false;
});

var id = getUrlParams('id');

if (id != -1) {
  $.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function (res) {
      $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
          res.response = response;
          var html = template('modifyTpl', res);
          $('#formBox').html(html);
        }
      });

    }
  })
}

//从浏览器地址栏中获取查询参数
function getUrlParams(name) {
  var paramsArry = location.search.substr(1).split('&');

  for (var i = 0; i < paramsArry.length; i++) {
    var params = paramsArry[i].split('=');
    if (params[0] == name) {
      return params[1];
    }
  }
  return -1;
  //  console.log(each(params.join('=')));
}

$('#formBox').on('submit', '#modifyForm', function () {
  var formData = $(this).serialize();
 var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: formData,
    success: function (res) {
      // location.href = 'posts.html';
      console.log(res);
      
    }

  })
  return false;
});
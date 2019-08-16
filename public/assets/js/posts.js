$.ajax({
  type: 'get',
  url: '/posts',
  success: function (res) {
    var html = template('postsTpl', res);
    $('#formData').html(html);
    var page = template('pageTpl', res);
    $('#pageData').html(page);
  }
});

//日期转换
function formateDate(date) {
  var date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

//分页操作
function changePage(page) {
  $.ajax({
    type: 'get',
    url: '/posts',
    data: {
      page
    },
    success: function (res) {
      var html = template('postsTpl', res);
      $('#formData').html(html);
      var page = template('pageTpl', res);
      $('#pageData').html(page);
    }

  });
};

//筛选操作
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (res) {
    var category = template('categoryTpl', { data: res });
    $("#category").html(category);
  }
});

$('#filterForm').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'get',
    url: '/posts',
    data: formData,
    success: function (res) {
      var html = template('postsTpl', res);
      $('#formData').html(html);
      var page = template('pageTpl', res);
      $('#pageData').html(page);
    }
  });

  return false;
});


//删除操作
$('#formData').on('click', '.delete', function () {
  if (confirm('是否确认删除')) {
      var id = $(this).attr('data-id');
      $.ajax({
          type: 'delete',
          url: '/posts/' + id,
          success: function () {
              location.reload();
          }
      });
  };
});


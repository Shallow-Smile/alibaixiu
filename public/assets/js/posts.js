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


console.log('bug   路由中没有批量删除验证 无法进行批量删除操作')
// $('#checkAll').on('change', function () {
//   var result = $(this).prop('checked');
//   $('#formData input:checkbox').prop('checked', result);
//   $('#deleteMany').attr('disabled', !result);

// });
// $('#formData').on('change', 'input:checkbox', function () {
//   var checkedLen = $('#formData input:checkbox:checked').length;
//   $('#checkAll').prop('checked', $('#formData input:checkbox').length == checkedLen);
//   $('#deleteMany').attr('disabled', checkedLen <= 0);
// });

// //批量删除操作
// $('#deleteMany').click(function () {
//   var arr = [];
//   var checkedUser = $('#formData input:checked');
//   checkedUser.each(function (index, res) {
//     arr.push($(res).attr('data-id'));
//   });
//   if (confirm('是否确认批量删除')) {
//     $.ajax({
//       type: 'delete',
//       url: '/posts/' + arr.join('-'),
//       success: function () {
//         location.reload();
//       }
//     });
//   };
// });
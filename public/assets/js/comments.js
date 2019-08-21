$.ajax({
  type: 'get',
  url: '/comments',
  success: function (response) {
    // 将服务器端返回的数据和HTML模板进行拼接
    console.log(response);
    var html = template('listTpl', response);
    // 将拼接好的内容放到页面中
    $('#listBox').html(html);
    var page = template('pageTpl', response);
    $('#pageBox').html(page);
  }
});

//分页操作
function changePage(page) {
  $.ajax({
    type: 'get',
    url: '/comments',
    data: {
      page
    },
    success: function (res) {
      var html = template('listTpl', res);
      $('#listBox').html(html);
      var page = template('pageTpl', res);
      $('#pageBox').html(page);
    }

  });
};

$('#listBox').on('click', '.status', function () {
  var state = $(this).attr('data-state');
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/comments/' + id,
    data:{
      state:state == 0 ? 1 : 0
    },
    success: function () {
      location.reload();
    }
  });
});


//删除操作
$('#listBox').on('click', '.delete', function () {
  if (confirm('是否确认删除？')) {
    // 获取要删除的分类数据id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求 删除分类数据
    $.ajax({
      type: 'delete',
      url: '/comments/' + id,
      success: function () {
        location.reload();
      }
    });
  };
});



console.log('bug 路由中没有批量删除验证');

//全选操作
// $('#checkAll').on('change', function () {
//   var result = $(this).prop('checked');
//   $('#listBox input:checkbox').prop('checked', result);
//   $('#deleteMany').attr('disabled', !result);
// });
// $('#listBox').on('change', 'input:checkbox', function () {
//   var checkedLen = $('#listBox input:checkbox:checked').length;
//   $('#checkAll').prop('checked', $('#listBox input:checkbox').length == checkedLen);
//   $('#deleteMany').attr('disabled', checkedLen <= 0);
// });

// $('#checkAll').on('change', function () {
//   var result = $(this).prop('checked');
//   $('#listBox input:checkbox').prop('checked', result);
//   $('#deleteMany').attr('disabled', !result);

// });
// $('#listBox').on('change', 'input:checkbox', function () {
//   var checkedLen = $('#listBox input:checkbox:checked').length;
//   $('#checkAll').prop('checked', $('#listBox input:checkbox').length == checkedLen);
//   $('#deleteMany').attr('disabled', checkedLen <= 0);
// });

// //批量删除操作
// $('#deleteMany').click(function () {
//   var arr = [];
//   var checkedUser = $('#listBox input:checked');
//   checkedUser.each(function (index, res) {
//     arr.push($(res).attr('data-id'));
//   });
//   if (confirm('是否确认批量删除')) {
//     $.ajax({
//       type: 'delete',
//       url: '/comments/' + arr.join('-'),
//       success: function () {
//         location.reload();
//       }
//     });
//   };
// });


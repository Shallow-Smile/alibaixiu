//图片上传
$('#file').on('change', function () {
  var file = this.files[0];
  var formData = new FormData();
  formData.append('image', file);
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $('#image').val(response[0].image);
    }
  });
});

//图片录播模块提交
$('#slidesForm').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/slides',
    data: formData,
    success: function () {
      location.reload();
    }
  });
  return false;
});

//链接下拉菜单
$.ajax({
  type: 'get',
  url: '/posts',
  success: function (res) {
    // console.log(res);
    
    var html = template('selectTpl', res);
    $('#link').html(html);
    console.log(html)
  }
});

//渲染轮播图表单
$.ajax({
  type: 'get',
  url: '/slides',
  success: function (res) {
    console.log(res);
    var html = template('slidesTpl', { data: res });
    $('#slidesBox').html(html)
  }
});

//轮播图删除操作
$('#slidesBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id');
  if(confirm('是否确认删除?')){
    $.ajax({
      type: 'delete',
      url: '/slides/' + id,
      success: function () {
        location.reload();
      }
    });
  }
});
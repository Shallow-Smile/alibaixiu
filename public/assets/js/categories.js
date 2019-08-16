$('#addCategory').on('submit', function () {
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/categories',
    data: formData,
    success: function () {
      location.reload();
    }
  });

  return false;
});

$.ajax({
  type: 'get',
  url: '/categories',
  success: (response) => {
    var html = template('categoryListTpl', { data: response });
    $("#categoryBox").html(html);
  }
});

$("#categoryBox").on('click', '.edit', function () {
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'get',
    url: '/categories/' + id,
    success: function (res) {
      var html = template('modifyCategoryTpl', res);
      $('#formBox').html(html);
    }
  });
});

$('#formBox').on('submit', '#modifyCategory', function () {
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
    type: 'put',
    url: '/categories/' + id,
    data: formData,
    success: () => {
      location.reload();
    }
  })
  return false;
});

$("#categoryBox").on('click', '.delete', function () {
  var id = $(this).attr('data-id');
  if(confirm('确认删除？')){
    $.ajax({
      type: 'delete',
      url: '/categories/' + id,
      success: function () {
        location.reload();
      }
    });
  }
});

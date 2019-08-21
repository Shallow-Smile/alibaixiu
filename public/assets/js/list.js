var categoryId = getUrlParams('categoryId');


$.ajax({
  type: 'get',
  url: '/posts/category/' + categoryId,
  success: function (res) {
    console.log(res);
    var html = template('listTpl', {data:res});
    $('#listBox').html(html)
  }
});
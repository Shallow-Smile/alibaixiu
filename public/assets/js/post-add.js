//向服务器发送请求
$.ajax({
  type:'get',
  url: '/categoties',
  success: function(response){
console.log(response);

  }
})
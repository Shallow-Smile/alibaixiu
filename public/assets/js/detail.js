 var postId =getUrlParams('id');

$.ajax({
  type:'get',
  url:'/posts/'+ postId,
  success:function(res){
    console.log(res);
    
  }

});

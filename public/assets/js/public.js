// 随机推荐模块
$.ajax({
  type: 'get',
  url: '/posts/random/',
  success: function (res) {
    var randomTpl = `
    {{each data}}
    <li>
      <a href="javascript:;">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
    </li>

    {{/each}} 
    `;
    var html = template.render(randomTpl, { data: res });
    $('#randomBox').html(html)
  }
});

// 最新评论模块
$.ajax({
  type: 'get',
  url: '/comments/lasted/',
  success: function (res) {
    var viewsTpl = `
    {{each data}}
    <li>
      <a href="javascript:;">
        <div class="avatar">
          <img src="{{$value.author.avatar}}" alt="">
        </div>
        <div class="txt">
          <p>
            <span>{{$value.author.nickName}}</span>{{$value.author.createTime.split('T').join(' ').split('.')[0]}} 说:
          </p>
          <p>{{$value.content}}</p>
        </div>
      </a>
    </li>
    {{/each}}
    `;
    var html = template.render(viewsTpl, { data: res });
    $('#viewsBox').html(html)
  }
});

//  导航数据显示模块
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (res) {
    // var html = template('navTpl', { data: res });
    // $('.navBox').html(html)
    var navTpl = `
      {{each data}}
      <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
  `;
   var html =  template.render(navTpl, { data: res });
    $('.navBox').html(html);
  }
});

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




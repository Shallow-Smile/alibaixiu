$.ajax({
  type: 'get',
  url: '/slides',
  success: function (res) {
    // console.log(res);
    // console.log(data)
    var html = template('setTpl', { data: res });
    $('#setBox').html(html);
    var cursor = template('cursorTpl', { data: res });
    $('#cursor').html(cursor);


    //轮播图效果代码
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;

        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if (_this.is('.prev')) {
        swiper.prev();
      } else if (_this.is('.next')) {
        swiper.next();
      }
    });
  }
});

$.ajax({
  type: 'get',
  url: '/posts/lasted',
  success: function (res) {
    var news = template('newsTpl', { data: res });
    $('#newsBox').html(news);
  }
});
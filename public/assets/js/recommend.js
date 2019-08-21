$.ajax({
  type: 'get',
  url: '/posts/recommend',
  success: function (res) {
    var hosts = template('hostsTpl', { data: res });
    $('#hostsBox').html(hosts)
  }
});


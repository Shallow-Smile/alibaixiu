//用户添加
$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function () {
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        }
    });
    return false;
});

//头像选择
$('#modifyBox').on('change', '#avatar', function () {
    // console.log(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax方法不要解析请求参数
        processData: false,
        //告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function (response) {
            console.log(response);
            //实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});

//用户表单渲染
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        var html = template('userTpl', {
            data: response
        })
        $('#userBox').html(html)
    }
});

//用户信息修改
//渲染编辑的用户信息到界面
$("#userBox").on('click', '.edit', function () {
    //获取被点击用户的ID值
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
});
//为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm',
    function () {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function () {
                location.reload();
            }
        })
        return false;
    });
//删除用户
$('#userBox').on('click', '.delete', function () {
    if (confirm('是否确认删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function () {
                location.reload();
            }
        });
    };
});

//批量删除用户
//选择框操作
$('#checkAll').on('change', function () {
    var result = $(this).prop('checked');
    $('#userBox input:checkbox').prop('checked', result);
});
$('#userBox').on('change', 'input:checkbox', function () {
    var checkedLen = $('#userBox input:checkbox:checked').length;
    $('#checkAll').prop('checked', $('#userBox input:checkbox').length == checkedLen);
    $('#deleteMany').attr('disabled', checkedLen <= 0);
});

//全选操作
$('#deleteMany').click(function () {
    var arr = [];
    var checkedUser = $('#userBox input:checked');
    checkedUser.each(function(index, res){
       arr.push($(res).attr('data-id'));
    });
    if (confirm('是否确认批量删除')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + arr.join('-'),
            success: function () {
                location.reload();
            }
        });
    };
});

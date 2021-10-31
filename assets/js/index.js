$(function() {
        grtuserinfo();
        $('#btnlogout').click(function() {
            var layer = layui.layer;
            layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem('token');
                location.href = '../login.html'

                layer.close(index);
            });
        })
    })
    // 获取用户信息
function grtuserinfo() {
    $.ajax({
        method: 'get',
        url: "/my/userinfo",

        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderauatar(res.data)
        },

    })
}

function renderauatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}
$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // console.log(form);
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '输入字符长度在1-6字符之间'
            }
        }
    })
    inituserinfo()

    function inituserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                form.val('formUserInform', res.data)
            }
        })
    }

    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('更新信息成功');
                window.parent.grtuserinfo()

            }

        })
    })
    $('#btnrest').on('click', function(e) {
        e.preventDefault();
        inituserinfo()
    })
})
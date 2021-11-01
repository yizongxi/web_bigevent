$(function() {
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '输入6-12位切不能有空格'],
        samepwd: function(value) {
            if ($('[name=oldPwd]').val() === value) {
                return "新旧密码一致"
            }
        },
        repwd: function(value) {
            if ($('[name=newPwd]').val() !== value) {
                return "两次密码输入不一致"
            }
        }
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新失败')
                }
                layui.layer.msg('更新成功')
                $('.layui-form')[0].reset()
            }

        })
    })
})
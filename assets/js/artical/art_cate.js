$(function() {
    initArtCateList()
    var layer = layui.layer
    var indexadd = null
    var form = layui.form

    function initArtCateList() {
        $.ajax({
            method: "get",
            url: '/my/article/cates',
            success: function(res) {
                var htmlstr = template('tpl_table', res);
                $('tbody').html(htmlstr)
            }
        })
    }
    $('#btnAddCate').on('click', function() {
        indexadd = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })
    $("body").on('submit', '#formadd', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg('添加成功');
                initArtCateList();
                layer.close(indexadd)

            }
        })
    })
    var indexedit = null;
    $('tbody').on('click', '#btn-edit', function() {
        indexedit = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-adit').html()
        });
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            method: "get",
            url: '/my/article/cates/' + id,
            success: function(res) {
                // console.log(res);
                form.val('formedit', res.data);
            }
        })
    })
    $('body').on('submit', "#formedit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                layer.close(indexedit)
                initArtCateList()
            }
        })
    })
    $('body').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                }
            })


        });
    })

})
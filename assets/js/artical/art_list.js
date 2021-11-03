$(function() {
    var d = { pagenum: 1, pagesize: 2, cate_id: '', state: '' }
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    inittable()
    template.defaults.imports.dataFormat = function(date) {
        var dt = new Date(date);
        var y = padzero(dt.getFullYear(dt))
        var m = padzero(dt.getMonth(dt) + 1)
        var d = padzero(dt.getDate(dt))
        var h = padzero(dt.getHours(dt))
        var mm = padzero(dt.getMinutes(dt))
        var s = padzero(dt.getSeconds(dt))
        return y + '-' + m + '-' + d + '-' + h + ':' + mm + ':' + s

    }

    function padzero(dt) {
        return dt > 9 ? dt : '0' + dt
    }

    function inittable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: d,
            success: function(res) {
                // console.log(res);
                var htmlstr = template('table_tpl', res);
                $('tbody').html(htmlstr)
                renderpage(res.total)

            }
        })
    }
    initcate()

    function initcate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                var htmlstr = template('table_cate', res);
                // console.log(htmlstr);
                $('[name=cate_id]').html(htmlstr)
                form.render()

            }
        })
    }
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val()
        var state = $('[ name=state]').val()
        d.cate_id = cate_id;
        d.state = state
        inittable()
    })

    function renderpage(total) {
        // console.log(total);
        laypage.render({
            elem: 'test-box', //注意，这里的 test1 是 ID，不用加 # 号
            limit: d.pagesize,
            curr: d.pagenum,
            count: total, //数据总数，从服务端得到
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                d.pagenum = obj.curr
                d.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    //do something
                    inittable()
                }
            }
        });
    }
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        var len = $('.btn-delete').length
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        d.pagenum = d.pagenum === 1 ? 1 : d.pagenum - 1
                    }
                    inittable()

                }
            })
            layer.close(index);
        });
    })
})
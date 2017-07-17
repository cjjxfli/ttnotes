/**
 * Created by xf.li on 2017/4/18.
 */
$(function(){
    g_active_node = $(document);
    $("#new-folder-btn").on("click",function(){
        var dir_module_html = $("#dir-module").html();
        if($(".list-view").children("dd").length > 0){
            $(".list-view").children("dd").first().before(dir_module_html);
        }else{
            $(".list-view").prepend(dir_module_html);
        }

        $(".module-edit-name").css("display","block");
        $(".module-edit-name").css("left","20px");
        $(".module-edit-name").css("top","58px");
    });

    //确定创建
    $(".new-dir-item .sure-to-new-dir").on("click",function(){
        var url = $("#new-dir-box").attr("data-post");
        var src_category = $("#menu").attr("data-category-id");
        //circle load
        $.showShCircle("shCircle");
        $.ajax({
            url:url,
            method:"post",
            dataType:"json",
            data:{
                category_name:$("#new-dir-box").val(),
                cid:src_category,//$(".module-history-list").attr("data-cid"),
            },
            success:function(jsonData){
                //circle load
                $.closeShCircle("shCircle");
                $(".module-edit-name").css("display","none");
                if(jsonData.flag == 1){
                    //alert(jsonData.msg);
                    window.location.reload();
                }else{
                    alert(jsonData.msg);
                    window.location.reload();
                }
            },
            error:function(jsonData){
                //circle load
                $.closeShCircle("shCircle");
                $(".module-edit-name").css("display","none");
                window.location.reload();
            }
        });
    });
    //取消创建
    $(".new-dir-item .cancel").on("click",function(){
        $(".list-view").children("dd").first().empty();
        $(".module-edit-name").css("display","none");
        window.location.reload();
    });

    //文件名点击事件
    $(".category .filename,.favorites-cat .filename,.software-cat .filename").on("click",function(){
        g_active_node = $(this);
        window.location = $(this).attr("data-jump");
    });

    //收藏夹名点击事件
    //$(".favorites .filename").on("click",function(){
    //    window.location = $(this).attr("data-jump");
    //});

    //新建文件
    $("#new-file-btn").on("click",function(){
        window.location = $("#new-file-btn").attr("data-jump");
    });

    //返回上一级
    $("#pre-category").on("click",function(){
        var node_count = $(".category-list-node").length;
        if(node_count > 1){
            node_count = node_count - 2;
        }
        var tmp = $(".category-list-node").eq(node_count);
        var url = $(tmp).attr("data-jump");
        window.location = url;
    });

    //目录路由节点点击
    $("#module-list-history > li").delegate(".category-route-node","click",function(event){
        event.preventDefault();
        window.location = $(this).attr("data-jump");
    });
});
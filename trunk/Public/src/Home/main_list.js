/**
 * Created by xf.li on 2017/4/17.
 */
$(function(){
    g_active_node = $(document);
    //全局node click事件
    $(".list-view").delegate(".list-view-item","click",function(){
        if($(this).hasClass("item-active")){
            $(this).removeClass("item-active");
            $(".list-tools").css("visibility","hidden");
        }else{
            $(this).addClass("item-active");
            $(".list-tools").css("visibility","visible");
        }
        g_active_node = $(this);
    });

    $(".first-col >.col-item").on("click",function(){
        if($(".list-view-item").hasClass("item-active")){
            $(".list-view-item").removeClass("item-active");
            $(".check-icon").parent(".check").removeClass("checked");
        }else{
            $(".list-view-item").addClass("item-active");
            $(".check-icon").parent(".check").addClass("checked");
        }
    });

    //鼠标右键
    $(document).on("click",function(){
        $("#menu .list").css("display","none");
        //恢复原始值
        //var cid = $("#menu").attr("data-old-category-id");
        //$("#menu").attr("data-category-id",cid);
    });
    $("#module-list").on("contextmenu",function(event){
        //event.cancelBubble = true;
        var srcX = $(".list-view").offset().left;
        var srcY = $(".list-view").offset().top;
        var clientX = event.clientX;
        var clientY = event.clientY;
        var oX = clientX - srcX;
        var oY = clientY - srcY + 54;
        //鼠标右键
        if(event.which == 3){
            //g_active_node = $(this);
            $("#menu .list").css("display","block");
            $("#menu .list").css("left",oX).css("top",oY);
            //event && event.preventDefault ? event.preventDefault()/*W3C*/: window.event.returnValue = false/*IE*/;
        }else{
            $("#menu .list").css("display","none");
        }
        //event.bubbles = false;
        return false;
    });

    //category鼠标选中响应
    $(".category").on("mousedown",function(){
        var cid = $(this).attr("_installed");
        //设置右键菜单，以便响应命令
        $("#menu").attr("data-category-id",cid);
        $("#menu").attr("data-cmd-type",1);
    });

    //article鼠标选中响应
    $(".article").on("mousedown",function(){
        var cid = $(this).attr("_installed");
        //设置右键菜单，以便响应命令
        $("#menu").attr("data-category-id",cid);
        $("#menu").attr("data-cmd-type",2);
    });

    //favorites鼠标选中响应
    $(".favorites").on("mousedown",function(){
        var cid = $(this).attr("_installed");
        //设置右键菜单，以便响应命令
        $("#menu").attr("data-category-id",cid);
        $("#menu").attr("data-cmd-type",3);
    });

    //favorites-cat鼠标选中响应
    $(".favorites-cat").on("mousedown",function(){
        var cid = $(this).attr("_installed");
        //设置右键菜单，以便响应命令
        $("#menu").attr("data-category-id",cid);
        $("#menu").attr("data-cmd-type",4);
    });

    //software鼠标选中响应
    $(".software").on("mousedown",function(){
        var cid = $(this).attr("_installed");
        //设置右键菜单，以便响应命令
        $("#menu").attr("data-category-id",cid);
        $("#menu").attr("data-cmd-type",5);
    });

    //software-cat鼠标选中响应
    $(".software-cat").on("mousedown",function(){
        var cid = $(this).attr("_installed");
        //设置右键菜单，以便响应命令
        $("#menu").attr("data-category-id",cid);
        $("#menu").attr("data-cmd-type",6);
    });


    function downloadCategory(){}

    function onOpenCategory(root_obj,datas){
        var html = '';
        for(var i = 0;i < datas.length; i++){
            html += '<li>'+
                '<div class="treeview-node " _pl="15px" style="padding-left:15px" data-node-id="'+datas[i].id+'">'+
                '<span class="treeview-node-handler">'+
                '<em class="b-in-blk plus icon-operate "></em>'+
                '<dfn class="b-in-blk treeview-ic"></dfn>'+
                '<span class="treeview-txt" node-path="/'+datas[i].name+'">'+datas[i].name+'</span>'+
            '</span>'+
            '</div>'+
            '<ul class="treeview treeview-content treeview-collapse" _pl="30px">'+
                '</ul>'+
                '</li>';
        }
        if(html.length > 0){
            $(root_obj).parent("span").parent("div").siblings("ul").append(html);
            return true;
        }
        return false;
    }

    function __copy(url){
        var src_category = $("#menu").attr("data-category-id");
        var dst_category = -1;
        var active_node = $(".treeview-node-on");
        //设置复制对话框
        $("#fileTreeDialog .dialog-header-title.select-text").html("复制到");
        $("#fileTreeDialog").delegate(".plus","click",function(){
            //console.log("I am here");
            var cmd_type = $("#menu").attr("data-cmd-type");
            var tmp_url = $("#menu").attr("data-on-cmd-req-cat");
            tmp_url += "/openCategory";
            if(4 == cmd_type){
                tmp_url = $("#menu").attr("data-on-cmd-req-fav");
                tmp_url += "/openFavoritesCategory";
            }else if(6 == cmd_type){
                tmp_url = $("#menu").attr("data-on-cmd-req-software");
                tmp_url += "/openSoftwareCategory";
            }
            if($(this).hasClass("minus")){
                //$(this).removeClass("minus");
                return;
            }
            var root_obj = $(this);
            var cid = $(this).parent("span").parent("div").attr("data-node-id");
            $(this).parent("span").parent("div").siblings("ul").empty();

            //circle load
            $.showShCircle("shCircle");

            $.ajax({
                url:tmp_url,
                method:"post",
                dataType:"json",
                data:{
                    cid:cid,
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    if(jsonData.flag == 1){
                        if(onOpenCategory(root_obj,jsonData.list)){
                            $(root_obj).addClass("minus");
                        }
                    }else{
                        //alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    $(".plus-createFolder").remove();
                    console.log(jsonData);
                }
            });
        });
        $("#fileTreeDialog").delegate(".minus","click",function(){
            $(this).parent("span").parent("div").siblings("ul").empty();
            $(this).removeClass("minus");
        });

        $("#fileTreeDialog").css("display","block");
        $("#fileTreeDialog").css("visibility","visible");

        //复制对话框的关闭和取消
        $("#fileTreeDialog").delegate(".btn-cancel,.dialog-close","click",function(){
            $("#fileTreeDialog").css("display","none");
            $("#fileTreeDialog").css("visibility","hidden");
        });
        //复制对话框的确定复制
        $("#fileTreeDialog").delegate(".btn-sure","click",function(){
            //var url = $("#menu").attr("data-on-cmd-req-cat");
            //url += "/copyCategory";
            var src_cid_array = [];
            var active_items = $(".item-active");
            $.each($(active_items),function(i,n){
                console.log("item:"+i+" = "+n);
                var tmp_id = $(n).attr("_installed");
                src_cid_array.push(tmp_id);
            });
            //return;
            console.log("url="+url);
            //circle load
            $.showShCircle("shCircle");
            $.ajax({
                url:url,
                method:"post",
                dataType:"json",
                data:{
                    src_cid:src_cid_array,
                    dst_cid:dst_category,
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");

                    $("#fileTreeDialog").css("display","none");
                    $("#fileTreeDialog").css("visibility","hidden");
                    if(jsonData.flag == 1){
                        //alert(jsonData.msg);
                        window.location.reload();
                    }else{
                        alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");

                    $("#fileTreeDialog").css("display","none");
                    $("#fileTreeDialog").css("visibility","hidden");
                    console.log(jsonData);
                }
            });
        });
        //$("#fileTreeDialog .btn-sure").on("click",function(){});
        $("#fileTreeDialog .btn-new-dir").on("click",function(){
            var tpl = $("#copy-new-dir").html();

            active_node.parent("li").after(tpl);
            //确定新建文件夹
            $("#fileTreeDialog .sure").delegate("click",function(){
                var url = $("#copy-new-dir").attr("data-post");
                //circle load
                $.showShCircle("shCircle");
                $.ajax({
                    url:url,
                    method:"post",
                    dataType:"json",
                    data:{
                        category_name:$(".plus-createFolder ._disk_id_4").val(),
                        cid:dst_category,
                    },
                    success:function(jsonData){
                        //circle load
                        $.closeShCircle("shCircle");
                        $(".plus-createFolder").remove();
                        if(jsonData.flag == 1){
                            $(active_node).parent("li").children("plus").addClass("minus");
                            active_node.removeClass("treeview-node-on");
                            dst_category = jsonData.list.cid;
                            var html = '<li>'+
                                '<div class="treeview-node treeview-node-on" _pl="15px" style="padding-left:15px" data-node-id="'+jsonData.list.cid+'">'+
                                '<span class="treeview-node-handler">'+
                                '<em class="b-in-blk plus icon-operate "></em>'+
                                '<dfn class="b-in-blk treeview-ic"></dfn>'+
                                '<span class="treeview-txt" node-path="/'+jsonData.list.name+'">'+jsonData.list.name+'</span>'+
                            '</span>'+
                            '</div>'+
                            '<ul class="treeview treeview-content treeview-collapse" _pl="30px">'+
                                '</ul>'+
                                '</li>';
                            active_node.parent("li").children("ul").append(html);
                        }else{
                            alert(jsonData.msg);
                        }
                    },
                    error:function(jsonData){
                        //circle load
                        $.closeShCircle("shCircle");
                        $(".plus-createFolder").remove();
                        console.log(jsonData);
                    }
                });
            });
            //取消创建文件夹
            $("#fileTreeDialog .cancel").on("click",function(){
                $(".plus-createFolder").remove();
            });
        });

        $("#fileTreeDialog").delegate(".treeview-node","click",function(){
            $("#fileTreeDialog .treeview-node-on").removeClass("treeview-node-on");
            dst_category = $(this).attr("data-node-id");
            $(this).addClass("treeview-node-on");
            active_node = $(this);
        });
    }

    function copyCategory(url){
        __copy(url);
    }

    function __rename(url){
        //var src_category = $("#menu").attr("data-category-id");
        ////确定编辑
        //$(".update-dir-item .sure-to-rename").on("click",function(event){
        //    event.preventDefault();
        //    //var url = $("#new-dir-box").attr("data-post");
        //    //var src_category = $("#menu").attr("data-category-id");
        //    console.log("name="+$("#new-dir-box").val());
        //    console.log("src_category="+src_category);
        //    $.ajax({
        //        url:url,
        //        method:"post",
        //        dataType:"json",
        //        data:{
        //            "category_name":$("#update-dir-box").val(),
        //            "src_category":src_category,
        //        },
        //        async:false,
        //        cache:false,
        //        success:function(jsonData){
        //            $(".module-edit-name").css("display","none");
        //            if(jsonData.flag == 1){
        //                window.location.reload();
        //            }else{
        //                //alert(jsonData.msg);
        //            }
        //        },
        //        error:function(jsonData){
        //            $(".module-edit-name").css("display","none");
        //            console.log(jsonData);
        //        }
        //    });
        //    //event.bubbles = false;
        //    //return false;
        //});
        ////取消编辑
        //$(".new-dir-item .cancel").on("click",function(){
        //    $(".module-edit-name").css("display","none");
        //    window.location.reload();
        //});
    }

    function __move(url){
        var src_category = $("#menu").attr("data-category-id");
        var dst_category = -1;
        var active_node = $(".treeview-node-on");
        //设置复制对话框
        $("#fileTreeDialog .dialog-header-title.select-text").html("移动到");
        $("#fileTreeDialog").delegate(".plus","click",function(){
            //console.log("I am here");
            var cmd_type = $("#menu").attr("data-cmd-type");
            var tmp_url = $("#menu").attr("data-on-cmd-req-cat");
            tmp_url += "/openCategory";
            if(4 == cmd_type){
                tmp_url = $("#menu").attr("data-on-cmd-req-fav");
                tmp_url += "/openFavoritesCategory";
            }else if(6 == cmd_type){
                tmp_url = $("#menu").attr("data-on-cmd-req-software");
                tmp_url += "/openSoftwareCategory";
            }
            if($(this).hasClass("minus")){
                //$(this).removeClass("minus");
                return;
            }
            var root_obj = $(this);
            var cid = $(this).parent("span").parent("div").attr("data-node-id");
            $(this).parent("span").parent("div").siblings("ul").empty();
            //circle load
            $.showShCircle("shCircle");

            $.ajax({
                url:tmp_url,
                method:"post",
                dataType:"json",
                data:{
                    cid:cid,
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    if(jsonData.flag == 1){
                        if(onOpenCategory(root_obj,jsonData.list)){
                            $(root_obj).addClass("minus");
                        }
                    }else{
                        //alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    $(".plus-createFolder").remove();
                    console.log(jsonData);
                }
            });
        });
        $("#fileTreeDialog").delegate(".minus","click",function(){
            $(this).parent("span").parent("div").siblings("ul").empty();
            $(this).removeClass("minus");
        });

        $("#fileTreeDialog").css("display","block");
        $("#fileTreeDialog").css("visibility","visible");

        //复制对话框的关闭和取消
        $("#fileTreeDialog").delegate(".btn-cancel,.dialog-close","click",function(){
            $("#fileTreeDialog").css("display","none");
            $("#fileTreeDialog").css("visibility","hidden");
        });
        //复制对话框的确定复制
        $("#fileTreeDialog").delegate(".btn-sure","click",function(){
            //var url = $("#menu").attr("data-on-cmd-req-cat");
            //url += "/copyCategory";
            var src_cid_array = [];
            var active_items = $(".item-active");
            $.each($(active_items),function(i,n){
                console.log("item:"+i+" = "+n);
                var tmp_id = $(n).attr("_installed");
                src_cid_array.push(tmp_id);
            });
            //return;
            console.log("url="+url);
            //circle load
            $.showShCircle("shCircle");
            $.ajax({
                url:url,
                method:"post",
                dataType:"json",
                data:{
                    src_cid:src_cid_array,
                    dst_cid:dst_category,
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    $("#fileTreeDialog").css("display","none");
                    $("#fileTreeDialog").css("visibility","hidden");
                    if(jsonData.flag == 1){
                        //alert(jsonData.msg);
                        window.location.reload();
                    }else{
                        //alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    $("#fileTreeDialog").css("display","none");
                    $("#fileTreeDialog").css("visibility","hidden");
                    console.log(jsonData);
                }
            });
        });
        $("#fileTreeDialog .btn-new-dir").on("click",function(){
            var tpl = $("#copy-new-dir").html();

            active_node.parent("li").after(tpl);
            //确定新建文件夹
            $("#fileTreeDialog .sure").delegate("click",function(){
                var url = $("#copy-new-dir").attr("data-post");
                //circle load
                $.showShCircle("shCircle");
                $.ajax({
                    url:url,
                    method:"post",
                    dataType:"json",
                    data:{
                        category_name:$(".plus-createFolder ._disk_id_4").val(),
                        cid:dst_category,
                    },
                    success:function(jsonData){
                        //circle load
                        $.closeShCircle("shCircle");
                        $(".plus-createFolder").remove();
                        if(jsonData.flag == 1){
                            $(active_node).parent("li").children("plus").addClass("minus");
                            active_node.removeClass("treeview-node-on");
                            dst_category = jsonData.list.cid;
                            var html = '<li>'+
                                '<div class="treeview-node treeview-node-on" _pl="15px" style="padding-left:15px" data-node-id="'+jsonData.list.cid+'">'+
                                '<span class="treeview-node-handler">'+
                                '<em class="b-in-blk plus icon-operate "></em>'+
                                '<dfn class="b-in-blk treeview-ic"></dfn>'+
                                '<span class="treeview-txt" node-path="/'+jsonData.list.name+'">'+jsonData.list.name+'</span>'+
                                '</span>'+
                                '</div>'+
                                '<ul class="treeview treeview-content treeview-collapse" _pl="30px">'+
                                '</ul>'+
                                '</li>';
                            active_node.parent("li").children("ul").append(html);
                        }else{
                            //alert(jsonData.msg);
                        }
                    },
                    error:function(jsonData){
                        //circle load
                        $.closeShCircle("shCircle");
                        $(".plus-createFolder").remove();
                        console.log(jsonData);
                    }
                });
            });
            //取消创建文件夹
            $("#fileTreeDialog .cancel").on("click",function(){
                $(".plus-createFolder").remove();
            });
        });

        $("#fileTreeDialog").delegate(".treeview-node","click",function(){
            $("#fileTreeDialog .treeview-node-on").removeClass("treeview-node-on");
            dst_category = $(this).attr("data-node-id");
            $(this).addClass("treeview-node-on");
            active_node = $(this);
        });
    }

    function moveCategory(url){
        __move(url);
    }

    function renameCategory(url){
        __rename(url);
    }

    function __delete(url){
        var src_category = $("#menu").attr("data-category-id");
        //circle load
        $.showShCircle("shCircle");
        $.ajax({
            url:url,
            method:"post",
            dataType:"json",
            data:{
                src_category:src_category,
            },
            success:function(jsonData){
                //circle load
                $.closeShCircle("shCircle");
                $(".module-edit-name").css("display","none");
                if(jsonData.flag == 1){
                    window.location.reload();
                }else{
                    //alert(jsonData.msg);
                }
            },
            error:function(jsonData){
                //circle load
                $.closeShCircle("shCircle");
                $(".module-edit-name").css("display","none");
                console.log(jsonData);
            }
        });
    }

    function deleteCategory(url){
        __delete(url);
    }

    function openArticle(){}

    function downloadArticle(){}

    function copyArticle(url){
        __copy(url);
    }

    function renameArticle(url){
        __rename(url);
    }

    function moveArticle(url){
        __move(url);
    }

    function updateArticle(){}

    function deleteArticle(url){
        __delete(url);
    }

    function copyFavorites(url){
        __copy(url);
    }

    function copyFavoritesCategory(url){
        __copy(url);
    }

    function moveFavorites(url){
        __move(url);
    }

    function moveFavoritesCategory(url){
        __move(url);
    }

    function renameFavorites(url){
        __rename(url);
    }

    function renameFavoritesCategory(url){
        __rename(url);
    }

    function deleteFavorites(url){
        __delete(url);
    }

    function deleteFavoritesCategory(url){
        __delete(url);
    }

    function copySoftware(url){
        __copy(url);
    }

    function moveSoftware(url){
        __move(url);
    }

    function deleteSoftware(url){
        __delete(url);
    }

    function showDailog(){
        var url = $("#fileTreeDialog").attr("data-self");
        //circle load
        $.showShCircle("shCircle");
        $.ajax({
            url:url,
            method:"post",
            dataType:"json",
            data:{
                cid:-1,
            },
            success:function(jsonData){
                //circle load
                $.closeShCircle("shCircle");
                if(jsonData.flag == 1){
                    var html = '';
                    var categorys = jsonData.list.categorys;
                    for(var i = 0; i < categorys.length; i++){
                        html += '<li>'+
                            '<div class="treeview-node " _pl="15px" style="padding-left:15px" data-node-id="'+categorys[i].id+'">'+
                            '<span class="treeview-node-handler">'+
                            '<em class="b-in-blk plus icon-operate "></em>'+
                            '<dfn class="b-in-blk treeview-ic"></dfn>'+
                            '<span class="treeview-txt" node-path="/' + categorys[i].name +'">'+categorys[i].name+'</span>'+
                            '</span>'+
                            '</div>'+
                            '<ul class="treeview treeview-content treeview-collapse" _pl="30px">'+
                            '</ul>'+
                            '</li>';
                    }
                    $("#fileTreeDialog .treeview-root-content").html(html);
                }else{
                    //alert(jsonData.msg);
                }
            },
            error:function(jsonData){
                //circle load
                $.closeShCircle("shCircle");
                $(".plus-createFolder").remove();
                console.log(jsonData);
            }
        });
    }

    //菜单打开命令
    $("#open-menu").on("click",function(){
        var on_cmd_req_href = $("#menu").attr("data-on-cmd-req-cat");
        var cmd_type = $("#menu").attr("data-cmd-type");
        var cid = $("#menu").attr("data-category-id");
        if(1 == cmd_type){
            var url = on_cmd_req_href + "/openCategory";
            url += "/cid/" + cid;
            window.location = url;
        }else if(2 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-file");
            var url = on_cmd_req_href + "/openArticle";
            url += "/aid/" + cid;
            window.location = url;
        }else if(3 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/openFavorites";
            url += "/cid/" + cid;
            window.location = url;
        }else if(4 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/openFavoritesCategory";
            url += "/cid/" + cid;
            window.location = url;
        }else if(5 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/openSoftware";
            url += "/cid/" + cid;
            window.location = url;
        }else if(6 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/openSoftwareCategory";
            url += "/cid/" + cid;
            window.location = url;
        }
    });

    //菜单下载命令
    $("#download-menu").on("click",function(){
        var on_cmd_req_href = $("#menu").attr("data-on-cmd-req-cat");
        var cmd_type = $("#menu").attr("data-cmd-type");
        if(1 == cmd_type){
            var url = on_cmd_req_href + "/downloadCategory";
        }else if(2 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-file");
            var url = on_cmd_req_href + "/downloadArticle";
        }else if(3 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/downloadFavorites";
        }else if(4 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/downloadFavorites";
        }else if(5 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/downloadSoftware";
        }
    });

    //菜单复制命令
    $("#copy-menu").on("click",function(){
        var on_cmd_req_href = $("#menu").attr("data-on-cmd-req-cat");
        var cmd_type = $("#menu").attr("data-cmd-type");
        showDailog();
        if(1 == cmd_type){
            var url = on_cmd_req_href + "/copyCategory";
            copyCategory(url);
        }else if(2 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-file");
            var url = on_cmd_req_href + "/copyArticle";
            copyArticle(url);
        }else if(3 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/copyFavorites";
            copyFavorites(url);
        }else if(4 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/copyFavoritesCategory";
            copyFavoritesCategory(url);
        }else if(5 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/copySoftware";
            copySoftware(url);
        }else if(6 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/copySoftwareCategory";
            copySoftware(url);
        }
    });

    //菜单移动命令
    $("#move-menu").on("click",function(){
        var on_cmd_req_href = $("#menu").attr("data-on-cmd-req-cat");
        var cmd_type = $("#menu").attr("data-cmd-type");
        if(1 == cmd_type){
            var url = on_cmd_req_href + "/moveCategory";
            moveCategory(url);
        }else if(2 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-file");
            var url = on_cmd_req_href + "/moveArticle";
            moveArticle(url);
        }else if(3 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/moveFavorites";
            moveFavorites(url);
        }else if(4 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/moveFavoritesCategory";
            moveFavoritesCategory(url);
        }else if(5 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/moveSoftware";
            moveSoftware(url);
        }else if(6 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/moveSoftwareCategory";
            moveSoftware(url);
        }
    });

    //菜单重命名命令
    $("#rename-menu").on("click",function(event){
        var on_cmd_req_href = $("#menu").attr("data-on-cmd-req-cat");
        var cmd_type = $("#menu").attr("data-cmd-type");
        var srcX = $(g_active_node).position().left; //g_active_node.offset().left;
        var srcY = $(g_active_node).position().top; //g_active_node.offset().top;
        var clientX = event.clientX;
        var clientY = event.clientY;
        var oX = srcX + 20; //clientX - srcX - 26 - 26 - 26;
        var oY = srcY + 44 + 15; //clientY - srcY - 45;
        var category_name = $(g_active_node).find(".filename").html();
        if(category_name != "undefined"){
            $("#new-dir-box").val(category_name);
        }
        $(".module-edit-name").css("display","block");
        $(".module-edit-name").css("left",oX+"px");
        $(".module-edit-name").css("top",oY+"px");

        if(1 == cmd_type){
            var url = on_cmd_req_href + "/renameCategory";
            $("#new-dir-box").attr("data-post",url);
            ///renameCategory(url);
            //$("#new-dir-box").attr("data-post",url);
        }else if(2 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-file");
            var url = on_cmd_req_href + "/renameArticle";
            $("#new-dir-box").attr("data-post",url);
            renameArticle(url);
        }else if(3 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/renameFavorites";
            $("#new-dir-box").attr("data-post",url);
            renameFavorites(url);
        }else if(4 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/renameFavoritesCategory";
            $("#new-dir-box").attr("data-post",url);
            //renameFavoritesCategory(url);
        }else if(5 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/renameSoftware";
            $("#new-dir-box").attr("data-post",url);
        }else if(6 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/renameSoftwareCategory";
            $("#new-dir-box").attr("data-post",url);
        }
    });

    //菜单删除命令
    $("#delete-menu").on("click",function(){
        var on_cmd_req_href = $("#menu").attr("data-on-cmd-req-cat");
        var cmd_type = $("#menu").attr("data-cmd-type");
        if(1 == cmd_type){
            var url = on_cmd_req_href + "/deleteCategory";
            deleteCategory(url);
        }else if(2 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-file");
            var url = on_cmd_req_href + "/deleteArticle";
            deleteArticle(url);
        }else if(3 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/deleteFavorites";
            deleteFavorites(url);
        }else if(4 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-fav");
            var url = on_cmd_req_href + "/deleteFavoritesCategory";
            deleteFavoritesCategory(url);
        }else if(5 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/deleteSoftware";
            deleteSoftware(url);
        }else if(6 == cmd_type){
            on_cmd_req_href = $("#menu").attr("data-on-cmd-req-software");
            var url = on_cmd_req_href + "/deleteSoftwareCategory";
            deleteSoftware(url);
        }
    });
});
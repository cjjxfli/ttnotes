/**
 * Created by xfli on 2017/5/11.
 */
$(function(){
    $("#new-fav-btn").on("click",function(){
        $("#circle-modal").modal('show');
    });

    $("#fav-add-form").validate({
        rules:{
        },
        messages:{
        },
        submitHandler:function(form){
            //circle load
            $.showShCircle("shCircle");
            jQuery.ajax({
                url:$("#fav-add-form").attr("action"),
                type:"post",
                dataType:"json",
                data:{
                    fav_name:$("#fav-name").val(),
                    fav_link:$("#fav-link").val(),
                    src_category:$("#fav-add-form").attr("data-cid"),
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    $("#circle-modal").modal('hide');
                    if(jsonData.flag == 1){
                        window.location = $("#fav-add-form").attr("href-jump");
                    }else{
                        alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    $("#circle-modal").modal('hide');
                    console.log(jsonData);
                }
            });
        },
        errorContainer: "div.error",
        errorLabelContainer: $("#fav-add-form div.error"),
        wrapper: "li",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    });
});
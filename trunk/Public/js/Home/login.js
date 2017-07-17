/**
 * Created by lixiongfeng on 16/8/10.
 */
$(document).ready(function(){

    $("#login-form").validate({
        rules:{
            user_name:{
                required:true,
            },
            user_password:{
                required:true,
            },
            user_verify:{
                required:true,
            },
        },
        messages:{
            user_mobile:"手机号不能为空",
            user_password:"密码不能为空,最短为6位",
            user_verify:"验证码不对",
        },
        submitHandler:function(form){
            //circle load
            $.showShCircle("shCircle");
            $.ajax({
                url:$("#login-form").attr("action"),
                type:"post",
                dataType:"json",
                data:{
                    user_name:$("#user-name").val(),
                    user_password: $.md5($("#user-password").val()),
                    user_verify:$("#user-verify").val(),
                },
                success:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                    if(jsonData.flag == 1){
                        window.location = $("#login-form").attr("data-jump");
                    }else{
                        alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    //circle load
                    $.closeShCircle("shCircle");
                }
            });
        },
        errorContainer: "div.error",
        errorLabelContainer: $("#login-form div.error"),
        wrapper: "li",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    });
});
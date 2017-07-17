/**
 * Created by xfli on 2017/3/25.
 */
$(document).ready(function(){
    $("#binding-email").on("click",function(event){
        event.preventDefault();
        $.ajax({
            url:$(this).attr("data-href"),
            method:"post",
            dataType:"json",
            data:{
                email:$("#binding-email-txt").val()
            },
            success:function(jsonData){
                if(jsonData.flag == 1){
                    alert(jsonData.msg);
                }else{
                    alert(jsonData.msg);
                }
            },
            error:function(jsonData){
                console.log(jsonData);
            }
        });
    });

    jQuery.validator.addMethod("isNeedMobile",function(value, element){
        if(!$("input[type=text][name='mobile']").hasClass("disabled")){
            var reg0 = /^13\d{5,9}$/;
            var reg1 = /^15\d{5,9}$/;
            var reg2 = /^189\d{4,8}$/;
            var reg3 = /^0\d{10,11}$/;
            var my = false;
            if (reg0.test(value))my=true;
            if (reg1.test(value))my=true;
            if (reg2.test(value))my=true;
            if (reg3.test(value))my=true;
            if(value!=''){if(!my){return false;}};
            return this.optional(element) || true;
        }else{
            return true;
        }
    },"请输入合法的手机号和手机验证码");

    jQuery.validator.addMethod("isNeedEmail",function(value, element){
        if(!$("input[type=text][name='user_email']").hasClass("disabled")){
            var myreg = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9\-]*)*@[a-zA-Z0-9\-]+([\.][a-zA-Z0-9\-]+)+$/;
            if(value !=''){if(!myreg.test(value)) {
                return false;
            }
            };
            return this.optional(element) || true;
        }
        return true;
    },"请输入合法的邮箱地址");

    jQuery.validator.addMethod("isNeedMobileCode",function(value, element){
        if(!$("input[type=text][name='mobile']").hasClass("disabled")){
            var chrnum = /^([a-zA-Z0-9]+)$/;
            return this.optional(element) || (chrnum.test(value) || value.length()!=4);
        }else{
            return true;
        }
    },"请输入4位手机验证码");

    jQuery.validator.addMethod("isNeedEmailCode",function(value, element){
        if(!$("input[type=text][name='user_email']").hasClass("disabled")){
            var chrnum = /^([a-zA-Z0-9]+)$/;
            return this.optional(element) || (chrnum.test(value) || value.length()!=6);
        }
        return true;
    },"请输入6位邮箱验证码");

    //提交表单
    $("#bind-form").validate({
        rules:{
            user_email:{
                isNeedEmail:true,
            },
            verify_email_code:{
                isNeedEmailCode:true,
            },
            mobile:{
                isNeedMobile:true,
            },
            verify_mobile_code:{
                isNeedMobileCode:true,
            },
        },
        messages:{
        },
        submitHandler:function(form){
            $.ajax({
                url:$("#bind-form").attr("action"),
                type:"post",
                dataType:"json",
                data:{
                    user_mobile:$("#mobile").val(),
                    user_mobile_verify:$("#verify-mobile-code").val(),
                    user_email:$("#binding-email-txt").val(),
                    verify_email_code:$("#verify-email-code").val(),
                },
                success:function(jsonData){
                    if(jsonData.flag == 1){
                        window.location.reload();
                    }else{
                        alert(jsonData.msg);
                    }
                },
                error:function(jsonData){
                    alert(jsonData);
                }
            });
        },
        errorContainer: "div.error",
        errorLabelContainer: $("#bind-form div.error"),
        wrapper: "li",
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        }
    });
});
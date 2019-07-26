$(function () {
    //导入笔记命令
    $("#import-menu").on('click', function () {
        $("#import-article").removeClass("hidden");
        //设置categoryId，不需要设置，从哪个页面导入，就用哪个页面的categoryid
        //$("#cid").attr("value",$("#menu").attr("data-category-id"));
        $('#myModal').modal('show');
    });
});
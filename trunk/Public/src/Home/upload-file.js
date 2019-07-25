$(function () {
    //导入笔记命令
    $("#import-menu").on('click', function () {
        $("#import-article").removeClass("hidden");
        $('#myModal').modal('show');
    });
});
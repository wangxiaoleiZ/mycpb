$(function () {
    var st = 180;
    $('#guanyu').click(function () {
        $(this).find('ul').stop(false, true).slideDown(st);
    }).mouseleave(function () {
        // $(this).find('ul').stop(false, true).slideDown(st);
    });
});
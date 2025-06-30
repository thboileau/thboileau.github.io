$(document).ready(function () {

 $('[id^="subsubmenu"] li a').on("click", function (e) {
   $(this).addClass('active');
   $(this).parent().siblings().find('a').removeClass('active');
 });

 $('#id_versions').change(function () {
   window.location.href = $(this).val();
 });

 // Mobi sub navigation toggle
 $(function () {
   $('#dl-menu').dlmenu();
 });
});


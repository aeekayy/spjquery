////////////////////////////////////////////
/// For group and event invitations
/// ******************************************
/// To ensure that this works, please ensure
/// that the div container of a user object
/// has the class of singleitem
(function ($, document) {
   $(document).ready(function(){
      $('.singleitem').click(function() {
           
           if(!$(this).children("input[type=checkbox]").is(':checked'))
           {
               $(this).children("input[type=checkbox]").attr('checked', 'checked');
               $(this).addClass("active");
           }
           else
           {
               $(this).children("input[type=checkbox]").removeAttr('checked');
               $(this).removeClass("active");
           }
      });
   });
}(jQuery, document));
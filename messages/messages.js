jQuery(document).ready(function(){

    jQuery.ajax({
                url: '/profile/get_friends_list',
		method: 'post',
       	        success: function(transport)
                {
                    var friend_list = transport;
                    
                    jQuery('#recipient').tagit({
                        tagSource: friend_list,
			itemName: "user_ids",
                        fieldName: "usernames",
                        restrictOptions: true,
			caseSensitive: false,
                        allowSpaces: true
                    });
                },
                error: function()
                {
                    
                }
    });
});


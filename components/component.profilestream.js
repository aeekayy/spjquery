// JavaScript file specifically for ProfileStreamModule.class.php
// The items here should not be applied to other components
(function ($, document) {
    $(document).ready(function(){
        $('.profile-live .show-more a').click(function(event){
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            
            var that = $(this);
            var parameter_array = $(that).attr('rel').split('/');
            var limit = parseInt(parameter_array[0]);
            var offset = parseInt(parameter_array[1]);
            // set up the data string
            var data_str = "limit=" + limit + "&offset=" + offset + "&json=true";
            
            $.ajax({
                method: 'POST',
                url: '/social_utility/get_live_status',
                data: data_str,
                success: function(data)
                {
                    $('.profile-live .profile_wall').append(data);
                    offset += limit;
                    $(that).attr('rel', limit+"/"+offset);
                    if(data.length < limit)
                    {
                        $('.profile-live .show-more').hide();
                    }
                }
            });
        });
        
        $('.profile-wall-post .show-more a').click(function(event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            
            var that = $(this);
            var parameter_array = $(that).attr('rel').split('/');
            var limit = parseInt(parameter_array[0]);
            var offset = parseInt(parameter_array[1]);
            if(parameter_array.length > 2)
                var category_name = parameter_array[2];

            // set up the data string
            var data_str = "username=" + $(that).attr('href') + "&limit=" + limit + "&offset=" + offset + "&json=true";
            data_str += (typeof(category_name) === 'undefined') ? '' : '&category=' + category_name;

            var profile_wall = $(this).parents(".profile-wall-post")[0];
            
            $.ajax({
                method: 'POST',
                url: '/social_utility/get_wall_posts',
                data: data_str,
                success: function(data)
                {
                    $($(profile_wall).find('.profile_wall')[0]).append(data);
                    offset += limit;
                    if(typeof(category_name) === 'undefined')
                        $(that).attr('rel', limit+"/"+offset);
                    else
                        $(that).attr('rel', limit+"/"+offset+"/"+category_name);
                    
                    if(data.length < limit)
                    {
                        $($(profile_wall).find('.show-more')[0]).hide();
                    }
                }
            });
        });
    }); 
}(jQuery, document));



// /////////////////////////////////
// Youtube Player specific functions
// /////////////////////////////////
function onYouTubePlayerReady(playerId) {
    var player = $('#' + playerId)[0];

    player.addEventListener('onStateChange', '(function(state) { return playerState(state, "' + playerId + '"); })');
}

function playerState(state, playerId)
{
    console.log(state);
    console.log(playerId);
}
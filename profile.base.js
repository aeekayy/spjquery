(function ($, document) {
    jQuery(document).ready(function(){
    
    	$.ajax({
			method: 'POST',
			url: '/social_utility/alias',
			success: function(transport) {
				// regular expressions for activating the
				// different systems for social profiles
				var re_profile = new RegExp("^\\" + transport['profile'] + ".+$", "g");
				var re_group = new RegExp("^\\" + transport['groups'] + ".+$", "g");
				var re_event = new RegExp("^\\" + transport['events'] + ".+$", "g");
				var window_path = window.location.pathname;
				
				// Global activations
				hide_dev();
				activate_colorbox();
				activate_buttons();
				activate_auxiliary();
				(function ($) { 
				    // Sectional activations
				    if(re_profile.test($.trim(window_path)))
				    {
					// activate the like system for the star
					// rating system
					activate_like_system();
					// activate the comment system
					activate_comment_system();
				    }
				    else if(re_group.test($.trim(window_path)))
				    {
					activate_group_like_system();
					//activate_group_categories();
				    }
				    else if(re_event.test($.trim(window_path)))
				    {
					activate_event_like_system();
					//activate_event_categories();
				    }
				}(jQuery));
			}
		});
    });
    
    
    // hide those elements tagged with the
    // development 
    function hide_dev()
    {
	var uri = window.location.host;
	var uri_parts = uri.split('.');
	var is_dev = false;
	
	$.each(uri_parts, function(i) {
	    if(uri_parts[i] == "dev")
	    {
		is_dev = true;
	    }
	});
	
	if(!is_dev)
	{
	    $('.development').hide();
	}
    }
    
    // activating colorbox (lightbox for images)
    // and other media
    function activate_colorbox()
    {
		if($("a.colorbox"))
		{
		    $("a.colorbox").colorbox({transition:"fade", photo:true, width: 800, height: 600, scalePhotos: true});
		}
		if($(".inline"))
		{
		    $(".inline").colorbox({iframe: true, width:"60%", height:"80%", onClosed: function() { location.reload(true); }});
		}
		if($(".in-the-wox"))
		{
		    $(".in-the-wox").colorbox();
		}
		if($(".youtube-popup"))
		{
			$(".youtube-popup").colorbox({iframe:true, width:"80%", height: "80%"})	;
		}
    }
    
    function activate_like_system()
    {
	$(".like-comment").click(function(e){
	    var message_id = $(this).attr('rel');
	    var like_obj = $(this);
	    like_comment(like_obj, message_id);
	});
    }
    
    // function used to globally like a profile comment
    function like_comment(obj_context, message_id)
    {
	// get DOM objects necessary for this to happen
	var parent_div = obj_context.parents('.single-post');
	var like_container = parent_div.find('.like-container');
	var like_image = like_container.find('.like-comment');
	var like_text_span = like_container.find('.like-count');
	var like_text_link = parent_div.find('.response-like').children('a');
	
	// get the profile information
	var profile_id = $("#profile_id").val();
	if(typeof profile_id === "undefined")
	{
	    var profile_link = $('.logged-in').find('a').attr('href').split('/');
	    profile_id = profile_link[profile_link.length - 1];
	}
	
	// data that will be sent via AJAX
	var dataString = 'message_id=' + message_id + '&profile_id=' + profile_id;
	
	$.ajax({
		method: 'POST',
		url: '/social_utility/toggle_rating',
		data: dataString,
		success: function(data)
		{
		    var like_text;
		    
		    if(data == 0)
		    {
			like_text = "No Likes";
		    }
		    else if(data > 1)
		    {
			like_text = data + " Likes";
		    }
		    else
		    {
			like_text = "1 Like";
		    }
		    
		    like_text_span.text(like_text);
		    like_image.toggleClass('active-like');
		    if(like_image.hasClass('active-like'))
		    {
			$(like_text_link[0]).text('Remove Like');
		    }
		    else
		    {
			$(like_text_link[0]).text('Like');
		    }
		}
	});
	
    }
    
    function activate_comment_system()
    {
	$('.submit-comment').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var parent_div = $(this).parents('.message-container');
	    var div_comment = parent_div.find('.message-comment');
	    var div_form_comment = $(parent_div).find('.post-response');
	    var parent_message = $(this).parent().find('#parent_message').val();
	    var message_content = $(this).parent().find('#message_content').val();
	    var profile_id = $(this).parent().find('#profile_id').val();
	    if(typeof profile_id === "undefined")
	    {
		var profile_link = $('.logged-in').find('a').attr('href').split('/');
		profile_id = profile_link[profile_link.length - 1];
	    }
	    
	    if($.trim(message_content) != '')
	    {
		var dataString = 'parent_message=' + parent_message + '&content=' + $.trim(message_content) + '&profile_id=' + profile_id;
		
		$.ajax({
		    type: "POST",
		    url: "/profile/comment",
		    data: dataString,
		    success: function(data){
			$(data).appendTo(div_comment).slideDown();
			div_form_comment.hide();
		    }
		});
	    }
	    
	    return false;    
	});
	
	$('.cancel-comment').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var parent_div = $(this).parents('.message-container');
	    var div_form_comment = $(parent_div).find('.post-response');
	    div_form_comment.hide().slideUp();
	});
	
	$('.response-comment a').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    
	    var post_div = $(this).parents('.single-post');
	    var post_field = post_div.find('.post-response');
	    
	    post_field.slideDown();
	    
	});
	
	$('.response-like a').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var post_to_like_id = $(this).attr('rel');
	    var post_div = $(this).parents('.single-post');
	    
	    like_comment($(this), post_to_like_id);
	});
	
	$('.response-delete a').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var post_to_delete_id = $(this).attr('rel');
	    var post_div = $(this).parents('.single-post');
    
	    var dataString = 'post_id=' + post_to_delete_id;
	    
	    $( "<div id='dialog-confirm' class='socialprofile jquery-dialog'>Are you sure that you want to delete this post?</div>" ).dialog({
		    resizable: false,
		    height:200,
		    width: 400,
		    modal: true,
		    buttons: {
			"Delete Post": function() {
			    $.ajax({
				type: "POST",
				url: "/profile/delete_post",
				data: dataString,
				success: function() {
				    post_div.slideUp();
				}
			    });
			    $( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		    }
	    });
	    
	});
	
	$('.delete-button a').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	
	    
	    var post_to_delete_id = $(this).attr('rel');
	    var post_div = $(this).parents('.single-post');
	    
	    var dataString = 'post_id=' + post_to_delete_id;
	    
	    $("<div id='dialog-confirm' class='socialprofile jquery-dialog'>Are you sure that you want to delete this post?</div>").dialog({
		    resizable: false,
		    height:200,
		    width: 400,
		    modal: true,
		    buttons: {
			"Delete Post": function() {
			    $.ajax({
				type: "POST",
				url: "/profile/delete_post",
				data: dataString,
				success: function() {
				    post_div.slideUp();
				},
				error: function() {
				    
				}
			    });
			    $(this).dialog( "close" );
			},
			Cancel: function() {
				$(this).dialog( "close" );
			}
		    }
	    });
	});
	
	//$('button#post_message').click(function(event) {
	     // get the profile information
	//    var uri = window.location.pathname;
	//    var uri_parts = uri.split('/');
	//    var profile_id = $(document).find('#profile_id').val();
	//    if(typeof profile_id === "undefined")
	//    {
	//	var profile_link = $('.logged-in').find('a').attr('href').split('/');
	//	profile_id = profile_link[profile_link.length - 1];
	//    }
	    
	//    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	//    var message_content = $("#SocialProfileMessage-Content").val();
	//    var dataString = 'in_content=' + message_content + '&profile_id=' + profile_id;
	    
	//    if(message_content.trim()!="")
	//    {
	//	
	//	$.ajax({
	//	    type: "POST",
	//	    url: "/profile/add_post",
	//	    data: dataString,
	//	    success: function(data) {
	//		$('.profile_wall').prepend(data).slideDown();
	//		$("#SocialProfileMessage-Content").val("");
	//	    }
	//	});
	//	
	//    }
	//});
    }
    
    function activate_group_like_system()
    {
	$(".like-comment").click(function(e){
	    var message_id = $(this).attr('rel');
	    var uri = window.location.pathname;
	    var uri_parts = uri.split('/');
	    profile_id = uri_parts[(uri_parts.length)-1];
	    $.ajax({
		    method: 'POST',
		    url: '/groups/toggle_rating',
		    data: { message_id: message_id, profile_id: profile_id}
	    });
	    
	    $(this).toggleClass('active-like');
	});
    }
    
    function activate_event_like_system()
    {
	$(".like-comment").click(function(e){
	    var message_id = $(this).attr('rel');
	    var uri = window.location.pathname;
	    var uri_parts = uri.split('/');
	    profile_id = uri_parts[(uri_parts.length)-1];
	    $.ajax({
		    method: 'POST',
		    url: '/events/toggle_rating',
		    data: { message_id: message_id, profile_id: profile_id}
	    });
	    
	    $(this).toggleClass('active-like');
	});
    }
    
    function activate_group_categories()
    {
	$('.group-link').click(function() {
	    var classes = $(this).attr('class').split(' ');
	    var tab = classes[(classes.length - 1)];
	    $('.group-listing').hide();
	    $('#'+tab).show();
	});
    }
    
    function activate_event_categories()
    {
	$('.event-link').click(function() {
	    var classes = $(this).attr('class').split(' ');
	    var tab = classes[(classes.length - 1)];
	    $('.event-listing').hide();
	    $('#'+tab).show();
	});
    }
    
    //*************************************//
    //***** Function for Default Buttons***//
    //*************************************//
    function activate_buttons()
    {
	    
	/*****************************/
	//****** Groups Requests *****/
	//****************************/
	$('button.group-accept').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var group_link = $(this).attr("rel");
	    var link_array = group_link.split('/');
	    var dataString = "actn=add&id=" + link_array[(link_array.length - 1)];
	    // get the group's name
	    var group_name = $(this).parents('li').find('.group_name').text();
	    
	    $.ajax({
		type: "POST",
		url: "/social_utility/postGroupResponse",
		data: dataString,
		success: function (response) {
		    confirm_group_add(group_name, group_link);
		},
		error: function() {
		    error_dialog();
		}
	    });
	});
	
	$('button.view-button').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    window.location = $(this).attr('rel');
	});
	
	$('button.group-reject').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var dataString = "actn=del&id=" + $(this).attr("rel");
	    var group_name = $(this).parents('li').find('.group_name').text();
	    
	    $.ajax({
		type: "POST",
		url: "/social_utility/postGroupResponse",
		data: dataString,
		success: function (response) {
		    confirm_group_del(group_name);
		},
		error: function() {
		    error_dialog();
		}
	    });
	});
	
	$('button.event-accept').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var event_name = $(this).parents('li').find('.event_name').text();
	    // get the event's ID number
	    var group_link = $(this).attr("rel");
	    var link_array = group_link.split('/');
	    
	    event_add(event_name, link_array[(link_array.length - 1)]);
	});
	
	$('button.event-reject').click(function(event) {
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    var dataString = "actn=del&id=" + $(this).attr("rel");
	    var event_name = $(this).parents('li').find('.event_name').text();
	    
	    $.ajax({
		type: "POST",
		url: "/social_utility/postEventResponse",
		data: dataString,
		success: function (response) {
		    confirm_event_del(event_name);
		},
		error: function() {
		    error_dialog();
		}
	    });
	});
	
    }
    
    
    function activate_auxiliary()
    {
	 /*****************************/
	//****** Friend Requests *****/
	//****************************/
	$('button.accept').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    
	    // get 
	    var list_item = $(this).parents('li');
	    var profile_picture_src = list_item.find('img').attr('src');
	    var name = list_item.find('.profile_name').text();
	    var username = list_item.find('.username').text();
	    
	    accept_request(profile_picture_src, name, username);
	});
	
	$('button.reject').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    
	    // get 
	    var list_item = $(this).parents('li');
	    var profile_picture_src = list_item.find('img').attr('src');
	    var name = list_item.find('.profile_name').text();
	    var username = list_item.find('.username').text();
	    
	    var dataString = "username=" + username + "&status_update=reject";
	    $.ajax({
		    type: "POST",
		    url: "/social_utility/changeFriendStatus",
		    data: dataString,
		    success: function (response) {
			reject_request_success(name);
		    },
		    error: function() {
			error_dialog();
		    }
	    });
	});
    
	$('.addfriend-link a').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    
	    // adjust the information on/in the dialog
	    var list_item = $(this).parents('li');
	    
	    if(list_item.length > 0)
	    {
		var profile_container = list_item.find('.profile-picture');
		var profile_picture_src = profile_container.find('img').attr('src');
		var username = profile_container.find('img').attr('alt');
		var firstname = profile_container.find('a').attr('rel');
	    }
	    else
	    {
		var profile_picture_src = $('.profile-picture').find('img').attr('src');
		var username = $('.profile-picture').find('img').attr('alt');
		var firstname = $('.profile-picture').find('a').attr('rel');
	    }
	    
	    var span_obj = $(this).parent();
	    
	    friend_request_dialog(username, firstname, profile_picture_src);
	    
	    $('.message-link a').click(function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		$('.dialog-message').slideDown('fast');
	    });
	});
    }
}(jQuery, document));


//*************************************//
//***** Functional Functions***********//
//*************************************//
function escapeHtml(unsafe) {
  return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

// replaces an image with an error 
function img_error(source){
    source.src = "http://static.blazonco.com/stylesheets/social/images/image_not_found.png";
    source.onerror = "";
    return true;
}

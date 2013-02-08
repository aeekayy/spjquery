// JavaScript file specifically for ProfilePostModule.class.php
// The items here should not be applied to other components
(function ($, document) {
    $(document).ready(function(){
		// regular expressions
		// regular expressions for what post function to call
		// whether it's events, groups or profile
		var re_group = new RegExp("^\\" + group_tag + ".+$", "g");
		var re_event = new RegExp("^\\" + event_tag + ".+$", "g");
		var window_path = window.location.pathname;
		// regular expression for different websites
		var youtube_regex = /^((http:\/\/)?youtu.be\/\w+|(http:\/\/)?(www\.)?youtube.com\/(v\/|watch\?v\=)\w+(&[A-z0-9]+(\=\w+)*)*)$/i;
		var upload_component;
		// place holder for content type and link
		var content_type;
		var content_link;
		
		// buttons for different aspects of the post component
		$('.profile-post-link').click(function(event) {
		    event.preventDefault ? event.preventDefault() : event.returnValue = false;
		   $('.post-link').slideToggle();
		   $('.post-image').hide();
		   $('.post-video').hide();
		});
		
		$('.profile-post-image-link').click(function(event) {
		    event.preventDefault ? event.preventDefault() : event.returnValue = false;
		   $('.post-image').slideToggle();
		   $('.post-link').hide();
		   $('.post-video').hide();
		});
		
		 $('.profile-post-video-link').click(function(event) {
		    event.preventDefault ? event.preventDefault() : event.returnValue = false;
		   $('.post-video').slideToggle();
		   $('.post-link').hide();
		   $('.post-image').hide();
		});
		
		
		///////////////////////////////
		// Element Behavior ///////////
		///////////////////////////////
		// behavior for textareas
		$('textarea.jq-textarea-comment').focus(function() {
		    if($(this).val().trim()=="Type your comment here.")
		    {
				$(this).val("");
				$(this).addClass("active");
		    }
		});
		
		$('textarea.jq-textarea-comment').blur(function() {
		    if($(this).val().trim()=="")
		    {
				$(this).val("Type your comment here.");
				$(this).removeClass("active");
		    }
		});
		
		// behavior for link box
		$('input.jq-inputbox-link').focus(function() {
		   if($(this).val().trim() == "http://")
		   {
				$(this).val("");
				$(this).addClass("active");
		   }
		});
		
		$('input.jq-inputbox-link').blur(function() {
		    if($(this).val().trim() == "")
		    {
				$(this).val("http://");
				$(this).removeClass("active");
		    }
		    else
		    {
				// get the field contents
				var fieldContent = $(this).val().trim();
				var input_obj = $(this);
				
				if(!(/^([A-z]([A-z]|\d|\+|-|\.)*\:\/\/)*(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(fieldContent)))
				{
				    $(input_obj).addClass('form-error');
				}
				else
				{
				    $(input_obj).removeClass('form-error');
				    var dataString = "url=" + $(input_obj).val();
				    
				    $.ajax({
						method: 'POST',
						url: '/social_utility/getPageInformation',
						data: dataString,
						success: function(data)
						{
						    $('.post-link').empty();
						    var quick_description = (data['description'].trim()=="")?"<em>No description.</em>":data['description'].trim();
						    $('.post-link').html("<input type='hidden' name='link' value='"+$(input_obj).val()+"'/><div class='linkloaded'><div class='linkimg'><img src='"+data['favicon']+"' alt='"+data['title']+"'/></div><div class='linktitle'><a href='"+data['url']+"'><h4>"+data['title']+"</h4></a></div><div class='linkdescript'>"+quick_description+"</div></div><br class='clearall'/>");
						    content_type = "link";
						    content_link = data['url'];
						}
				    });
				}
		    }
		});
		
		// on link clear
		// <span>Link:</span><input name="link" type="text" id="post-link-text" value="http://" class="jq-inputbox-link user-input"/>
		
		// behavior for image link box
		$('input.jq-inputbox-image').change(function() {
		    content_type = "image";
		    content_link = data['link'];
		});
		
		// behavior for video link box
		$('input.jq-inputbox-video').focus(function() {
		   if($(this).val().trim() == "http://")
		   {
				$(this).val("");
				$(this).addClass("active");
		   }
		});
		
		$('input.jq-inputbox-video').blur(function() {
		    if($(this).val().trim() == "")
		    {
				$(this).val("http://");
				$(this).removeClass("active");
		    }
		    else
		    {
				var video_id = $('input.jq-inputbox-video').val();
				
				if(youtube_regex.test(video_id))
				{
				    var video_url = video_id.split('/');
				    var end_url = video_url[(video_url.length - 1)].split('&');
				    var vid_id = "";
				    
				    if(end_url.length == 1 && !end_url[0].match(/^watch\?v\=/))
				    {
						vid_id = end_url[0];
				    }
				    else
				    {
						for(var ia = 0; ia < end_url.length; ia++)
						{
						    if(end_url[ia].match(/^watch\?v\=/))
						    {
								var tmp_arr = end_url[ia].split('=');
								vid_id = tmp_arr[1];
						    }
						}
				    }
				    
				    // add the video ID to the data string that will be sent
				    var dataString = "vid_id=" + vid_id + "&json=true";
				    
				    $.ajax({
						method: 'POST',
						url: '/social_utility/getYoutubeContent',
						data: dataString,
						success: function(data)
						{
						    $('.post-video').empty();
						    $('.post-video').html("<input type='hidden' name='video-link' value='"+video_id+"'/><div id='ytapiplayer'>You need Flash player 8+ and JavaScript enabled to view this video.</div><div id='ytdetails'><div id='ytvidtitle'><a href='"+data['link']+"'><h4>"+data['title']+"</h4></a></div><div id='ytviddescript'>"+data['description']+"</div></div><br class='clearall'/>");
						    var params = { allowScriptAccess: "always" };
						    var attrs = { id: "post_ytplayer" };
						    swfobject.embedSWF("http://www.youtube.com/v/"+data['id']+"?enablejsapi=1&playerapiid=ytplayer&version=3",
							       "ytapiplayer", "192", "108", "8", null, null, params, attrs);
						    content_type = "video";
						    content_link = data['link'];
						}
				    });
				}
		    }
		});
	});
}(jQuery, document));
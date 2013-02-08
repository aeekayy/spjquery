//****
//*** For friend requests
//******************************
// the friend request function for a dialog box for the friend request
function friend_request_dialog(username, first_name, img_src)
{
    // variable for the div of the dialog box
    var request_div = "<div id='request-friend' class='socialprofile jquery-dialog'><div class='dialog-container'><div class='picture-frame'><img src='" + img_src;
    request_div += "'/></div><div class='dialog-content'><p>Are you sure that you want to add <span class='firstname'>" + first_name;
    request_div += " </span><span class='username'>(" + username;
    request_div += ") </span>as a friend?</p><span class='message-link'><a href='#'>Add A Message</a></span>";
    request_div += "<textarea id='message_request_friend' name='message_request_friend' class='dialog-message'></textarea></div></div></div>";		
    
    var dataString = "username=" + username;
    // create the dialog box
    (function ($, document) {
	$(request_div).dialog({
	    resizable: false,
	    height: 300,
	    width: 500,
	    modal: true,
	    title: "Friend Request",
	    buttons: {
		"Send Request": function() {
		    var message_content = escapeHtml($("#message_request_friend").attr('value'));
		    dataString += "&message=" + message_content;
		    $(this).dialog("close");
		    $.ajax({
			    type: "POST",
			    url: "/social_utility/requestFriend",
			    data: dataString,
			    success: function (response) {
				friend_request_success();
			    },
			    error: function() {
				error_dialog();
			    }
		    });
		},
		Cancel: function() {
		    $(this).dialog("close");
		}
	    }
	});
    } (jQuery, document));
}

// a successful friend request
function friend_request_success()
{
    var success_dialog = "<div id='success-request' class='socialprofile jquery-dialog'>The request was successfully sent.</div>";
    (function ($, document) {
	$(success_dialog).dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: "Friend Request Sent",
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	    });
    } (jQuery, document));
}

//****
//*** For accepting friends
//******************************
function accept_request(img_src, name, username)
{
    // variable for the div of the dialog box
    var accept_div = "<div id='accept-friend' class='socialprofile jquery-dialog'><div class='dialog-container'><div class='picture-frame'><img src='" + img_src;
    accept_div += "'/></div><div class='dialog-content'><p>Are you sure that you want to accept <span class='name'>" + name;
    accept_div += "</span> as a friend?</p></div></div></div>";
    
    var dataString = "username=" + username;
    
    (function ($, document) {
	// create the dialog box
	$(accept_div).dialog({
	    resizable: false,
	    height: 220,
	    width: 500,
	    modal: true,
	    title: "Accept "+name+" as a friend?",
	    buttons: {
		"Yes": function () {
		    dataString += "&status_update=accept"
		    $(this).dialog("close");
		    $.ajax({
			    type: "POST",
			    url: "/social_utility/changeFriendStatus",
			    data: dataString,
			    success: function (response) {
				accept_request_success(name);
			    },
			    error: function() {
				error_dialog();
			    }
		    });
		},
		"No": function() {
		    $(this).dialog("close");
		}
	    }
	});
    } (jQuery, document));
}

// a successful friend request
function accept_request_success(name)
{
    (function ($, document) {
	var success_dialog = "<div id='success-request' class='socialprofile jquery-dialog'>" + name + " has been successfully added as a friend.</div>";
	$(success_dialog).dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: "Friend Accepted",
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	    });
    } (jQuery, document));
}

//****
//*** For declining friends
//******************************
function decline_request(img_src, name, username)
{
    // variable for the div of the dialog box
    var decline_div = "<div id='decline-friend' class='socialprofile jquery-dialog'><div class='dialog-container'><div class='picture-frame'><img src='" + img_src;
    decline_div += "'/></div><div class='dialog-content'><p>Are you sure that you want to decline <span class='name'>" + name;
    decline_div += "</span> from being a friend?</p><span class='username'>" + username + "</span></div></div></div>";
    
    (function ($, document) {
	// create the dialog box
	$(decline_div).dialog({
	    resizable: false,
	    height: 220,
	    width: 500,
	    modal: true,
	    title: "Decline "+name+" as a friend?",
	    buttons: {
		"Yes": function () {
		    
		},
		"No": function() {
		    $(this).dialog("close");
		}
	    }
	});
    } (jQuery, document));
}

// a successful friend reject
function reject_request_success(name)
{
    (function ($, document) {
	var success_dialog = "<div id='success-request' class='socialprofile jquery-dialog'>" + name + " has been removed from the request list.</div>";
	$(success_dialog).dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: "Request Rejected",
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	    });
    } (jQuery, document));
}

//****
//*** For deleteing friends
//******************************
function delete_friend(img_src, name, username)
{
    // variable for the div of the dialog box
    var decline_div = "<div id='accept-friend' class='socialprofile jquery-dialog'><div class='dialog-container'><div class='picture-frame'><img src='" + img_src;
    decline_div += "'/></div><div class='dialog-content'><p>Are you sure that you want to delete <span class='name'>" + name;
    decline_div += "</span> from your friend list?</p></div></div></div>";
    
    var dataString = "username=" + username;
    
    (function ($, document) {
	// create the dialog box
	$(decline_div).dialog({
	    resizable: false,
	    height: 220,
	    width: 500,
	    modal: true,
	    title: "Delete "+name+" from your friend list?",
	    buttons: {
		"Yes": function () {
		    $(this).dialog("close");
		    $.ajax({
			    type: "POST",
			    url: "/social_utility/deleteFriend",
			    data: dataString,
			    success: function (response) {
				delete_friend_success(name);
			    },
			    error: function() {
				error_dialog();
			    }
		    });
		},
		"No": function() {
		    $(this).dialog("close");
		}
	    }
	});
    } (jQuery, document));
}

// a successful friend delete
function delete_friend_success(name)
{
    (function ($, document) {
	var success_dialog = "<div id='success-request' class='socialprofile jquery-dialog'>" + name + " has been removed from your friend list.</div>";
	$(success_dialog).dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: "Friend Deleted",
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	    });
    } (jQuery, document));
}

// ////////////////////
//**********************
// Group List Confirmation
/////////////////////////
function confirm_group_add(group_name, link)
{
    (function ($, document) {
	$("<div class='socialprofile jquery-dialog'>You have been added to "+group_name+".  Would you like to go to the group's page?</div>").dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: "You Have Joined "+group_name,
	       buttons: {
		    "Go To Group's Page": function() {
			window.location = link;  
		    },
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	});
    } (jQuery, document));
}

function confirm_group_del(group_name)
{
    (function ($, document) {
	$("<div class='socialprofile jquery-dialog'>You have removed "+group_name+" from your list of group requests.</div>").dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: group_name,
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	    });
    } (jQuery, document));
}

// ////////////////////
//**********************
// Event List Confirmation
/////////////////////////
function event_add(event_name, id)//, link, src)
{
    (function ($, document) {
	var dialog_box = "<div class='socialprofile jquery-dialog social-dialog event-rsvp'><span class='description'>Would you like to attend "+event_name+"?</span><span class='dialog-box selection'><input type='radio' name='event-response' value='attending' class='dialog-box form-item radio'>Attending</span><span class='dialog-box selection'><input type='radio' name='event-response' value='maybe' class='dialog-box form-item radio'>Maybe</span><span class='dialog-box selection'><input type='radio' name='event-response' value='decline' class='dialog-box form-item radio'>Not Attending</span></div>";
	var open_dialog_box = $(dialog_box).dialog({
	       resizable: false,
	       height: 300,
	       width: 500,
	       modal: true,
	       title: "RSVP",
	       buttons: {
		    "Respond": function() {
			if($("input[name='event-response']:checked").length > 0)
			{
			    var dataString = "actn=add&id=" + id + "&response_text=" + $("input[name='event-response']:checked").val();
			    
			    $.ajax({
				type: "POST",
				url: "/social_utility/postEventResponse",
				data: dataString,
				success: function (response) {
				    $(open_dialog_box).dialog("close");	
				},
				error: function() {
				    error_dialog();
				}
			    });
			}
		    },
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	    });
    } (jQuery, document));
}

function confirm_event_del(event_name)
{
    (function ($, document) {
	$("<div class='socialprofile jquery-dialog'>You have removed "+event_name+" from your event invitation list.</div>").dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: event_name,
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	});
    }(jQuery, document));
}

// ////////////////////
//**********************
// For Errors
/////////////////////////
function error_dialog()
{
    (function ($, document) {
	$("<div class='socialprofile jquery-dialog'>There was an error on this page.</div>").dialog({
	       resizable: false,
	       height: 150,
	       width: 500,
	       modal: true,
	       title: "Error Detected",
	       buttons: {
		    "Close": function() {
			$(this).dialog("close");
		    }
	       }
	});
    } (jQuery, document));
}
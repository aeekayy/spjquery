$(document).ready(function(){
    //setup_paginator();
    
    $('span.user-description a').click(function(event){
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	
	// adjust the information on/in the dialog
	var list_item = $(this).parents('li');
	var profile_picture_src = list_item.find('img').attr('src');
	var username = list_item.find('.username').text();
	var firstname = list_item.find('h3').find('.first_name').text();
	
	var span_obj = $(this).parent();
	
	friend_request_dialog(username, firstname, profile_picture_src);
	
	$('.message-link a').click(function(event){
	    event.preventDefault ? event.preventDefault() : event.returnValue = false;
	    $('.dialog-message').slideDown('fast');
	});
    });
});

function error_dialog()
{
    $("<div>There was an error on this page.</div>").dialog({
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
}

function setup_paginator()
{
    var profile_list;

    $.ajax({
            url: '/social_utility/user_list',
            method: 'post',
            success: function(transport)
            {
                profile_list = transport;
                
                var handlePagination = function (state) {
                        var content_div = YAHOO.util.Dom.get('pagination_list');
                        var startIndex = state.recordOffset,
                        recs = profile_list.slice(startIndex, startIndex + state.rowsPerPage);
                        content_div.start = startIndex + 1;
			//content_div.innerHTML = recs.join(" ");                        
                        paginator.setState(state);
                }

                var paginator = new YAHOO.widget.Paginator({
                        rowsPerPage: 9,
                        totalRecords: profile_list.length,
                        containers: ['pagination_control'],
                        template : "{PreviousPageLink}  {CurrentPageReport}  {NextPageLink}",
                        previousPageLinkLabel : "< Prev",
                        nextPageLinkLabel : "Next >"
                });

                paginator.subscribe('changeRequest', handlePagination);
                paginator.render();
                handlePagination(paginator.getState());
            },
            error: function()
            {
                    Blazonco.notifyError({message: 'User data could not be fetched.'});
            }
    });
}

function replaceHTML(s)
{
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
	"nbsp": " ",
	"amp": "&",
	"quot": "\"",
	"lt": "<",
	"gt": ">"
    };
    
    return function(s) {
	return ( s.replace(translate_re, function(match, entity) {
	    return translate[entity];
	}))
    }
}
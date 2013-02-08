(function ($) { 
$(document).ready(function(){
    
    if($('.community #pagination_list').length > 0 )
    {
	//setup_paginator();
    }
    
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
    
    $('.delete').click(function(event) {
	event.preventDefault ? event.preventDefault() : event.returnValue = false;
	
	// get 
	var list_item = $(this).parents('li');
	var profile_picture_src = list_item.find('img').attr('src');
	var name = list_item.find('.profile_name').text();
	var username = list_item.find('.username').text();
	
	delete_friend(profile_picture_src, name, username);
    });
});



function setup_paginator()
{
	var list_items = YAHOO.util.Dom.getElementsByClassName('singleitem');
	
	var handlePagination = function (state) {
		var content_div = YAHOO.util.Dom.get('pagination_list');
		var startIndex = state.recordOffset,
		recs = list_items.slice(startIndex, startIndex + state.rowsPerPage);		
		content_div.start = startIndex + 1;
		content_div.innerHTML = "";
		for(indx in recs)
		{
		    var tmp_item = recs[indx];
		    content_div.appendChild(tmp_item);
		}
		paginator.setState(state);
	}

	var paginator = new YAHOO.widget.Paginator({
		rowsPerPage: 9,
		totalRecords: list_items.length,
		containers: ['pagination_list','pagination_control'],
		template : "{PreviousPageLink}  {CurrentPageReport}  {NextPageLink}",
		previousPageLinkLabel : "< Prev",
		nextPageLinkLabel : "Next >"
	});

	paginator.subscribe('changeRequest', handlePagination);
	paginator.render();
	handlePagination(paginator.getState());
        
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
}(jQuery));
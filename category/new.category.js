(function ($) { 
$(document).ready(function(){
    
    if(typeof String.prototype.trim !== 'function') {
	String.prototype.trim = function() {
	    return this.replace(/^\s+|\s+$/g, ''); 
	}
    }
    
	var userTags = [];
	var regroup = new RegExp("^\\" + group_tag + ".+$", "g");
	var reevent = new RegExp("^\\" + event_tag + ".+$", "g");
	var reprofile = new RegExp("^\\" + profile_tag + ".+$", "g");
	var uri_parts = window.location.pathname.trim().split('/');
    
	if(regroup.test(window.location.pathname.trim()))
	{
		var group_id = uri_parts[(uri_parts.length - 1)];
		if(is_int(group_id))
		{
		    get_group_current_tags(group_id);
		}
		else
		{
			get_group_current_tags();
		}
    }
	else if(reevent.test(window.location.pathname.trim()))
	{
		var event_id = uri_parts[(uri_parts.length - 1)];
		if(is_int(event_id))
		{
		    get_event_current_tags(event_id);
		}
		else
		{
		    get_event_current_tags();
		}
	}
	else if(reprofile.test(window.location.pathname.trim()))
	{
		activate_tagging();
	}
});

function get_group_current_tags($id)
{
    $.ajax({
                method: 'POST',
		url: '/social_utility/getGroupTags',
                data: { id: $id},
		async: false,
		cache: false,
       	        success: function(data)
                {
		    $.ajax({
		   method: 'POST',
		   url: '/social_utility/get_category_list',
		   data: { c_type: 'groups'},
		   success: function(transport)
		   {
			var category_list = transport;
			$('#CategoryTag').tagit({
			    itemName: "category_ids",
			    fieldName: "group",
			    allowSpaces: true,
			    restrictOptions: true,
			    caseSensitive: false,
			    tagSource: category_list
			});
		   }});
                },
                error: function()
                {
                    Blazonco.notify("Error");
                }
    });    
}

function get_event_current_tags($id)
{
    var interest_field_name = $(this).attr('name');
    
    $.ajax({
	method: 'POST',
	url: '/social_utility/getEventTags',
	data: { id: $id},
	async: false,
	cache: false,
	success: function(data)
	{
	$.ajax({
	   method: 'POST',
	   url: '/social_utility/get_category_list',
	   data: { c_type: 'events'},
	   success: function(transport)
	   {
		var category_list = transport;
		
		$('#CategoryTag').tagit({
		    itemName: "category_ids",
		    fieldName: "event",
		    allowSpaces: true,
		    restrictOptions: true,
		    caseSensitive: false,
		    tagSource: category_list
		});
	   }});
	},
	error: function()
	{
	    Blazonco.notify("Error");
	}
    });    
}

// activate tagging on those fields
// with the tagging class
function activate_tagging() {
    $('.tagit_field').each( function(index) {
	var interest_field_name = $(this).attr('name');
        $(this).tagit({
                itemName: "interests",
                fieldName: interest_field_name,
                allowSpaces: true
        });	
    });
}

}(jQuery));


function is_int(input){
    return parseInt(input)==input;
}

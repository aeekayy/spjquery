/////////////////////////////
// Registration.js
//////////////////////////////
//****************************
// JavaScript file exclusively for the RegisterProfileController
// and the pages, components associated with that controller
// alone.
(function ($, document) {
    $(document).ready(function() {
    
	var emailRegEx = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
	var form_error = false;
	var email = $('#email'), email_error = false;
	var first_name = $('#first_name'), first_name_error = false;
	var last_name = $('#last_name'), last_name_error = false;
	var username = $('#username'), username_error = false;
	var password = $('#password'), password_error = false;
	var confirm_password = $('#confirmPassword'), confirm_password_error = false;

	email.blur( function () {
	    if(!email.val().match(emailRegEx))
	    {
		email_error = true;
		email.addClass('error');
		$('#email-error').show();
	    }
	    else
	    {
		email.removeClass('error');
		$('#email-error').hide();
	    }
	});
	
	first_name.blur( function () {
	    if(first_name.val().length > 0)
	    {
		if(first_name_error)
		{
		    first_name.removeClass('error');
		    $('#first-name-error').hide();
		}
		
	    }
	    else
	    {
		first_name_error = true;
		first_name.addClass('error');
		$('#first-name-error').show();
	    }
	});
	
	last_name.blur( function () {
	    if(last_name.val().length > 0)
	    {
		if(last_name_error)
		{
		    last_name.removeClass('error');
		    $('#last-name-error').hide();
		}
		
	    }
	    else
	    {
		last_name_error = true;
		last_name.addClass('error');
		$('#last-name-error').show();
	    }
	});
	
	username.blur( function () {
	    if(username.val().length > 5)
	    {
		if(username_error)
		{
		    username.removeClass('error');
		    $('#username-error').hide();
		}
		
	    }
	    else
	    {
		username_error = true;
		username.addClass('error');
		$('#username-error').show();
	    }
	});
	
	password.blur( function () {
	    if(password.val().length > 6)
	    {
		if(password_error)
		{
		    password.removeClass('error');
		    $('#password-error').hide();
		}
		
	    }
	    else
	    {
		password_error = true;
		password.addClass('error');
		$('#password-error').show();
	    }
	});
	
	confirm_password.blur( function () {
	    if(confirm_password.val() == password.val())
	    {
		if(confirm_password_error)
		{
		    confirm_password.removeClass('error');
		    $('#confirm-password-error').hide();
		}
	    }
	    else
	    {
		confirm_password_error = true;
		confirm_password.addClass('error');
		$('#confirm-password-error').show();
	    }
	});
	
	$('.birthdate_question').click(function(e) {
	    if($('.birthdate_question').attr('checked'))
	    {
		$('#birthmonth').attr('disabled', 'disabled');
		$('#birthday').attr('disabled', 'disabled');
		$('#birthyear').attr('disabled', 'disabled');
	    }
	    else
	    {
		$('#birthmonth').removeAttr('disabled');
		$('#birthday').removeAttr('disabled');
		$('#birthyear').removeAttr('disabled');
	    }
	});
	
	// Arrows for the category portioin
	$('.arrow-right').click(function() {
	   $("#possible_categories option:selected").each(function() {
		var option_obj = $(this);
		var dataString = "category_id=" + option_obj.attr("value");
		
		$.ajax({
		    method: 'POST',
		    url: '/social_utility/getCategoryParent',
		    data: dataString,
		    success: function(data)
		    {
			var parent_node = $("#categories").find("option[value='"+data['id']+"']");
			if(parent_node.length == 0 && data['id'] != 0)
			{
			    parent_node = "<option value='" + data['id'] + "' rel='1'>" + data['name'] + "</option>";
			    $("#categories").append(parent_node);
			}
			else
			{
			    parent_node = parent_node[0];
			    $(parent_node).attr('rel', (Number($(parent_node).attr('rel'))+1));
			}
			
			// make sure that the parent node is not found on
			// the list of possible options if it's already
			// on the other list
			
			// find the parent node in the other select list
			var possible_parent_node = $("#possible_categories").find("option[value='"+data['id']+"']");
			
			if(possible_parent_node.length > 0)
			{
			    var old_parent_node = possible_parent_node[0];
			    $(old_parent_node).attr("rel", (Number($(old_parent_node).attr("rel"))- 1));
			}
			
			if($(possible_parent_node[0]).attr('rel') == 0)
			{
			    $(possible_parent_node[0]).remove();
			}
			
			if(data['id'] != 0)
			{
			    $("#categories option[value='" + data['id'] + "']").after(option_obj);
			}
			else if($("#categories").find("option[value='"+ $(option_obj).attr('value') +"']").length == 0 )
			{
			    var new_parent_node = "<option rel='0' value='" + $(option_obj).attr('value') + "'>" + $(option_obj).text() + "</option>";
			    $("#categories").append(new_parent_node);
			}
		    }
		});
	   });
	});
	
	$('.arrow-left').click(function() {
	   $("#categories option:selected").each(function() {
		var option_obj = $(this);
		var dataString = "category_id=" + option_obj.attr("value");
		
		$.ajax({
		    method: 'POST',
		    url: '/social_utility/getCategoryParent',
		    data: dataString,
		    success: function(data)
		    {
			var parent_node = $("#possible_categories").find("option[value='"+data['id']+"']");
			if(parent_node.length == 0 && data['id'] != 0)
			{
			    parent_node = "<option value='" + data['id'] + "' rel='1'>" + data['name'] + "</option>";
			    $("#possible_categories").append(parent_node);
			}
			else
			{
			    parent_node = parent_node[0];
			    $(parent_node).attr('rel', (Number($(parent_node).attr('rel'))+1));
			}
			
			// make sure that the parent node is not found on
			// the list of possible options if it's already
			// on the other list
			
			// find the parent node in the other select list
			var possible_parent_node = $("#categories").find("option[value='"+data['id']+"']");
			
			if(possible_parent_node.length > 0)
			{
			    var old_parent_node = possible_parent_node[0];
			    $(old_parent_node).attr("rel", (Number($(old_parent_node).attr("rel"))- 1));
			}
		       
			if($(possible_parent_node[0]).attr('rel') <= 0)
			{
			    $(possible_parent_node[0]).remove();
			}
			
			if(data['id'] != 0)
			{
			    $("#possible_categories option[value='" + data['id'] + "']").after(option_obj);
			}
			else if($("#possible_categories").find("option[value='"+ $(option_obj).attr('value') +"']").length == 0 )
			{
			    var new_parent_node = "<option rel='0' value='" + $(option_obj).attr('value') + "'>" + $(option_obj).text() + "</option>";
			    $("#possible_categories").append(new_parent_node);
			}
		    }
		});
	   });
	});
    
	
	$('.tagit_field').each( function(index) {
		var interest_field_name = $(this).attr('name');
		$(this).tagit({
		    itemName: "interests",
		    fieldName: interest_field_name,
		    allowSpaces: true
	    });
	});
    });
}(jQuery, document));
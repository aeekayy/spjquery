(function ($, document) {
    $(document).ready(function(){
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
    });
}(jQuery, document));
// on submit, make sure that all items of the
// select field is selected
function selectAllOptions(selStr)
{
    var selObj = document.getElementById(selStr);
    for (var i=0; i<selObj.options.length; i++) {
        selObj.options[i].selected = true;
    }
}
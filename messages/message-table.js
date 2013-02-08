YAHOO.util.Event.onDOMReady(function()
{
    //set up data tables
    var messagesDataSource = new YAHOO.util.DataSource(YAHOO.util.Dom.get('SocialProfile:message-table'));
    messagesDataSource.responseType = YAHOO.util.DataSource.TYPE_HTMLTABLE;
	messagesDataSource.responseSchema = {
		fields:	[
			{key: 'id'},
			{key: 'read'},
                        {key: 'sender'},
                        {key: 'recipient'},
                        {key: 'content'},
                        {key: 'sent'}
		]
	};
	
	var messagesDataTable = new YAHOO.widget.DataTable(
		"SocialMessages:table",
		[
			{key:'sender', label: 'Sent By', sortable: true},
			{key:'recipient', label: 'To', sortable: true},
			{key:'content', label: 'Content', sortable: false},
			{key:'sent', label: 'Sent', sortable: true}
		],
		messagesDataSource,
		{
			selectionMode: 'single',
			sortedBy: {key: 'sent', dir: 'asc'},
			width: '100%',
			paginator: new YAHOO.widget.Paginator({
				rowsPerPage: 20,
				alwaysVisible: false
            })
		}
	);
        
        messagesDataTable.subscribe('rowMouseoverEvent', messagesDataTable.onEventHighlightRow);
	messagesDataTable.subscribe('rowMouseoutEvent', messagesDataTable.onEventUnhighlightRow);
	messagesDataTable.subscribe('rowClickEvent', messagesDataTable.onEventSelectRow);
	messagesDataTable.subscribe('rowSelectEvent', function(params){
            
            // get the message id
            var message_id = params.record.getData('id');
            
            window.location.href = '/profile/messages/' + message_id;
        });
});
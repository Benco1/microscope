// Temp placeholder data
if (Posts.find().count() === 0) {
	var postsData = [
		{
			title: 'Introducing Telescope',
			url: 'http://sachagreif.com/introducing-telescope/'
		},
		{
			title: 'Meteor',
			url: 'http://meteor.com'
		},
		{
			title: 'The Meteor Book',
			url: 'http://themeteorbook.com'
		}
	];

	postsData.forEach(function(post) {
		Posts.insert(post);
	});
};

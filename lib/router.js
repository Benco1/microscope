Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	// Globally subscribe to posts for every route;
	// IR knows when given template is 'ready'
	waitOn: function () { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});
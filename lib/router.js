Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	// Globally subscribe to posts for every route;
	// IR knows when given template is 'ready'
	waitOn: function () { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
	name: 'postPage',
	// 'this' below corresponds to the currently matched route
	data: function () { return Posts.findOne(this.params._id); }
});
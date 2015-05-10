Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
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

Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function () {
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			// Why the extra 'this' here?
			// WHy not just render 'loadingTemplate'
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		// Why not just return? Is this an array of functions?
		this.next();
	}
};

// Redirects to notFound if data fn returns falsy object
// (Seems very 'config-y'; non-intuitive)
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
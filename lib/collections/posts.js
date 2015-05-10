Posts = new Mongo.Collection('posts');

Posts.allow({
	insert: function(userId, doc) {
		// Only allow posting if user is logged in
		return !! userId;
	}
});
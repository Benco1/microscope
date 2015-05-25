Posts = new Mongo.Collection('posts');

Posts.allow({
	remove: function(userId, post) { return ownsDocument(userId, post); }
});


Meteor.methods({
	postInsert: function(postAttributes) {
		// Posts.insert(post);
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if (postWithSameLink) {
			return {
				postExists: true,
				_id: postWithSameLink._id
			}
		}

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	},
	postUpdate: function(id, newAttributes) {
		check(Meteor.userId(), String);
		check(newAttributes, {
			title: String,
			url: String
		});

		var currentPostId = id;

		var post = Posts.findOne(currentPostId);
		var user = Meteor.user();

		// Check if post owned by current user
		if (user._id !== post.userId) {
			return {
				ownsDoc: false
			}
		}

		// If new url, check whether it already exists
		if (newAttributes.url !== post.url) {
			var postWithSameLink = Posts.findOne({url: newAttributes.url});
			if (postWithSameLink) {
				return {
					postExists: true,
					_id: postWithSameLink._id
				}
			}
		}
		// $set only operates on the specified fields, leaving the others untouched
		Posts.update(currentPostId, {$set: newAttributes});

		return {
			_id: currentPostId
		};
	}
});
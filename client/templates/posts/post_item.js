Template.postItem.helpers({
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});
// The "this" here refers to the item in the iterated
// each block of posts list.
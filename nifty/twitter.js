var Twitter = require('twitter');

try {
	var discord_auth = require('../auth.json');
} catch (e) {
	console.log("Auth file not found!");
}

var initialize = function(messageFunction){
	var twitter_client = new Twitter({
		consumer_key: discord_auth.twitter.consumer_key,
		consumer_secret: discord_auth.twitter.consumer_secret,
		access_token_key: discord_auth.twitter.access_token_key,
		access_token_secret: discord_auth.twitter.access_token_secret	
	});

	messageFunction("Initialized! Fire at will, captain.");
	return twitter_client;
}

var postTweet = function(twitter_client, tweet, messageFunction){
	if(twitter_client){
		twitter_client.post('statuses/update', {status: tweet}, function(error, tweet, response){
			if(error){
				console.log('error: ' + error)
				messageFunction("Error posting tweet...")
			}
			else {
				messageFunction("Posted tweet successfully!")
			}
			console.log("Tweeted: " + tweet)
			console.log("Response: " + response)
		})
	}else{
		messageFunction("You must run '!twitter initialize' before you can post a tweet!")
	}
}

module.exports = {
	postTweet: postTweet,
	initialize: initialize
}

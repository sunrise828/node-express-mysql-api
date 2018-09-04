
module.exports = {

	'facebookAuth' : {
		'clientID': 'FACEBOOK_CLIENT_ID',
		'clientSecret': 'FACEBOOK_SECRET_KEY',
		'callbackURL': `${CONFIG.host}/auth/facebook/callback`
	},

	'twitterAuth' : {
		'consumerKey': 'TWITTER_KEY',
		'consumerSecret': 'TWITTER_SECRET',
		'callbackURL': `${CONFIG.host}/auth/twitter/callback`
	},

	'googleAuth' : {
		'clientID': 'GOOGLE_CLIENT_ID',
		'clientSecret': 'GOOGLE_SECRET_ID',
		'callbackURL': `${CONFIG.host}/auth/google/callback`
	}
};
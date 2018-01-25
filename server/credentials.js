var base64 = require('base-64');


/*Consumer key and secret are base64 encoded*/
var getConsumerKey = () => {
	key = 'ajhYSklRTUxXWlc2NzY2VGdOUzZydTdWVQ==';
	return base64.decode(key);
}


var getConsumerSecret = () =>{
	secret = 'TjFrVXJTcWVBcHhOUHFPeEVVVGtuOVZySWRKS0QzMlE3dGt3SFI5WWR5cVpQWGM4elg=';
	return base64.decode(secret);
}

module.exports = {getConsumerKey,getConsumerSecret};



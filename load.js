'use sctrict';

var _
	, request	= require('request').defaults({
		headers: {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36 AzbNodeEdition',
		},
	})
	, repos		= require('./data/repos.json')
	, access_token		= '3130672d9720cc57388ac060a0f94bdc5653d950'
;

if(repos.items && repos.items.length) {
	for(var i in repos.items) {
		
		(function(item){
			
			request('https://api.github.com/repos/' + item.user + '/' + item.repo + '/commits?access_token=' + access_token, function (error, response, body) {
				//console.log('error:', error); // Print the error if one occurred
				//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				//console.log('body:', body); // Print the HTML for the Google homepage.
				
				if(error) {
					console.log('error:', error);
				} else {
					//console.log(JSON.parse(body));
					
					var res = JSON.parse(body);
					
					if(res.length) {
						for(var j in res) {
							
							console.log(res[j].sha, res[j].commit.message, res[j].author.login);
							
						}
					}
					
				}
				
			});
			
		})(repos.items[i]);
		
	}
}

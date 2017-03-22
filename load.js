'use sctrict';

var _
	, request	= require('request').defaults({
		headers: {
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36 AzbNodeEdition',
		},
	})
	, repos					= require('./data/repos.json')
	, argv 					= require('optimist').argv
	, api_url				= 'https://api.github.com'
	, access_token_str		= argv.token ? ('access_token=' + argv.token) : ''
;

console.log('\nToken: ' + access_token_str + '\n');

var getUsers = null;

getUsers = function(last_id) {
	
	last_id = last_id || 0;
	
	if(last_id < 40) {
		
		request(api_url + '/users?since=' + last_id + '&' + access_token_str, function (error, response, body) {
			
			if(error) {
				console.log('error:', error);
			} else {
				
				var res = JSON.parse(body);
				
				if(res.length) {
					
					var _id = 0;
					
					for(var j in res) {
						
						_id = res[j].id;
						
						console.log(_id + ' ' + JSON.stringify(res[j]));
						
					}
					
					getUsers(parseInt(_id));
					
				}
				
			}
			
		});
		
	}
	
};

getUsers();

/*
if(repos.items && repos.items.length) {
	for(var i in repos.items) {
		
		(function(item){
			
			request(api_url + '/repos/' + item.user + '/' + item.repo + '/commits?' + access_token_str, function (error, response, body) {
				//console.log('error:', error); // Print the error if one occurred
				//console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
				//console.log('body:', body); // Print the HTML for the Google homepage.
				
				if(error) {
					console.log('error:', error);
				} else {
					//console.log(JSON.parse(body));
					//console.log(response);
					
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


request(api_url + '/rate_limit?' + access_token_str, function (error, response, body) {
	
	if(error) {
		console.log('error:', error);
	} else {
		console.log(JSON.parse(body));
	}
	
});
*/

/*
/users/devazbn
/users/DevAzbn/repos
*/

var fs = require('fs');
var QuestradeAPI = require('./lib/questrade-api.js');
var TOKEN_PATH = './lastToken';
var lastToken, api;

//zgzRSAJsdCINmKFzUuEA_p8AorWRLJg60

function _saveLastToken(token) {
	fs.writeFile(TOKEN_PATH, token);
}

fs.readFile(TOKEN_PATH, 'utf8', function(err, data) {
	lastToken = data;

	console.log('lastToken', lastToken, '\n');

	api = new QuestradeAPI(lastToken, true);

	api.getAcessToken().then(function(accessInfo) {
		_saveLastToken(accessInfo.refresh_token);
	});

	api.getAccounts().then(function(accounts) {
		console.log('accounts -->', accounts);

		accounts[0].$getPositions().then(function(positions) {
			console.log('positions', positions);
		});

		accounts[0].$getBalances().then(function(positions) {
			console.log('balances', positions);
		});

		accounts[0].$getOrders().then(function(positions) {
			console.log('orders', positions);
		});
	});
});






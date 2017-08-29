const request = require('request');

module.exports = (req, res) => {
	const input = req.query.text.trim();
	res.json([{
		title: '<i>Encrypt or decrypt text in the format "/crypt [encrypt | decrypt] [text]+ [password]"</i>',
		text: input
	}]);
};
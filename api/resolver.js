const request = require('request');
const crypto = require('crypto');

const algorithm = 'aes256';

module.exports = (req, res) => {
	const input = req.query.text.trim();
	const params = input.split(' ');
	
	const encrypt = params[0] === 'encrypt';
	const decrypt = params[0] === 'decrypt';

	const password = params[params.length - 1];
	const text = params.slice(1, params.length - 1).join(' ');

	//Encrypt
	if (encrypt && !decrypt) {
		const inputEncoding = 'utf8';
		const outputEncoding = 'base64';
		const cipher = crypto.createCipher(algorithm, password);
		let encrypted = cipher.update(text, inputEncoding, outputEncoding);
		encrypted += cipher.final(outputEncoding);
		res.json({
			body: `<p>${encodeURIComponent(encrypted)}</p>`,
			raw: true
		});
	//Decrypt
	} else if (decrypt && !encrypt) {
		const inputEncoding = 'base64';
		const outputEncoding = 'utf8';
		const decipher = crypto.createDecipher(algorithm, password);
		let decrypted = decipher.update(decodeURIComponent(text), inputEncoding, outputEncoding);
		decrypted += decipher.final(outputEncoding);
		res.json({
			body: `<p>${decrypted}</p>`,
			raw: true
		});
	//Error
	} else {
		res.json({
			body: '<p>error</p>'
		});
	}
};
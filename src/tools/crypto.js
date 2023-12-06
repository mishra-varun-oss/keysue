const path = require('path');
const crypto = require('crypto');

const configs = require(path.join(__dirname, "./configs.js"));
require('dotenv').config(configs.tools_config_obj);

const algorithm = process.env.CRYPT_ALGORITHM;
const encryption_key = process.env.ENCRYPTION_KEY;
const iv_length = process.env.IV_LENGTH;

function encrypt(text) {
	let iv = crypto.randomBytes(iv_length);
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(encryption_key), iv);
	let encrypted = cipher.update(text);

	encrypted = Buffer.concat([encrypted, cipher.final()]);

	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
	let textParts = text.split(":");
	let iv = Buffer.from(textParts.shift(), 'hex');
	let encryptedText = Buffer.from(textParts.join(':'), 'hex');
	let decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryption_key), iv);
	let decrypted = decipher.update(encryptedText);

	decrypted = Buffer.concat([decrypted, decipher.final()]);

	return decrypted.toString();
}

module.exports = { decrypt, encrypt };

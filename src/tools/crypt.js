const path = require('path');
const crypto = require('crypto');

const configs = require(path.join(__dirname, "./configs.js"));
require('dotenv').config(configs.tools_config_obj);
const algorithm = process.env.CRYPT_ALGORITHM;

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports.encrypt = (text) => {
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

module.exports.decrypt = (text) => {
	let text_iv = text.split(';;;')[0];
	let text_encrypted_data = text.split(';;;')[1];
	let iv = Buffer.from(text_iv, 'hex');
	let encryptedText = Buffer.from(text_encrypted_data, 'hex');
	let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

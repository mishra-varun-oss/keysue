const path = require('path');
const express = require('express');

const router = express.Router();

const login = require(path.join(__dirname, "../middleware/login.js"));
const { encrypt, decrypt } = require(path.join(__dirname, "../tools/crypto.js"));
const db = require(path.join(__dirname, "../tools/db.js"));

router.use(login.login_check);

router.get('/', (req, res) => {
	//INCLUDE ACCESS COLUMN FOR THIS QUERY
	let q = `SELECT * FROM passwords`;
	let passwords = [];
	let is_admin;
	db.query(q, (err, results) => {
		if (err) throw err;
		results.forEach((result) => {
			let obj = {
				id: result.id,
				title: result.title,
				creator: result.owner,
				link: result.link,
				username: result.user_credential,
				password: decrypt(result.pass_credential)
			}
			let permissions = result.permission.split(';;');
			if (permissions.includes(req.session.permission)) {
				passwords.push(obj);
			}
		})
		if (req.session.permission == 'admin') {
			is_admin = true;
		} else {
			is_admin = false;
		}
		res.render('view_passwords', {
			username: req.session.username,
			is_admin: is_admin,
			password: passwords
		});
	})
})

router.get('/add', login.admin_check, (req, res) => {
	res.render('add_passwords', { username: req.session.username });
})

router.post('/add', login.admin_check, (req, res) => {
	let permissions;
	if (Array.isArray(req.body.permission_input)) {
		permissions = req.body.permission_input.join(';;');
	} else {
		permissions = req.body.permission_input;
	}
	let owner = req.session.username;
	let link = req.body.link;
	let cred_username = req.body.username;
	let cred_password = encrypt(req.body.password);
	let title = req.body.title;
	let q = `INSERT INTO passwords VALUES (default, '${owner}', '${title}', '${link}', '${cred_username}', '${cred_password}', '${permissions}')`;
	db.query(q, (err, results) => {
		if (err) throw err;
		res.redirect('/passwords/add');
	})
})

module.exports = router;

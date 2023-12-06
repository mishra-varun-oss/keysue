const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
	let u = req.body.username;
	let p = req.body.permission;

	req.session.username = u;
	req.session.permission = p;
	req.session.loggedin = true;

	res.send({ url: `https://keysue.com/passwords` });
})

module.exports = router;

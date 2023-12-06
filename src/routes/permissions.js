const path = require('path');
const express = require('express');

const router = express.Router();

const login = require(path.join(__dirname, "../middleware/login.js"));

router.use(login.login_check);
router.use(login.admin_check);

router.get('/', (req, res) => {
	res.render('view_permissions', { username: req.session.username });
})

module.exports = router;

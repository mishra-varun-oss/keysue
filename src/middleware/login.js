module.exports.login_check = (req, res, next) => {
	if (req.session.loggedin) {
		next();
	} else {
		res.redirect('/');
	}
}	

module.exports.admin_check = (req, res, next) => {
	if (req.session.permission == 'admin') {
		next();
	} else {
		res.redirect('/passwords');
	}
}

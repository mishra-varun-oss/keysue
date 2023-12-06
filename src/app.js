const path = require('path');
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
const body_parser = require('body-parser');

const app = express();

const public_directory = path.join(__dirname, "../public");
const views_directory = path.join(__dirname, "../templates/views");

const login = require(path.join(__dirname, "./routes/login.js"));
const passwords = require(path.join(__dirname, "./routes/passwords.js"));
const permissions = require(path.join(__dirname, "./routes/permissions.js"));
const configs = require(path.join(__dirname, "./tools/configs.js"));

require("dotenv").config(configs.tools_config_obj);

app.set('view engine', 'hbs');
app.set('views', views_directory);
app.use(express.static(public_directory));
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());
app.use(session({ secret: 'bosenc700silver3.5hrscharge!', resave: false, saveUninitialized: true }));

app.use('/login', login);
app.use('/passwords', passwords);
app.use('/permissions', permissions);

app.get('/', (req, res) => {
	res.render('login');
})

app.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/?logout=true');
})

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`keysue.com is running on port ${port}!`);
})

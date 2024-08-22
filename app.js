require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const routes = require('./app/routes');
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
 
app.use(cors());
app.use(compression());
 
var MySQLStore = require('express-mysql-session')(session);

var options = {
	host: config.host,
	port: 3306,
	user: config.username,
	password: config.password,
	database: config.database
};


app.use(session({
	key: 'outfox-session',
	secret: process.env.APP_SECRET,
	store: new MySQLStore(options),
	resave: false,
	saveUninitialized: false
}));


// app.use(csrfProtection);
// app.use(nocache());
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));

// app.use('/assets', express.static(path.join(__dirname, 'node_modules', 'admin-lte')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + "/uploads"));

routes(app);

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})

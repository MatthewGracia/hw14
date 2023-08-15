const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure the session settings
const sess = {
  secret: 'Super secret secret', // Secret used to sign the session ID cookie
  cookie: {
    maxAge: 300000, // Maximum age of the session cookie in milliseconds
    httpOnly: true, // Restrict cookie access to HTTP/HTTPS only
    secure: false, // Set to true for secure cookies over HTTPS
    sameSite: 'strict', // Configure the same-site policy for cookies
  },
  resave: false, // Don't resave unchanged sessions
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({
    db: sequelize // Connect session store to the Sequelize database
  })
};

// Configure session middleware
app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Configure the Handlebars view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Include the routes defined in the controllers
app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  
  // Sync the Sequelize models with the database (if force is set to false)
  sequelize.sync({ force: false });
});
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		if (username === 'admin' && password === 'lynda') {
			return done(null, {username: 'admin'});
			// return done(null, {username: 'admin', password: 'lynda'});
		}

		return done(null, false);
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.username);
	// done(null, user.username + '123');
	// console.log('user= ', user);
});


passport.deserializeUser(function(username, done) {
	done(null, {username: username});
	// done(null, {username: username + '456'});
});

module.exports = passport;
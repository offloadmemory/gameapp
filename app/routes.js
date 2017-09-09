function routes(app, passport) {
    app.get('/', function (req, res) {
        res.render('index.ejs',{
            signup : true,
            login  : true,
            user   : null       
        });
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', { 
            message: req.flash('loginMessage'),
            login  : true,
            signup : false,
            user   : null     
        });
    });

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash    : true // allow flash messages
    }));
        
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { 
            message : req.flash('signupMessage'),
            signup  : true,
            login   : false,
            user    : null            
        });
    });
  
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash    : true
    }));

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
            signup : false,
            login  : false,            
			user   : req.user // get the user out of session and pass to template
		});
    });    
    
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});    
}

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = routes;
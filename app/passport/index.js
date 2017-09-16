var LocalStrategy  = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config         = require("config");
var User           = require('../models/user');
var googleAuth     = config.get("googleAuth");

/**
 * Local Signup callback function
 * @param {Object} req 
 * @param {String} email 
 * @param {String} password 
 * @param {Function} done 
 */
function localSignupCallback(req, email, password, done) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ 'local.email': email }, function (err, user) {
        // if there are any errors, return the error
        if (err) return done(err);

        // check to see if theres already a user with that email
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
            // save the user
            newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
            });
        }
    });
}

/**
 * Callback with email and password from our form
 * @param {Object} req 
 * @param {String} email 
 * @param {String} password 
 * @param {Function} done 
 */
function localLoginCallback(req, email, password, done){
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email': email }, function (err, user) {
        // if there are any errors, return the error before anything else
        if (err) return done(err);
        // if no user is found, return the message
        if (!user) return done(null, false, req.flash('loginMessage', 'No user found.')); 
        // req.flash is the way to set flashdata using connect-flash
        // if the user is found but the password is wrong
        if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
        // create the loginMessage and save it to session as flashdata
        // all is well, return successful user
        return done(null, user);
    });
}

/**
 * Google callback function
 * @param {String} token 
 * @param {String} refreshToken 
 * @param {Object} profile 
 * @param {Function} done 
 */
function googleCallback(token, refreshToken, profile, done) {
    User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        } else {
            var newUser = new User();

            newUser.google.id    = profile.id;
            newUser.google.token = token;
            newUser.google.name  = profile.displayName;
            newUser.google.email = profile.emails[0].value;

            newUser.save(function (err) {
                if (err)
                    throw errr;
                return done(null, newUser);
            });
        }
    });
}

/**
 * Assign seralize, deseralize and middleware functionality
 * @param {Object} passport 
 */
function passportFn(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    var options = {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    };
    passport.use('local-signup', new LocalStrategy(options,localSignupCallback));
    passport.use('local-login', new LocalStrategy(options,localLoginCallback));
    passport.use('google', new GoogleStrategy(googleAuth,googleCallback));
}

module.exports = passportFn;
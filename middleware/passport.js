const JwtStrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User          = require('../models').User;
const sequelize     = require('sequelize'),
      Op            = sequelize.Op;

const config        = require('../config/auth');     //instantiate configuration variables


module.exports = function(passport){

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    });
    // deserialize the user
    passport.deserializeUser(async function(id, done) {
        let user;

        [err, user] = await to(User.findById(id));
        done(err, user);
    });

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new JwtStrategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await to(User.findById(jwt_payload.user_id));

        if(err) return done(err, false);
        if(user && user.isVerified == "Y") {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));

    /**************************google sign up**************************************/
    passport.use('google', new GoogleStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,
        passReqToCallback : true
    },
    async function(req, token, refreshToken, profile, done) {
        console.log('google:', profile);
        let email = profile.emails[0].value;
        
        let user;
        [err, user] = await to(User.findOne({where: { [Op.or]: [{email: email}, {socialUid: profile.id}]}}));
        
        if (err)
            return done(null, null);
        else if (user) {
            await to(user.updateAttributes({
                email: email,
                socialUid: profile.id,
                gtoken: token
            }))
            return done(null, user);
        } else {
            [err, user] = await to(User.create({
                email: email,
                socialUid: profile.id,
                gtoken: token
            }));

            if (err) return done(null, null);

            return done(null, user);
        }        

    }))
    
}
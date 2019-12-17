const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENT_ID);

const User = require('../models/user');

module.exports.checkAuth = async (req, res, next) => {
   // TODO: add auth check
   console.log('Checking Admin Auth at: ', Date.now());
   if (req.session.userId && req.session.userName) {
      next();
   } else {
      console.log('Redirecting to /login');
      res.redirect('/login');
   }
   
}

module.exports.loginAdmin = async (req, res) => {
   try {
      const ticket = await client.verifyIdToken({
         idToken: req.body.idToken,
         audience: process.env.GOOGLE_SIGNIN_CLIENT_ID
      });
      const payload = ticket.getPayload();
      console.log("google payload: " + JSON.stringify(payload));

      let currentUser = await User.getFromGoogleId(payload.sub);
      if (currentUser == null) {
         currentUser = await User.getFromEmail(payload.email);
         if (currentUser == null) {
            console.log('Unauthorized user attempt');
            console.log('Redirecting to /');
            req.session = null;
            res.send(JSON.stringify({success: false}));
         } else {
            await User.setGoogleID(payload.sub, currentUser.id);
         }
      }

      req.session.userId = currentUser.id;
      req.session.userName = payload.given_name;

      console.log('Redirecting to /admin');
      res.send(JSON.stringify({success: true, name: req.session.userName}));
      
   } catch (err) {
      console.error(err);
      res.send(JSON.stringify({success: false, error: err}));
   }
}
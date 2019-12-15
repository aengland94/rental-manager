const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENT_ID);

const User = require('../models/user');

module.exports.checkAuth = async (req, res, next) => {
   // TODO: add auth check
   console.log('Checking Admin Auth at: ', Date.now());
   next();
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
            res.redirect('/');
         } else {
            await User.setGoogleId(payload.sub, currentUser.id);
         }
      }

      req.session.userId = currentUser.id;
      req.session.userName = payload.given_name;

      console.log('Redirecting to /admin');
      res.redirect('/admin');
      
   } catch (err) {
      console.error(err);
      res.send("Error: " + err);
   }
}
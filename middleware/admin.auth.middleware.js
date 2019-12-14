const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_SIGNIN_CLIENT_ID);

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
      res.send(JSON.stringify(payload));
   } catch (err) {
      console.error(err);
      res.send("Error: " + err);
   }
}
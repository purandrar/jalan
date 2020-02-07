const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "162472941446-3dtsu47npjn8ud5pbspv2s8ufb5db80n.apps.googleusercontent.com"
);

module.exports = function(req, res, next) {
  client
    .verifyIdToken({
      idToken: req.body.token,
      audience:
        "162472941446-3dtsu47npjn8ud5pbspv2s8ufb5db80n.apps.googleusercontent.com"
    })
    .then(verified => {
      req.payload = verified.getPayload();
      next();
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

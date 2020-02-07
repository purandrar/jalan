const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "624760328426-qn0q7gfv0qe09gqbh8mg8e99mfr6blsv.apps.googleusercontent.com"
);

module.exports = function(req, res, next) {
  console.log(req.body.token);
  client
    .verifyIdToken({
      idToken: req.body.token,
      audience:
        "624760328426-qn0q7gfv0qe09gqbh8mg8e99mfr6blsv.apps.googleusercontent.com"
    })
    .then(verified => {
      req.payload = verified.getPayload();
      next();
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

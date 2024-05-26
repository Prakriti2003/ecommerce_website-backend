const passport = require("passport");

exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    console.log(req.cookies);
    token = req.cookies["jwt"];
  }
  console.log(token);
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTM1ZWFhN2IyZTViY2E1YzY1MDgyNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE2NzQ1NDYxfQ.g9Iv9dy777wO9et1hq0uh0qyOj7XRmkclol639w1JRs";
  return token;
};

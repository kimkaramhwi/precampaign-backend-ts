const db = require("../models");
const User = db.user;

checkDuplicateUserEmail = (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Email already exists!"
        });
        return;
      }

      next();
    });
};

const verifySignUp = {
  checkDuplicateUserEmail: checkDuplicateUserEmail
};
  
module.exports = verifySignUp;
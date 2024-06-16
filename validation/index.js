const { validationResult } = require("express-validator");
const { validationError } = require("../utils/response");

const validate = (rules) => {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return validationError(res, errors.array()[0].msg);
    }
    next();
  };
};

module.exports = {
  validate,
};

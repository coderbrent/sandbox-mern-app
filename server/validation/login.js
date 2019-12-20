const validator = require('validator')
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
  const errors = {}

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if(validator.isEmpty(data.email)) {
    errors.email = `The e-mail field is REQUIRED.`;
  } else if(!validator.isEmail(data.email)) {
    errors.email = `That e-mail is INVALID.`;
  }

  if(validator.isEmpty(data.password)) {
    errors.password = `The password field is REQUIRED.`
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
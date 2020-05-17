const validator = require('validator')

const validate = user => {
    let error = {}

    // Email validator
    if (!user.email) {
        error.email = 'Please provide an Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid Email'
    }

    // Password validate
    if (!user.password) {
        error.password = 'Please provide a password'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate